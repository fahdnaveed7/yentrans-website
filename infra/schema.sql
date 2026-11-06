-- Careers application store (Cloudflare D1).
--
-- Holds candidate metadata and a pointer to the CV in R2. The CV itself is
-- never stored here. Apply with:
--   wrangler d1 execute yentrans-applications --remote --file=infra/schema.sql

CREATE TABLE IF NOT EXISTS applications (
  id            TEXT PRIMARY KEY,          -- uuid, also the R2 object name
  role_id       TEXT NOT NULL,             -- matches `id` in the job's front matter
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT NOT NULL,
  location      TEXT NOT NULL,
  experience    TEXT NOT NULL,
  linkedin      TEXT,
  note          TEXT,

  cv_key        TEXT NOT NULL,             -- R2 key, e.g. applications/<uuid>.pdf
  cv_type       TEXT NOT NULL CHECK (cv_type IN ('pdf','docx')),
  cv_bytes      INTEGER NOT NULL,

  -- Salted hash, not the address. Enough to rate limit; not a record of who
  -- applied from where, which nobody needs and which would have to be disclosed.
  ip_hash       TEXT NOT NULL,
  user_agent    TEXT,

  created_at    TEXT NOT NULL,             -- ISO 8601 UTC
  status        TEXT NOT NULL DEFAULT 'new'
                CHECK (status IN ('new','review','interview','closed','withdrawn')),
  reviewer_note TEXT,

  -- Retention. Set purge_after at intake from the policy in the applicant
  -- privacy notice; the purge job deletes the R2 object and this row together.
  purge_after   TEXT,
  purged_at     TEXT
);

CREATE INDEX IF NOT EXISTS idx_applications_role    ON applications (role_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status  ON applications (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_ip      ON applications (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_applications_purge   ON applications (purge_after) WHERE purged_at IS NULL;

-- Who opened which CV, and when. A CV is personal data; an access log is the
-- difference between "we control this" and "we hope nobody copied it".
CREATE TABLE IF NOT EXISTS cv_access_log (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id TEXT NOT NULL REFERENCES applications(id),
  accessed_by    TEXT NOT NULL,            -- identity from Cloudflare Access
  accessed_at    TEXT NOT NULL,
  action         TEXT NOT NULL CHECK (action IN ('view','download','delete'))
);
CREATE INDEX IF NOT EXISTS idx_cv_access_app ON cv_access_log (application_id, accessed_at DESC);
