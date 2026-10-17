-- Fix booking ownership checks for existing Supabase projects.
-- Customers can insert/read bookings only when the booking email matches
-- their linked, active public.users profile. Active admins retain access.

CREATE OR REPLACE FUNCTION public.is_active_booking_owner(booking_email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users AS profile
    WHERE profile.auth_user_id = (SELECT auth.uid())
      AND profile.status = 'Active'
      AND LOWER(BTRIM(profile.email)) = LOWER(BTRIM(booking_email))
  );
$$;

REVOKE ALL ON FUNCTION public.is_active_booking_owner(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_active_booking_owner(TEXT) TO authenticated;

DROP POLICY IF EXISTS "Customers can read their own bookings" ON public.bookings;
CREATE POLICY "Customers can read their own bookings"
  ON public.bookings FOR SELECT TO authenticated
  USING (
    public.is_active_admin()
    OR public.is_active_booking_owner(user_email)
  );

DROP POLICY IF EXISTS "Customers can create their own bookings" ON public.bookings;
CREATE POLICY "Customers can create their own bookings"
  ON public.bookings FOR INSERT TO authenticated
  WITH CHECK (
    public.is_active_admin()
    OR public.is_active_booking_owner(user_email)
  );
