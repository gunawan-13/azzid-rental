-- Expose only whether an identity document exists, without fetching the
-- private KTP image for every row in the admin booking list.
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS ktp_available BOOLEAN
    GENERATED ALWAYS AS (NULLIF(BTRIM(ktp_file), '') IS NOT NULL) STORED;
