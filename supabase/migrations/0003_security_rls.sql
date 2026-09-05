-- ============================================================
-- Migration: 0003_security_rls.sql
-- Enables Row Level Security (RLS) on all public tables and
-- defines explicit access policies to prevent unauthorized
-- data exfiltration, tampering, and deletion.
-- ============================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brief_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intelligence_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intelligence_pulses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pulse_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_events ENABLE ROW LEVEL SECURITY;

-- 2. brief_requests
-- Public can INSERT leads/requests via form submission.
-- Public (anon/authenticated) CANNOT SELECT, UPDATE, or DELETE (leads are confidential).
-- Only service_role can read, update, or delete.
DROP POLICY IF EXISTS "Allow public insert to brief_requests" ON public.brief_requests;
CREATE POLICY "Allow public insert to brief_requests"
  ON public.brief_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 3. newsletter_subscribers
-- Public can INSERT their email to subscribe.
-- Public CANNOT view other subscribers' emails, edit, or delete.
DROP POLICY IF EXISTS "Allow public insert to newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow public insert to newsletter_subscribers"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. page_visits
-- Public can INSERT analytics telemetry.
-- Public CANNOT view, modify, or clear visitor logs.
DROP POLICY IF EXISTS "Allow public insert to page_visits" ON public.page_visits;
CREATE POLICY "Allow public insert to page_visits"
  ON public.page_visits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 5. newsletter_events
-- Public can INSERT event telemetry (e.g. email opens / link clicks).
-- Public CANNOT read or tamper with event history.
DROP POLICY IF EXISTS "Allow public insert to newsletter_events" ON public.newsletter_events;
CREATE POLICY "Allow public insert to newsletter_events"
  ON public.newsletter_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 6. intelligence_signals
-- Public can SELECT published signals.
-- Drafts and archived signals are restricted to service_role.
-- Tampering (INSERT/UPDATE/DELETE) is restricted to service_role.
DROP POLICY IF EXISTS "Allow public select on published signals" ON public.intelligence_signals;
CREATE POLICY "Allow public select on published signals"
  ON public.intelligence_signals
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- 7. intelligence_pulses
-- Public can SELECT published pulses.
DROP POLICY IF EXISTS "Allow public select on published pulses" ON public.intelligence_pulses;
CREATE POLICY "Allow public select on published pulses"
  ON public.intelligence_pulses
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- 8. pulse_items
-- Public can SELECT items belonging to published pulses.
DROP POLICY IF EXISTS "Allow public select on items of published pulses" ON public.pulse_items;
CREATE POLICY "Allow public select on items of published pulses"
  ON public.pulse_items
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.intelligence_pulses p
      WHERE p.id = pulse_items.pulse_id AND p.status = 'published'
    )
  );
