-- ============================================================
-- Fozill Operations Schema — Seed Data (optional)
-- Run after schema.sql to demonstrate the dashboard surfaces.
-- ============================================================

insert into public.newsletter_subscribers (email, status, source, subscribed_at) values
  ('founder@fozill.com', 'active', 'global_digest', now() - interval '40 days'),
  ('cmo@retailco.ng', 'active', 'global_digest', now() - interval '12 days'),
  ('headinti@bankgroup.com', 'active', 'global_digest', now() - interval '5 days'),
  ('strategy@fmcgpro.ng', 'unsubscribed', 'global_digest', now() - interval '30 days'),
  ('analyst@capitalafrica.co', 'active', 'global_digest', now() - interval '1 day')
on conflict (email) do nothing;

insert into public.brief_requests (full_name, work_email, organization, phone, category, target_entity, engagement_type, status, created_at) values
  ('Amara Okafor', 'amara@retailco.ng', 'RetailCo Nigeria', '+2349000000001', 'business_brand', 'Tier-1 dairy beverage brand', 'monthly_retainer', 'new', now() - interval '6 days'),
  ('Ibrahim Musa', 'ibrahim@bankgroup.com', 'BankGroup Plc', '+2349000000002', 'competitor_radar', 'Tier-1 neobank ecosystem', 'adhoc_report', 'contacted', now() - interval '2 days'),
  ('Yetunde Bello', 'yetunde@capitalafrica.co', 'Capital Africa Advisory', '+2349000000003', 'economic_sector', 'Affordable housing sector', 'custom_advisory', 'quoted', now() - interval '1 day');

insert into public.intelligence_signals (title, body, category, location, direction, confidence, status, premium, published_at) values
  ('NCPI ticks +1.4pts', 'Nigeria Consumer Pressure Index rose to 74.2, with sachet downsizing driving complaint volume.', 'economic', 'Nigeria', 'up', 82, 'published', false, now() - interval '2 days'),
  ('Merchant churn chatter up', 'Unprompted POS-switching discussion spiked +44% after a Sunday gateway outage.', 'sector', 'Lagos / Ibadan', 'up', 75, 'published', true, now() - interval '1 day'),
  ('Bot cluster detected', '14 coordinated narrative nodes amplifying tariff infographics identified.', 'political', 'Abuja FCT', 'neutral', 68, 'draft', true, null);

insert into public.intelligence_pulses (slug, title, summary, mood_index, status, published_at) values
  ('week-35-pulse', 'Week 35 — Fragile Recovery, Rising Price Sensitivity', 'Household sentiment remains down while policy and fintech signals diverge sharply by zone.', 46, 'published', now() - interval '3 days');

insert into public.pulse_items (pulse_id, title, body, "signal", implication, recommendation, premium, display_order)
select id, 'Fragile consumer recovery', 'Real incomes are stabilizing but price sensitivity remains historically high, concentrated in Northern corridors.', 'NCPI 74.2 (+1.4pts)', 'Substitution toward value-tier and local brands will accelerate.', 'Pause premium-tier price revisions; lead with value-valume messaging.', false, 1
from public.intelligence_pulses where slug = 'week-35-pulse';

insert into public.page_visits (path, referrer, visited_at) values
  ('/', '', now() - interval '8 days'),
  ('/indices', '/', now() - interval '7 days'),
  ('/briefs', '/indices', now() - interval '6 days'),
  ('/contact', '/briefs', now() - interval '5 days'),
  ('/portal/demo', '/briefs', now() - interval '4 days'),
  ('/pricing', '/portal/demo', now() - interval '3 days'),
  ('/solutions/business-marketing', '/', now() - interval '2 days'),
  ('/', '', now() - interval '1 day');
