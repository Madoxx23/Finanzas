-- Core profile table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  currency_code text not null default 'COP',
  timezone text not null default 'America/Bogota',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.months (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month_key text not null, -- YYYY-MM
  name text not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, month_key)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  icon text,
  color text,
  type text not null default 'both' check (type in ('expense','income','both')),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, name)
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month_id uuid references public.months(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  note text,
  type text not null check (type in ('income','expense','savings')),
  amount numeric(14,2) not null check (amount >= 0),
  payment_method text,
  tx_date date not null,
  month_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_transactions_user_date
  on public.transactions(user_id, tx_date desc);

create index if not exists idx_transactions_user_month
  on public.transactions(user_id, month_key);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  emoji text,
  color text,
  target_amount numeric(14,2) not null check (target_amount > 0),
  current_amount numeric(14,2) not null default 0 check (current_amount >= 0),
  monthly_contribution numeric(14,2) not null default 0 check (monthly_contribution >= 0),
  deadline date,
  status text not null default 'active' check (status in ('active','completed','paused','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
