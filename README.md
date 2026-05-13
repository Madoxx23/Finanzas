# Mind Finance

Premium personal finance dashboard built with React, Vite, Framer Motion, and Recharts.

## Environment

Create `.env` in the project root:

```bash
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

Do not use service role keys in frontend code.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

### Vercel / Netlify

1. Import this repository.
2. Set build command: `npm run build`.
3. Set output directory: `dist`.
4. Add env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Supabase setup

- Client initialization: `src/lib/supabase.js`
- Suggested schema: `supabase-schema.sql`
- Suggested RLS policies: `supabase-rls.sql`
