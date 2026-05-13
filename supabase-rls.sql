alter table public.profiles enable row level security;
alter table public.months enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
alter table public.goals enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "months_owner_all"
  on public.months for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "categories_owner_all"
  on public.categories for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "transactions_owner_all"
  on public.transactions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "goals_owner_all"
  on public.goals for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
