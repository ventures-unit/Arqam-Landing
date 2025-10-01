# Setup Instructions

## 1. Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > API to find your project URL and anon key
3. Run the SQL from `supabase-schema.sql` in your Supabase SQL editor
4. Update the `.env.local` file with your actual values

## 3. Run the Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000
