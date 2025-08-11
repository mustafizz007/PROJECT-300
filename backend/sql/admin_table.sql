-- Create admin_info table for admin authentication and management
CREATE TABLE IF NOT EXISTS admin_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin_id VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    access_level VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create index on admin_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_id ON admin_info(admin_id);
-- Create index on department for filtering
CREATE INDEX IF NOT EXISTS idx_admin_department ON admin_info(department);
-- Create index on access_level for filtering
CREATE INDEX IF NOT EXISTS idx_admin_access_level ON admin_info(access_level);
-- Insert a default super admin (optional)
-- Password is 'admin123' hashed with bcrypt
INSERT INTO admin_info (
        name,
        admin_id,
        password,
        department,
        position,
        access_level
    )
VALUES (
        'Super Admin',
        'ADMIN-001',
        '$2b$10$XYZ123...',
        -- Replace with actual bcrypt hash of 'admin123'
        'IT Department',
        'Super Admin',
        'Full Access'
    ) ON CONFLICT (admin_id) DO NOTHING;
-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'plpgsql';
CREATE TRIGGER update_admin_info_updated_at BEFORE
UPDATE ON admin_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();