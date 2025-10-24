-- Fix the services column data to be properly formatted
-- This updates any malformed services data to an empty array
-- You'll need to add proper services through the admin panel

UPDATE personal_info 
SET services = '[]'::jsonb 
WHERE services IS NULL 
   OR services::text = 'null' 
   OR NOT jsonb_typeof(services) = 'array';