-- Live data integration for the existing public tables.
-- Run after database/supabase_auth.sql.

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS booking_code TEXT,
  ADD COLUMN IF NOT EXISTS driver_id UUID;

UPDATE public.bookings
SET booking_code = 'AZR-' || UPPER(SUBSTRING(REPLACE(id::TEXT, '-', '') FROM 1 FOR 12))
WHERE booking_code IS NULL OR BTRIM(booking_code) = '';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.bookings'::regclass
      AND conname = 'bookings_driver_id_fkey'
  ) THEN
    ALTER TABLE public.bookings
      ADD CONSTRAINT bookings_driver_id_fkey
      FOREIGN KEY (driver_id) REFERENCES public.drivers(id) ON DELETE SET NULL;
  END IF;
END;
$$;

CREATE UNIQUE INDEX IF NOT EXISTS bookings_booking_code_key
  ON public.bookings(booking_code);

DO $$
BEGIN
  IF EXISTS (
    SELECT LOWER(BTRIM(email)) FROM public.customers
    WHERE email IS NOT NULL
    GROUP BY LOWER(BTRIM(email)) HAVING COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'public.customers contains duplicate email addresses; resolve them before enabling customer sync.';
  END IF;

  UPDATE public.customers
  SET email = LOWER(BTRIM(email))
  WHERE email IS NOT NULL;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.customers'::regclass
      AND conname = 'customers_email_key'
  ) THEN
    ALTER TABLE public.customers
      ADD CONSTRAINT customers_email_key UNIQUE (email);
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_customer_from_booking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  customer_emails TEXT[] := ARRAY[]::TEXT[];
  customer_email TEXT;
BEGIN
  IF TG_OP <> 'DELETE' THEN
    customer_email := LOWER(COALESCE(NULLIF(NEW.email, ''), NULLIF(NEW.user_email, '')));
    IF customer_email IS NOT NULL THEN
      customer_emails := ARRAY_APPEND(customer_emails, customer_email);
    END IF;
  END IF;

  IF TG_OP <> 'INSERT' THEN
    customer_email := LOWER(COALESCE(NULLIF(OLD.email, ''), NULLIF(OLD.user_email, '')));
    IF customer_email IS NOT NULL AND NOT customer_email = ANY(customer_emails) THEN
      customer_emails := ARRAY_APPEND(customer_emails, customer_email);
    END IF;
  END IF;

  FOREACH customer_email IN ARRAY customer_emails LOOP
    IF customer_email IS NULL THEN
      CONTINUE;
    END IF;

    INSERT INTO public.customers (email, name, wa, total, spend, last, status)
    SELECT
      customer_email,
      COALESCE(MAX(NULLIF(cust, '')), SPLIT_PART(customer_email, '@', 1)),
      MAX(NULLIF(wa, '')),
      COUNT(*)::INTEGER,
      COALESCE(SUM(total) FILTER (WHERE UPPER(COALESCE(pay_status, '')) = 'PAID'), 0),
      MAX(start)::TIMESTAMPTZ,
      CASE WHEN COUNT(*) > 1 THEN 'Repeat' ELSE 'New' END
    FROM public.bookings
    WHERE LOWER(COALESCE(NULLIF(email, ''), NULLIF(user_email, ''))) = customer_email
    ON CONFLICT (email) DO UPDATE
    SET name = EXCLUDED.name,
        wa = COALESCE(EXCLUDED.wa, public.customers.wa),
        total = EXCLUDED.total,
        spend = EXCLUDED.spend,
        last = EXCLUDED.last,
        status = EXCLUDED.status;
  END LOOP;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_customer_from_booking() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS sync_customer_from_booking ON public.bookings;
CREATE TRIGGER sync_customer_from_booking
  AFTER INSERT OR UPDATE OF email, user_email, cust, wa, start, total, pay_status OR DELETE
  ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_customer_from_booking();

CREATE OR REPLACE FUNCTION public.notify_admin_new_booking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.admin_notifs (booking_id, type, message, icon, color, is_read)
  VALUES (
    NEW.booking_code,
    'booking',
    'Booking baru ' || COALESCE(NEW.booking_code, NEW.id::TEXT) || ' dari ' || COALESCE(NULLIF(NEW.cust, ''), 'Customer'),
    'file',
    'text-sky-300',
    FALSE
  );
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.notify_admin_new_booking() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS notify_admin_new_booking ON public.bookings;
CREATE TRIGGER notify_admin_new_booking
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_new_booking();

INSERT INTO public.admin_notifs (booking_id, type, message, icon, color, is_read)
SELECT
  booking.booking_code,
  'booking',
  'Booking baru ' || COALESCE(booking.booking_code, booking.id::TEXT) || ' dari ' || COALESCE(NULLIF(booking.cust, ''), 'Customer'),
  'file',
  'text-sky-300',
  FALSE
FROM public.bookings AS booking
WHERE NOT EXISTS (
  SELECT 1
  FROM public.admin_notifs AS notification
  WHERE notification.type = 'booking'
    AND notification.booking_id IN (booking.booking_code, booking.id::TEXT)
);

INSERT INTO public.customers (email, name, wa, total, spend, last, status)
SELECT
  LOWER(COALESCE(NULLIF(email, ''), NULLIF(user_email, ''))),
  COALESCE(MAX(NULLIF(cust, '')), SPLIT_PART(LOWER(COALESCE(NULLIF(email, ''), NULLIF(user_email, ''))), '@', 1)),
  MAX(NULLIF(wa, '')),
  COUNT(*)::INTEGER,
  COALESCE(SUM(total) FILTER (WHERE UPPER(COALESCE(pay_status, '')) = 'PAID'), 0),
  MAX(start)::TIMESTAMPTZ,
  CASE WHEN COUNT(*) > 1 THEN 'Repeat' ELSE 'New' END
FROM public.bookings
WHERE COALESCE(NULLIF(email, ''), NULLIF(user_email, '')) IS NOT NULL
GROUP BY LOWER(COALESCE(NULLIF(email, ''), NULLIF(user_email, '')))
ON CONFLICT (email) DO UPDATE
SET name = EXCLUDED.name,
    wa = COALESCE(EXCLUDED.wa, public.customers.wa),
    total = EXCLUDED.total,
    spend = EXCLUDED.spend,
    last = EXCLUDED.last,
    status = EXCLUDED.status;

ALTER TABLE public.admin_notifs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  table_name TEXT;
  policy_record RECORD;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'admin_notifs', 'bookings', 'customers', 'drivers', 'promos', 'settings', 'vehicles'
  ] LOOP
    FOR policy_record IN
      SELECT policyname
      FROM pg_policies
      WHERE schemaname = 'public' AND tablename = table_name
    LOOP
      EXECUTE FORMAT('DROP POLICY %I ON public.%I', policy_record.policyname, table_name);
    END LOOP;
  END LOOP;
END;
$$;

REVOKE ALL ON public.admin_notifs, public.bookings, public.customers,
  public.drivers, public.promos, public.settings, public.vehicles
FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.vehicles, public.promos, public.settings TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_notifs, public.bookings,
  public.customers, public.drivers, public.promos, public.settings, public.vehicles
TO authenticated;

CREATE POLICY "Public can read visible vehicles"
  ON public.vehicles FOR SELECT TO anon
  USING (status <> 'inactive');
CREATE POLICY "Authenticated can read visible vehicles"
  ON public.vehicles FOR SELECT TO authenticated
  USING (status <> 'inactive' OR public.is_active_admin());
CREATE POLICY "Active admins manage vehicles"
  ON public.vehicles FOR ALL TO authenticated
  USING (public.is_active_admin())
  WITH CHECK (public.is_active_admin());

CREATE POLICY "Customers can read their own bookings"
  ON public.bookings FOR SELECT TO authenticated
  USING (
    public.is_active_admin()
    OR LOWER(user_email) = LOWER(COALESCE((SELECT auth.jwt() ->> 'email'), ''))
  );
CREATE POLICY "Customers can create their own bookings"
  ON public.bookings FOR INSERT TO authenticated
  WITH CHECK (
    public.is_active_admin()
    OR LOWER(user_email) = LOWER(COALESCE((SELECT auth.jwt() ->> 'email'), ''))
  );
CREATE POLICY "Active admins update bookings"
  ON public.bookings FOR UPDATE TO authenticated
  USING (public.is_active_admin())
  WITH CHECK (public.is_active_admin());
CREATE POLICY "Active admins delete bookings"
  ON public.bookings FOR DELETE TO authenticated
  USING (public.is_active_admin());

CREATE POLICY "Active admins manage customers"
  ON public.customers FOR ALL TO authenticated
  USING (public.is_active_admin())
  WITH CHECK (public.is_active_admin());

CREATE POLICY "Active admins manage drivers"
  ON public.drivers FOR ALL TO authenticated
  USING (public.is_active_admin())
  WITH CHECK (public.is_active_admin());

CREATE POLICY "Public can read current promos"
  ON public.promos FOR SELECT TO anon, authenticated
  USING (
    status = 'Active'
    AND (start IS NULL OR start <= CURRENT_DATE)
    AND ("end" IS NULL OR "end" >= CURRENT_DATE)
  );
CREATE POLICY "Active admins manage promos"
  ON public.promos FOR ALL TO authenticated
  USING (public.is_active_admin())
  WITH CHECK (public.is_active_admin());

CREATE POLICY "Public can read site settings"
  ON public.settings FOR SELECT TO anon, authenticated
  USING (TRUE);
CREATE POLICY "Active admins manage site settings"
  ON public.settings FOR ALL TO authenticated
  USING (public.is_active_admin())
  WITH CHECK (public.is_active_admin());

CREATE POLICY "Active admins manage notifications"
  ON public.admin_notifs FOR ALL TO authenticated
  USING (public.is_active_admin())
  WITH CHECK (public.is_active_admin());

INSERT INTO public.vehicles (
  name, brand, model, cat, year, plate, trans, seats, fuel, color, doors, bag,
  price_lk, price_drv, status, image, features, description
)
SELECT seed.name, seed.brand, seed.model, seed.cat, seed.year, seed.plate, seed.trans,
       seed.seats, seed.fuel, seed.color, seed.doors, seed.bag, seed.price_lk,
       seed.price_drv, seed.status, seed.image, seed.features::JSONB, seed.description
FROM (VALUES
  ('Toyota Avanza 1.5 G', 'Toyota', 'Avanza', 'MPV', 2023, 'B 1234 AZD', 'Automatic', 7, 'Bensin', 'Silver', 5, '2 Koper', 350000, 500000, 'available', 'https://image.qwenlm.ai/public_source/c30f4a51-4c9b-44dc-8daf-25a031354a4e/16a7709d9-0983-4057-9146-512a636ca1f8.png', '["AC Double Blower","Dual Airbag","USB Charging","Bluetooth Audio","Sensor Parkir"]', 'MPV sejuta umat yang irit, lincah, dan lega. Pilihan tepat untuk perjalanan keluarga dalam maupun luar kota dengan biaya yang efisien.'),
  ('Toyota Innova Zenix', 'Toyota', 'Innova', 'MPV', 2024, 'B 2210 AZD', 'Automatic', 7, 'Hybrid', 'Gray Metalik', 5, '3 Koper', 650000, 800000, 'available', 'https://image.qwenlm.ai/public_source/c30f4a51-4c9b-44dc-8daf-25a031354a4e/1d0806d18-56bc-4f03-bc14-8a84e6e2dc87.png', '["Hybrid Irit","Captain Seat","AC Digital","USB-C Charging","Cruise Control"]', 'Kenyamanan kelas bisnis dengan teknologi hybrid. Kabin senyap, suspensi empuk, cocok untuk perjalanan dinas maupun keluarga.'),
  ('Honda Brio RS', 'Honda', 'Brio', 'City Car', 2023, 'B 876 AZD', 'Automatic', 5, 'Bensin', 'Red', 5, '1 Koper', 300000, 450000, 'available', 'https://image.qwenlm.ai/public_source/c30f4a51-4c9b-44dc-8daf-25a031354a4e/127ed0fdf-cbe4-4631-92d2-66b630525074.png', '["AC Double Blower","Dual Airbag","USB Charging","Bluetooth Audio"]', 'City car lincah dan irit untuk mobilitas harian di dalam kota. Mudah parkir, menyenangkan dikendarai.'),
  ('Mitsubishi Xpander Ultimate', 'Mitsubishi', 'Xpander', 'MPV', 2023, 'B 3311 AZD', 'Automatic', 7, 'Bensin', 'White', 5, '2 Koper', 425000, 575000, 'rented', 'https://image.qwenlm.ai/public_source/c30f4a51-4c9b-44dc-8daf-25a031354a4e/1268654d9-4306-4979-be98-203248075f55.png', '["AC Double Blower","Cruise Control","Keyless Start","Airbag 6 Titik","Sensor Parkir"]', 'Crossover MPV dengan tampilan tegas dan kabin senyap. Favorit untuk perjalanan keluarga jarak jauh.'),
  ('Toyota Fortuner GR Sport', 'Toyota', 'Fortuner', 'SUV', 2023, 'B 9090 AZD', 'Automatic', 7, 'Diesel', 'Black', 5, '4 Koper', 1200000, 1350000, 'available', 'https://image.qwenlm.ai/public_source/c30f4a51-4c9b-44dc-8daf-25a031354a4e/1d665875e-a4b5-418f-8702-ace3e0ba505b.png', '["4x4 Ready","Camera 360","Cruise Control","Keyless Start","Ambient Light"]', 'SUV besar bertenaga dengan wibawa di jalan. Ideal untuk medan berat, perjalanan dinas eksekutif, dan luar kota.'),
  ('Toyota Alphard 2.5 G', 'Toyota', 'Alphard', 'Premium', 2022, 'B 1 AZD', 'Automatic', 7, 'Bensin', 'Black', 5, '4 Koper', 2500000, 2650000, 'available', 'https://image.qwenlm.ai/public_source/c30f4a51-4c9b-44dc-8daf-25a031354a4e/1353468d6-4de6-4014-9596-7d59bff31768.png', '["Captain Seat","Sunroof","Ambient Light","Power Sliding Door","AC Digital"]', 'Standar tertinggi kenyamanan MPV premium. Pilihan utama untuk eksekutif, tamu VIP, dan wedding.'),
  ('Honda HR-V SE', 'Honda', 'HR-V', 'SUV', 2023, 'B 4521 AZD', 'Automatic', 5, 'Bensin', 'White', 5, '2 Koper', 475000, 625000, 'available', 'https://image.qwenlm.ai/public_source/c30f4a51-4c9b-44dc-8daf-25a031354a4e/165f8ea21-3942-4146-b253-910de7c3faa4.png', '["Cruise Control","Keyless Start","Airbag 6 Titik","AC Digital"]', 'Compact SUV stylish dengan handling presisi. Cocok untuk profesional muda dan pasangan yang bepergian dengan gaya.'),
  ('Toyota Hiace Commuter', 'Toyota', 'Hiace', 'Commercial', 2022, 'B 7712 AZD', 'Manual', 15, 'Diesel', 'White', 4, '6 Koper', 950000, 1100000, 'maintenance', 'https://image.qwenlm.ai/public_source/c30f4a51-4c9b-44dc-8daf-25a031354a4e/18cffed14-12c0-4187-aa2a-251c1430031b.png', '["AC Double Blower","Power Sliding Door","USB Charging"]', 'Armada andalan untuk rombongan besar, shuttle perusahaan, dan kebutuhan event. Selalu dengan driver profesional.')
) AS seed(name, brand, model, cat, year, plate, trans, seats, fuel, color, doors, bag, price_lk, price_drv, status, image, features, description)
WHERE NOT EXISTS (SELECT 1 FROM public.vehicles);

UPDATE public.bookings AS booking
SET veh_id = vehicle.id::TEXT
FROM public.vehicles AS vehicle
WHERE booking.veh_id IS NOT NULL
  AND booking.veh_id <> vehicle.id::TEXT
  AND REGEXP_REPLACE(LOWER(booking.veh_id), '[^a-z0-9]', '', 'g') IN (
    REGEXP_REPLACE(LOWER(vehicle.model), '[^a-z0-9]', '', 'g'),
    REGEXP_REPLACE(LOWER(vehicle.name), '[^a-z0-9]', '', 'g')
  );

INSERT INTO public.promos (code, type, value, cap, min_days, start, "end", status)
SELECT seed.code, seed.type, seed.value, seed.cap, seed.min_days, seed.start_date, seed.end_date, seed.status
FROM (VALUES
  ('MERDEKA2026', 'percent', 10, 100000, 2, DATE '2026-08-01', DATE '2026-08-31', 'Expired'),
  ('AZZIDHEMAT', 'flat', 50000, 0, 3, DATE '2026-07-01', DATE '2026-12-31', 'Active'),
  ('JULI2026', 'percent', 15, 150000, 2, DATE '2026-07-01', DATE '2026-07-31', 'Expired')
) AS seed(code, type, value, cap, min_days, start_date, end_date, status)
WHERE NOT EXISTS (SELECT 1 FROM public.promos)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.settings (id, data)
SELECT 'site',
  '{"head1":"PERJALANAN LEBIH NYAMAN.","head2":"MOBIL SIAP JALAN.","sub":"Nikmati layanan rental mobil yang praktis, nyaman, dan terpercaya untuk kebutuhan perjalanan pribadi, bisnis, maupun wisata.","ann":"Selamat Datang di Azzid Rentcar — Nikmati Perjalanan Mewah, Aman & Nyaman Bersama Armada Terbaik Kami · Layanan 24/7 · Pesan Sekarang!","wa":"6283890354333","namaBisnis":"AZZID RENTCAR","email":"azzidrentalmobil@gmail.com","alamat":"Jl. Bambu Petung 66 RT. 009 RW. 05 Cipayung, Jakarta Timur","telepon":"+62 838-9035-4333","notifications":[true,true,true,true,false,false],"payments":{"qris":"","va_bca":"8808260813138899","va_mandiri":"","gopay":"","ovo":"","bank":{"nama":"BCA","norek":"6825279893","pemilik":"DEDEF ROCHAYANDI"}}}'::JSONB
WHERE NOT EXISTS (SELECT 1 FROM public.settings WHERE id = 'site');
