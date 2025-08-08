-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    credits INTEGER NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    enrolled_students INTEGER DEFAULT 0,
    max_capacity INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    semester VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create course_materials table
CREATE TABLE IF NOT EXISTS course_materials (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    -- document, video, link, assignment
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create notifications table for admin notifications
CREATE TABLE IF NOT EXISTS admin_notifications (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    -- info, success, warning, error
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_department ON courses(department);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_semester ON courses(semester);
CREATE INDEX IF NOT EXISTS idx_course_materials_course_id ON course_materials(course_id);
CREATE INDEX IF NOT EXISTS idx_course_materials_type ON course_materials(type);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_read ON admin_notifications(is_read);
-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'plpgsql';
-- Apply triggers
CREATE TRIGGER update_courses_updated_at BEFORE
UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_materials_updated_at BEFORE
UPDATE ON course_materials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Insert sample data
INSERT INTO courses (
        course_code,
        title,
        department,
        credits,
        instructor,
        enrolled_students,
        max_capacity,
        status,
        semester,
        description
    )
VALUES (
        'CSE-101',
        'Programming Fundamentals',
        'Computer Science',
        3,
        'Khudeja Khanom Anwara',
        45,
        50,
        'active',
        'Fall 2024',
        'Introduction to programming concepts and problem solving'
    ),
    (
        'MATH-201',
        'Calculus II',
        'Mathematics',
        4,
        'Dr. Sarah Johnson',
        35,
        40,
        'active',
        'Fall 2024',
        'Advanced calculus concepts and applications'
    ),
    (
        'PHY-101',
        'Physics I',
        'Physics',
        3,
        'Prof. Michael Brown',
        28,
        35,
        'active',
        'Fall 2024',
        'Fundamental principles of physics'
    ),
    (
        'CSE-201',
        'Data Structures',
        'Computer Science',
        3,
        'Md. Rakib Hassan',
        42,
        45,
        'active',
        'Fall 2024',
        'Data structures and algorithms fundamentals'
    ) ON CONFLICT (course_code) DO NOTHING;
-- Insert sample materials
INSERT INTO course_materials (course_id, title, type, url, description)
VALUES (
        1,
        'Course Syllabus',
        'document',
        '/syllabus.pdf',
        'Complete course outline'
    ),
    (
        1,
        'Lecture 1 Recording',
        'video',
        '/lecture1.mp4',
        'Introduction to Programming'
    ),
    (
        1,
        'Programming Exercises',
        'link',
        'https://exercises.com',
        'Practice problems'
    ),
    (
        2,
        'Textbook PDF',
        'document',
        '/calculus2.pdf',
        'Main textbook'
    ),
    (
        2,
        'Solution Manual',
        'document',
        '/solutions.pdf',
        'Problem solutions'
    ),
    (
        3,
        'Lab Manual',
        'document',
        '/lab-manual.pdf',
        'Laboratory experiments guide'
    ),
    (
        4,
        'Course Notes',
        'document',
        '/ds-notes.pdf',
        'Comprehensive notes'
    ),
    (
        4,
        'Coding Examples',
        'link',
        'https://github.com/examples',
        'Code repository'
    );