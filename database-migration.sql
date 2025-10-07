-- Migration script to update arqam_signups table
-- Changes interested_sectors from TEXT[] to TEXT
-- Preserves existing data by converting arrays to text

-- Step 1: Add a new temporary column for the text version
ALTER TABLE arqam_signups 
ADD COLUMN interested_sectors_text TEXT;

-- Step 2: Convert existing array data to text
-- This will convert arrays like ['FinTech', 'AgriTech'] to 'FinTech, AgriTech'
UPDATE arqam_signups 
SET interested_sectors_text = array_to_string(interested_sectors, ', ')
WHERE interested_sectors IS NOT NULL AND array_length(interested_sectors, 1) > 0;

-- Step 3: For any rows where the array was empty or null, set to empty string
UPDATE arqam_signups 
SET interested_sectors_text = ''
WHERE interested_sectors_text IS NULL;

-- Step 4: Drop the old array column
ALTER TABLE arqam_signups 
DROP COLUMN interested_sectors;

-- Step 5: Rename the new text column to the original name
ALTER TABLE arqam_signups 
RENAME COLUMN interested_sectors_text TO interested_sectors;

-- Step 6: Add NOT NULL constraint to the new text column
ALTER TABLE arqam_signups 
ALTER COLUMN interested_sectors SET NOT NULL;

-- Step 7: Update the comment to reflect the change
COMMENT ON COLUMN arqam_signups.interested_sectors IS 'Text description of interested sectors and data areas';

-- Optional: Create an index on the new text column for better search performance
CREATE INDEX idx_arqam_signups_interested_sectors ON arqam_signups USING gin(to_tsvector('english', interested_sectors));

