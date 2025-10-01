-- Arqam Landing Page - Supabase Database Schema
-- Run this SQL in your Supabase SQL editor

-- Create the arqam_signups table
CREATE TABLE arqam_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('Founder', 'Government', 'Researcher', 'Investor', 'Other')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_arqam_signups_email ON arqam_signups(email);
CREATE INDEX idx_arqam_signups_created_at ON arqam_signups(created_at);
CREATE INDEX idx_arqam_signups_role ON arqam_signups(role);

-- Enable Row Level Security (RLS)
ALTER TABLE arqam_signups ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for public signups)
CREATE POLICY "Allow public signups" ON arqam_signups
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows authenticated users to read (for admin dashboard)
CREATE POLICY "Allow authenticated read" ON arqam_signups
  FOR SELECT USING (auth.role() = 'authenticated');

-- Optional: Create a view for analytics
CREATE VIEW signup_analytics AS
SELECT 
  DATE(created_at) as signup_date,
  role,
  COUNT(*) as signup_count
FROM arqam_signups
GROUP BY DATE(created_at), role
ORDER BY signup_date DESC;

-- Optional: Create a function to get signup stats
CREATE OR REPLACE FUNCTION get_signup_stats()
RETURNS TABLE (
  total_signups BIGINT,
  signups_today BIGINT,
  signups_this_week BIGINT,
  signups_this_month BIGINT,
  top_role TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM arqam_signups) as total_signups,
    (SELECT COUNT(*) FROM arqam_signups WHERE created_at >= CURRENT_DATE) as signups_today,
    (SELECT COUNT(*) FROM arqam_signups WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as signups_this_week,
    (SELECT COUNT(*) FROM arqam_signups WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as signups_this_month,
    (SELECT role FROM arqam_signups GROUP BY role ORDER BY COUNT(*) DESC LIMIT 1) as top_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT ON arqam_signups TO anon, authenticated;
GRANT SELECT ON signup_analytics TO authenticated;
GRANT EXECUTE ON FUNCTION get_signup_stats() TO authenticated;
