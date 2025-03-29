alter table todos add column attachment_url text;

create policy "users can insert attachments"
on storage.objects
for insert
to authenticated 
with check (bucket_id = 'attachments');
