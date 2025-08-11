-- Update notifications table for student notifications
-- Drop the admin_notifications table if it exists
DROP TABLE IF EXISTS admin_notifications;
-- Create student_notifications table for student notifications
CREATE TABLE IF NOT EXISTS student_notifications (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    -- info, success, warning, error
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create index on student_notifications for better performance
CREATE INDEX IF NOT EXISTS idx_student_notifications_read ON student_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_student_notifications_created_at ON student_notifications(created_at DESC);