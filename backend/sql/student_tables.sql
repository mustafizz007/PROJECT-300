-- Create student_info table
CREATE TABLE IF NOT EXISTS student_info (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    department VARCHAR(255) NOT NULL,
    session VARCHAR(20),
    current_semester INTEGER DEFAULT 1,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create student_result table
CREATE TABLE IF NOT EXISTS student_result (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    course_id VARCHAR(20) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    credit DECIMAL(4,2) NOT NULL,
    gpa DECIMAL(3,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student_info(student_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_student_info_student_id ON student_info(student_id);
CREATE INDEX IF NOT EXISTS idx_student_info_department ON student_info(department);
CREATE INDEX IF NOT EXISTS idx_student_result_student_id ON student_result(student_id);
CREATE INDEX IF NOT EXISTS idx_student_result_course_id ON student_result(course_id);
CREATE INDEX IF NOT EXISTS idx_student_result_semester ON student_result(semester);

-- Apply update triggers
CREATE TRIGGER update_student_info_updated_at 
    BEFORE UPDATE ON student_info 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_result_updated_at 
    BEFORE UPDATE ON student_result 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample student data
INSERT INTO student_info (student_id, name, phone, email, department, session, password)
VALUES 
    ('2021-1-60-001', 'John Doe', '01712345678', 'john.doe@example.com', 'Computer Science', '2021-1', '$2b$10$abcdefghijklmnopqrstuvwxyz'),
    ('2021-1-60-002', 'Jane Smith', '01787654321', 'jane.smith@example.com', 'Computer Science', '2021-1', '$2b$10$abcdefghijklmnopqrstuvwxyz'),
    ('2021-1-60-003', 'Mike Johnson', '01798765432', 'mike.johnson@example.com', 'Computer Science', '2021-1', '$2b$10$abcdefghijklmnopqrstuvwxyz')
ON CONFLICT (student_id) DO NOTHING;

-- Insert sample results data
INSERT INTO student_result (student_id, course_id, semester, credit, gpa)
VALUES 
    ('2021-1-60-001', 'CSE-101', 'Fall 2024', 3.0, 3.75),
    ('2021-1-60-001', 'MATH-201', 'Fall 2024', 4.5, 3.5),
    ('2021-1-60-002', 'CSE-101', 'Fall 2024', 3.0, 4.0),
    ('2021-1-60-002', 'PHY-101', 'Fall 2024', 2.5, 3.25),
    ('2021-1-60-003', 'CSE-201', 'Fall 2024', 3.5, 3.75),
    ('2021-1-60-003', 'MATH-201', 'Fall 2024', 4.5, 3.0)
ON CONFLICT DO NOTHING;
