# Supabase LW14 Demo

Demo of the Supabase platform for the Launch Week 14 community meetup.

This is a simple todo list built with React 19 and TanStack Router, showcasing different features of Supabase.

- [start-here](https://github.com/emilioschepis/supabase-lw14-demo/releases/tag/start-here): basic project
- [00-add-supabase](https://github.com/emilioschepis/supabase-lw14-demo/releases/tag/00-add-supabase): adds Supabase to the project and initializes the local environment
- [01-read-data](https://github.com/emilioschepis/supabase-lw14-demo/releases/tag/01-read-data): adds the first migration, generates the TypeScript client types, and queries the database through PostgREST
- [02-write-data](https://github.com/emilioschepis/supabase-lw14-demo/releases/tag/02-write-data): adds client code to insert and update existing todos
- [03-authentication](https://github.com/emilioschepis/supabase-lw14-demo/releases/tag/03-authentication): adds email and password sign in, row level security policies, and a trigger to create a profile for new users
- [04-realtime](https://github.com/emilioschepis/supabase-lw14-demo/releases/tag/04-realtime): adds realtime syncronization of the list of todos for each user across different browsers
- [05-storage](https://github.com/emilioschepis/supabase-lw14-demo/releases/tag/05-storage): adds file storage, a public bucket for todo attachments, and RLS policies for file uploads
- [06-functions](https://github.com/emilioschepis/supabase-lw14-demo/releases/tag/06-functions): adds an edge function to summarize incomplete todos and provide an encouraging message through a OpenAI prompt

## Requirements

- Node.js + npm
- Docker
- OpenAI key (for the edge function)
