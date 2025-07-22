-- Admin configuration table for storing admin passwords and settings
-- This table should be created in your Supabase database

-- Create admin_config table
CREATE TABLE IF NOT EXISTS admin_config (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    password_hash VARCHAR(255), -- For storing hashed passwords
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: Admin password will be set via the application
-- The password will be properly hashed with bcrypt before storage
-- No default password is inserted for security reasons

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_config_key ON admin_config(key);

-- Row Level Security (RLS) - Allow public access for admin setup
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public access to read admin config (for password verification)
CREATE POLICY "Allow public to read admin config" ON admin_config
    FOR SELECT USING (true);

-- Policy: Allow public to insert admin config (for first-time setup)
CREATE POLICY "Allow public to insert admin config" ON admin_config
    FOR INSERT WITH CHECK (true);

-- Policy: Allow public to update admin config (for password changes)
CREATE POLICY "Allow public to update admin config" ON admin_config
    FOR UPDATE USING (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_admin_config_updated_at 
    BEFORE UPDATE ON admin_config 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 