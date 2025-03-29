create table profiles (
  id uuid primary key references auth.users on delete cascade,
  created_at timestamp with time zone not null,
  email text not null
);

alter table profiles enable row level security;

create policy "users can select their own profile"
on profiles
for select
to authenticated
using (auth.uid() = id);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, created_at, email)
  values (new.id, new.created_at, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
