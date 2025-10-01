-- Updated Supabase schema for comprehensive signup form
-- Drop existing table and recreate with new structure

DROP TABLE IF EXISTS arqam_signups CASCADE;

-- Create the new comprehensive signups table
CREATE TABLE arqam_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Section 1: Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile_number TEXT NOT NULL,
  nationality TEXT NOT NULL,
  
  -- Section 2: Professional Information
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL CHECK (organization_type IN (
    'Government / Public Sector',
    'Private Sector / Corporate', 
    'Startup / Entrepreneur',
    'Academic / University',
    'NGO / Development Agency',
    'Other'
  )),
  organization_type_other TEXT,
  position_title TEXT NOT NULL,
  
  -- Section 3: Data Room Interests & Needs
  interested_sectors TEXT[] NOT NULL DEFAULT '{}',
  interested_sectors_other TEXT,
  interested_datasets TEXT[] NOT NULL DEFAULT '{}',
  interested_datasets_other TEXT,
  data_usage TEXT[] NOT NULL DEFAULT '{}',
  data_usage_other TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_arqam_signups_email ON arqam_signups(email);
CREATE INDEX idx_arqam_signups_created_at ON arqam_signups(created_at);
CREATE INDEX idx_arqam_signups_organization_type ON arqam_signups(organization_type);

-- Enable Row Level Security
ALTER TABLE arqam_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access
CREATE POLICY "Allow anonymous insert" ON arqam_signups
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON arqam_signups
  FOR SELECT TO anon
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_arqam_signups_updated_at
  BEFORE UPDATE ON arqam_signups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE arqam_signups IS 'Comprehensive signup form data for Arqam early access';
COMMENT ON COLUMN arqam_signups.interested_sectors IS 'Array of selected sectors from predefined list';
COMMENT ON COLUMN arqam_signups.interested_datasets IS 'Array of selected dataset types from predefined list';
COMMENT ON COLUMN arqam_signups.data_usage IS 'Array of selected usage types from predefined list';
