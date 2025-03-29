alter table todos add column profile_id uuid references profiles(id) on delete cascade not null default auth.uid();

alter table todos enable row level security;

create policy "users can select their todos"
on todos
for select
to authenticated
using (auth.uid() = profile_id);

create policy "users can insert todos"
on todos
for insert
to authenticated
with check (auth.uid() = profile_id);

create policy "users can update their todos"
on todos
for update
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);
