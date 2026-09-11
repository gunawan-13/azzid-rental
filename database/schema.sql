-- AZZID RENTCAR
-- Original project stores demo data in browser localStorage.
-- No server database was present in the supplied single-file HTML.
-- This schema is therefore a structural placeholder and is NOT used by the current app.

CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(32) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255),
  whatsapp VARCHAR(32)
);
