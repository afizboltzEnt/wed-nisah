-- E-Wedding: Dani & Anisah RSVP table
-- Run this in the source editor of the WEDDING Supabase project:
--   https://supabase.com/dashboard/project/zbtozerufklismpxjvgj/sql/new

create table if not exists public.rsvp (
  id bigint generated always as identity primary key,
  name text not null,
  attendance text not null check (attendance in ('hadir', 'tidak')),
  guest_count integer not null default 1 check (guest_count between 1 and 20),
  phone text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.rsvp enable row level security;

-- Guests may submit RSVPs (insert) but cannot read the list.
drop policy if exists "guest_insert_rsvp" on public.rsvp;
create policy "guest_insert_rsvp"
  on public.rsvp for insert
  to anon
  with check (true);

-- Store a lightweight view count / audit (optional)
create index if not exists rsvp_created_idx on public.rsvp (created_at desc);
create index if not exists rsvp_attendance_idx on public.rsvp (attendance);