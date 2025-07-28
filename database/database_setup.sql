-- Feedback Table Setup for Salary Calculator
-- Run this in your Supabase SQL Editor

-- Create the feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('feature', 'bug', 'improvement', 'other')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  device_info TEXT,
  user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_priority ON feedback(priority);

-- Enable Row Level Security (optional - for production)
-- ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for demo purposes)
-- CREATE POLICY "Allow all operations" ON feedback FOR ALL USING (true);

-- Insert some sample data (optional)
INSERT INTO feedback (type, title, description, priority, contact_email, device_info, user_agent) VALUES
('feature', 'Dark Mode Support', 'Would love to have a dark mode option for better visibility at night', 'medium', NULL, '1920x1080', 'Mozilla/5.0...'),
('bug', 'Time Input Validation', 'The time input sometimes accepts invalid formats', 'high', NULL, '1366x768', 'Chrome/91.0...'),
('improvement', 'Export to PDF', 'Add ability to export salary calculations to PDF', 'low', NULL, '2560x1440', 'Safari/14.0...');

-- Verify the table was created
SELECT * FROM feedback ORDER BY created_at DESC LIMIT 5; 