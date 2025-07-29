-- Secure Feedback Table with RLS
-- This configuration allows the app to work but blocks direct database access

-- Enable RLS on the feedback table
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies first
DROP POLICY IF EXISTS "Allow insert for all users" ON feedback;
DROP POLICY IF EXISTS "Deny select for all users" ON feedback;
DROP POLICY IF EXISTS "Deny update for all users" ON feedback;
DROP POLICY IF EXISTS "Deny delete for all users" ON feedback;

-- Policy 1: Allow INSERT only from the app (with proper user agent validation)
CREATE POLICY "Allow insert from app only" ON feedback
  FOR INSERT 
  WITH CHECK (
    -- Only allow inserts with a proper user agent (browser/app)
    user_agent IS NOT NULL 
    AND user_agent != ''
    AND (
      -- Allow common browser user agents
      user_agent LIKE '%Mozilla%' OR
      user_agent LIKE '%Chrome%' OR
      user_agent LIKE '%Safari%' OR
      user_agent LIKE '%Firefox%' OR
      user_agent LIKE '%Edge%' OR
      -- Allow React app user agents
      user_agent LIKE '%React%' OR
      -- Allow mobile browsers
      user_agent LIKE '%Mobile%' OR
      user_agent LIKE '%Android%' OR
      user_agent LIKE '%iPhone%' OR
      user_agent LIKE '%iPad%'
    )
    -- Ensure required fields are present
    AND title IS NOT NULL 
    AND title != ''
    AND description IS NOT NULL 
    AND description != ''
    AND type IN ('feature', 'bug', 'improvement', 'other')
    AND priority IN ('low', 'medium', 'high')
  );

-- Policy 2: Block all SELECT operations (no reading feedback)
CREATE POLICY "Block all select operations" ON feedback
  FOR SELECT 
  USING (false);

-- Policy 3: Block all UPDATE operations (no modifying feedback)
CREATE POLICY "Block all update operations" ON feedback
  FOR UPDATE 
  USING (false);

-- Policy 4: Block all DELETE operations (no deleting feedback)
CREATE POLICY "Block all delete operations" ON feedback
  FOR DELETE 
  USING (false);

-- Additional security: Create a function to validate app requests
CREATE OR REPLACE FUNCTION validate_app_request()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user agent is present and valid
  IF NEW.user_agent IS NULL OR NEW.user_agent = '' THEN
    RAISE EXCEPTION 'Invalid request: Missing user agent';
  END IF;
  
  -- Check if device info is present
  IF NEW.device_info IS NULL OR NEW.device_info = '' THEN
    RAISE EXCEPTION 'Invalid request: Missing device info';
  END IF;
  
  -- Check if created_at is set
  IF NEW.created_at IS NULL THEN
    NEW.created_at = NOW();
  END IF;
  
  -- Ensure contact_email is always null for privacy
  NEW.contact_email = NULL;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the validation trigger
DROP TRIGGER IF EXISTS validate_feedback_insert ON feedback;
CREATE TRIGGER validate_feedback_insert
  BEFORE INSERT ON feedback
  FOR EACH ROW
  EXECUTE FUNCTION validate_app_request();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON feedback TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE feedback_id_seq TO anon, authenticated;

-- Revoke unnecessary permissions
REVOKE SELECT, UPDATE, DELETE ON feedback FROM anon, authenticated; 