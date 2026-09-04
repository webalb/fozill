-- ============================================================
-- Fozill Operations Schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`).
-- Tables: newsletter_subscribers, brief_requests, page_visits,
--         intelligence_signals, intelligence_pulses, pulse_items,
--         newsletter_events
-- ============================================================

-- ---------- NEWSLETTER SUBSCRIBERS ----------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'active'
    check (status in ('active','unsubscribed','bounced')),
  source text default 'global_digest',
  subscribed_at timestamptz not null default now()
);

-- ---------- BRIEF / LEAD REQUESTS ----------
create table if not exists public.brief_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  work_email text not null,
  organization text not null,
  phone text not null,
  category text not null,
  target_entity text not null,
  engagement_type text not null,
  notes text,
  status text not null default 'new'
    check (status in ('new','contacted','quoted','won','lost')),
  created_at timestamptz not null default now()
);

-- ---------- PAGE VISITS ----------
create table if not exists public.page_visits (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  user_agent text,
  country text,
  city text,
  visited_at timestamptz not null default now()
);

CREATE INDEX if not exists page_visits_visited_at_idx ON public.page_visits (visited_at);
CREATE INDEX if not exists page_visits_path_idx ON public.page_visits (path);

-- ---------- INTELLIGENCE SIGNALS (Fozill Signals) ----------
create table if not exists public.intelligence_signals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  category text not null check (category in ('business','political','economic','sector','crisis')),
  location text,
  direction text check (direction in ('up','down','neutral')),
  confidence int check (confidence between 0 and 100),
  source text default 'manual',
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  premium boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- INTELLIGENCE PULSES (Fozill Pulse) ----------
create table if not exists public.intelligence_pulses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  mood_index numeric,
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- PULSE ITEMS (the analyses inside a pulse) ----------
create table if not exists public.pulse_items (
  id uuid primary key default gen_random_uuid(),
  pulse_id uuid not null references public.intelligence_pulses(id) on delete cascade,
  title text not null,
  body text not null,
  "signal" text,
  implication text,
  recommendation text,
  premium boolean not null default true,
  display_order int default 0,
  created_at timestamptz not null default now()
);

-- ---------- NEWSLETTER EVENTS (email tracking: sends / opens / clicks) ----------
create table if not exists public.newsletter_events (
  id uuid primary key default gen_random_uuid(),
  email text,
  event_type text not null
    check (event_type in ('send','open','click','subscribe','unsubscribe')),
  digest_slug text,
  metadata jsonb,
  occurred_at timestamptz not null default now()
);

CREATE INDEX if not exists newsletter_events_occurred_at_idx ON public.newsletter_events (occurred_at);
