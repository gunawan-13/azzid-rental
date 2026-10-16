ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS auth_user_id UUID;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.users'::regclass
      AND conname = 'users_auth_user_id_fkey'
  ) THEN
    ALTER TABLE public.users
      ADD CONSTRAINT users_auth_user_id_fkey
      FOREIGN KEY (auth_user_id)
      REFERENCES auth.users(id)
      ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.users'::regclass
      AND conname = 'users_auth_user_id_key'
  ) THEN
    ALTER TABLE public.users
      ADD CONSTRAINT users_auth_user_id_key UNIQUE (auth_user_id);
  END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_users_auth_user_id
  ON public.users(auth_user_id);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
GRANT USAGE ON SCHEMA public TO authenticated;
REVOKE ALL ON public.users FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.users TO authenticated;
GRANT UPDATE (role, status) ON public.users TO authenticated;

DO $$
BEGIN
  IF EXISTS (
    SELECT LOWER(email)
    FROM public.users
    GROUP BY LOWER(email)
    HAVING COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'public.users contains duplicate email addresses ignoring case; resolve them before linking Supabase Auth users.';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users
    WHERE auth_user_id = (SELECT auth.uid())
      AND role = 'admin'
      AND status = 'Active'
  );
$$;

REVOKE ALL ON FUNCTION public.is_active_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_active_admin() TO authenticated;

DROP POLICY IF EXISTS "Users can read own row or admins can read all" ON public.users;
CREATE POLICY "Users can read own row or admins can read all"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth_user_id = (SELECT auth.uid()) OR public.is_active_admin());

DROP POLICY IF EXISTS "Admins can update user roles and status" ON public.users;
CREATE POLICY "Admins can update user roles and status"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (public.is_active_admin())
  WITH CHECK (public.is_active_admin());

CREATE OR REPLACE FUNCTION public.sync_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  profile_name TEXT;
  profile_phone TEXT;
BEGIN
  IF NEW.email IS NULL OR NEW.email_confirmed_at IS NULL THEN
    RETURN NEW;
  END IF;

  profile_name := COALESCE(
    NULLIF(NEW.raw_user_meta_data ->> 'name', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  profile_phone := NULLIF(NEW.raw_user_meta_data ->> 'phone', '');

  UPDATE public.users
  SET auth_user_id = NEW.id,
      name = COALESCE(profile_name, name),
      phone = COALESCE(profile_phone, phone)
  WHERE LOWER(email) = LOWER(NEW.email)
    AND auth_user_id IS NULL;

  IF FOUND THEN
    RETURN NEW;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.users
    WHERE LOWER(email) = LOWER(NEW.email)
      AND auth_user_id IS DISTINCT FROM NEW.id
  ) THEN
    RAISE EXCEPTION 'This email is already linked to another account.';
  END IF;

  INSERT INTO public.users (auth_user_id, email, name, phone, role, status)
  VALUES (
    NEW.id,
    LOWER(NEW.email),
    COALESCE(profile_name, SPLIT_PART(NEW.email, '@', 1)),
    profile_phone,
    'user',
    'Active'
  )
  ON CONFLICT (auth_user_id) DO UPDATE
  SET email = EXCLUDED.email,
      name = COALESCE(EXCLUDED.name, public.users.name),
      phone = COALESCE(EXCLUDED.phone, public.users.phone);

  RETURN NEW;
END;
$$;

UPDATE public.users AS app_user
SET auth_user_id = auth_user.id
FROM auth.users AS auth_user
WHERE LOWER(app_user.email) = LOWER(auth_user.email)
  AND auth_user.email_confirmed_at IS NOT NULL
  AND app_user.auth_user_id IS NULL;

DROP TRIGGER IF EXISTS on_auth_user_sync ON auth.users;
CREATE TRIGGER on_auth_user_sync
  AFTER INSERT OR UPDATE OF email, email_confirmed_at ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_auth_user();
