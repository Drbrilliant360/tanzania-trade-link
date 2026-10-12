create type public.app_role as enum ('buyer','seller','professional','admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  phone text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles read" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
declare r text := coalesce(new.raw_user_meta_data->>'role','buyer');
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), coalesce(new.email,''));
  if r not in ('buyer','seller','professional') then r := 'buyer'; end if;
  insert into public.user_roles (user_id, role) values (new.id, r::public.app_role);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null,
  name text not null,
  description text not null default '',
  price numeric not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  category text not null,
  region text not null,
  unit text not null default 'unit',
  specs text,
  created_at timestamptz not null default now()
);
grant select on public.listings to anon;
grant select, insert, update, delete on public.listings to authenticated;
grant all on public.listings to service_role;
alter table public.listings enable row level security;
create policy "listings public read" on public.listings for select to anon, authenticated using (true);
create policy "sellers insert own" on public.listings for insert to authenticated
  with check (auth.uid() = seller_id and (public.has_role(auth.uid(),'seller') or public.has_role(auth.uid(),'admin')));
create policy "sellers update own" on public.listings for update to authenticated using (auth.uid() = seller_id);
create policy "sellers delete own" on public.listings for delete to authenticated using (auth.uid() = seller_id);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null,
  status text not null default 'Processing',
  payment_method text not null,
  escrow text not null default 'Held in escrow',
  full_name text not null,
  phone text not null,
  region text not null,
  delivery_type text not null,
  address text not null,
  delivery_fee numeric not null default 0,
  subtotal numeric not null default 0,
  created_at timestamptz not null default now()
);
grant select, insert on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "buyer reads own orders" on public.orders for select to authenticated
  using (auth.uid() = buyer_id or public.has_role(auth.uid(),'admin'));
create policy "buyer creates own orders" on public.orders for insert to authenticated with check (auth.uid() = buyer_id);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_ref text not null,
  name text not null,
  seller text not null,
  unit text not null,
  qty integer not null check (qty > 0),
  price numeric not null check (price >= 0)
);
grant select, insert on public.order_items to authenticated;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "items readable with order" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and (o.buyer_id = auth.uid() or public.has_role(auth.uid(),'admin'))));
create policy "items insert with own order" on public.order_items for insert to authenticated
  with check (exists (select 1 from public.orders o where o.id = order_id and o.buyer_id = auth.uid()));