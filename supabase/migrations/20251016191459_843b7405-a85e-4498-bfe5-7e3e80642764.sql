-- Add contact information fields to personal_info table
ALTER TABLE public.personal_info 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS twitter_url text,
ADD COLUMN IF NOT EXISTS services jsonb DEFAULT '[]'::jsonb;

-- Update default values if needed
COMMENT ON COLUMN public.personal_info.phone IS 'Contact phone number';
COMMENT ON COLUMN public.personal_info.location IS 'Physical location/city';
COMMENT ON COLUMN public.personal_info.twitter_url IS 'Twitter/X profile URL';
COMMENT ON COLUMN public.personal_info.services IS 'Array of services offered with title, description, and technologies';