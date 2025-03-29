create table todos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  task text not null,
  completed_at timestamp with time zone
);
