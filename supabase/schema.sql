-- Schéma de l'espace client DDS Tech & Security
-- À exécuter une seule fois dans Supabase : SQL Editor > New query > coller > Run.
-- Chaque client ne voit que ses propres lignes (Row Level Security).

-- 1. Profils clients (un par compte)
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text not null default '',
  phone      text not null default '',
  company    text not null default '',
  created_at timestamptz not null default now()
);

-- 2. Demandes de devis (créées par le client depuis son espace)
create table if not exists public.quote_requests (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  service    text not null,
  message    text not null,
  status     text not null default 'nouveau'
             check (status in ('nouveau', 'en_etude', 'envoye', 'accepte', 'refuse')),
  created_at timestamptz not null default now()
);

-- 3. Interventions (créées par l'équipe DDS depuis le Table Editor)
create table if not exists public.interventions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  title        text not null,
  kind         text not null default 'Maintenance',
  site         text not null default '',
  scheduled_at timestamptz not null,
  status       text not null default 'planifiee'
               check (status in ('planifiee', 'en_cours', 'terminee', 'annulee')),
  created_at   timestamptz not null default now()
);

-- 4. Projets (créés par l'équipe DDS depuis le Table Editor)
create table if not exists public.projects (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  name       text not null,
  kind       text not null default 'Site web',
  phase      text not null default 'Cadrage',
  progress   integer not null default 0 check (progress between 0 and 100),
  updated_at timestamptz not null default now()
);

create index if not exists quote_requests_user_idx on public.quote_requests (user_id, created_at desc);
create index if not exists interventions_user_idx  on public.interventions  (user_id, scheduled_at desc);
create index if not exists projects_user_idx       on public.projects       (user_id, updated_at desc);

-- 5. Sécurité : chaque client lit et modifie uniquement ses données
alter table public.profiles       enable row level security;
alter table public.quote_requests enable row level security;
alter table public.interventions  enable row level security;
alter table public.projects       enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy "quotes_select_own" on public.quote_requests
  for select to authenticated using (user_id = (select auth.uid()));
create policy "quotes_insert_own" on public.quote_requests
  for insert to authenticated with check (user_id = (select auth.uid()) and status = 'nouveau');

create policy "interventions_select_own" on public.interventions
  for select to authenticated using (user_id = (select auth.uid()));

create policy "projects_select_own" on public.projects
  for select to authenticated using (user_id = (select auth.uid()));

-- 6. Création automatique du profil à l'inscription
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Les interventions et projets sont ajoutés par l'équipe DDS (Table Editor, accès administrateur).
-- Les clients n'ont volontairement aucun droit d'écriture dessus.
