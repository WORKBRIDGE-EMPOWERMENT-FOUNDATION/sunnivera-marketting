# Sunivera web

## Run locally

Install dependencies, copy `.env.example` to `.env.local`, fill in the values, then run `npm run dev` at http://localhost:3000.

## Supabase setup

Create a Supabase project and set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `DATABASE_URL` in `.env.local`. Use the project's Postgres connection string for `DATABASE_URL`; the existing Drizzle blog database and contact inquiry storage use it.

Set `SUPABASE_ADMIN_EMAILS` to a comma-separated allowlist of administrator email addresses. Create or invite those users under Supabase Authentication, and disable public sign-ups. Admin sign-in uses Supabase Auth; both `/admin` and the legacy `/blog-db/app/admin` routes are protected.

After confirming `DATABASE_URL` points to the intended Supabase project, run `npm run db:push` to create/update the blog and contact inquiry tables. Contact inquiries have row-level security enabled and are inserted only by the server. SMTP variables are optional; when configured, the app sends an email notification after storing an inquiry.

Never expose the database password or a Supabase service-role key to the browser. Deploy the same environment variables through the hosting provider's server-side environment settings.
