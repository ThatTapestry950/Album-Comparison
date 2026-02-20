-- Enable gen_random_uuid()
create extension if not exists pgcrypto;

-- 1) albums
create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  year int null,
  cover_url text null,
  created_at timestamptz not null default now()
);

-- 2) comparison_sessions
create table if not exists public.comparison_sessions (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  ended_at timestamptz null,
  created_at timestamptz not null default now()
);

-- 3) comparison_rounds
create table if not exists public.comparison_rounds (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.comparison_sessions(id) on delete cascade,
  winner_album_id uuid not null references public.albums(id),
  loser_album_id uuid not null references public.albums(id),
  round_number int not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_comparison_rounds_session_id
  on public.comparison_rounds(session_id);

create index if not exists idx_comparison_rounds_round_number
  on public.comparison_rounds(round_number);
