-- Clean up malformed services data
UPDATE personal_info 
SET services = '[]'::jsonb 
WHERE id = 'e2473a40-ebb9-4c89-ae61-19078c4c7c7a';