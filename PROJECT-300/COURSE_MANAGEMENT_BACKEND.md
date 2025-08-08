# Course Management System - Dynamic Backend Integration


#### Course Management

- `GET /api/admin/courses` - Get all courses with materials
- `GET /api/admin/courses/:id` - Get single course
- `POST /api/admin/courses` - Create new course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course

#### Material Management

- `POST /api/admin/courses/:id/materials` - Add material to course
- `PUT /api/admin/materials/:id` - Update material
- `DELETE /api/admin/materials/:id` - Delete material

#### Notifications & Stats

- `GET /api/admin/notifications` - Get notifications
- `PUT /api/admin/notifications/:id/read` - Mark as read
- `DELETE /api/admin/notifications` - Clear all
- `GET /api/admin/stats` - Get course statistics

 Database Setup

 SQL Commands for Table Creation

Step 1: Create Database

CREATE DATABASE student_portal;

-- Connect to the database
\c student_portal;
```
 Step 2: Create Tables in Order

**1. Courses Table**

```sql
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
```

2. Course Materials Table**

```sql
CREATE TABLE IF NOT EXISTS course_materials (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- document, video, link, assignment
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Admin Info Table**

```sql
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
```

**4. Student Notifications Table**

```sql
CREATE TABLE IF NOT EXISTS student_notifications (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- info, success, warning, error
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Step 3: Create Indexes

```sql
-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_department ON courses(department);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_semester ON courses(semester);
CREATE INDEX IF NOT EXISTS idx_course_materials_course_id ON course_materials(course_id);
CREATE INDEX IF NOT EXISTS idx_course_materials_type ON course_materials(type);
CREATE INDEX IF NOT EXISTS idx_admin_id ON admin_info(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_department ON admin_info(department);
CREATE INDEX IF NOT EXISTS idx_student_notifications_read ON student_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_student_notifications_created_at ON student_notifications(created_at DESC);
```

#### Step 4: Create Update Trigger Function

```sql
-- Function to auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_materials_updated_at
    BEFORE UPDATE ON course_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_info_updated_at
    BEFORE UPDATE ON admin_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### Step 5: Insert Sample Data

```sql
-- Sample courses
INSERT INTO courses (course_code, title, department, credits, instructor, enrolled_students, max_capacity, status, semester, description)
VALUES
    ('CSE-101', 'Programming Fundamentals', 'Computer Science', 3, 'Khudeja Khanom Anwara', 45, 50, 'active', 'Fall 2024', 'Introduction to programming concepts'),
    ('MATH-201', 'Calculus II', 'Mathematics', 4, 'Dr. Sarah Johnson', 35, 40, 'active', 'Fall 2024', 'Advanced calculus concepts'),
    ('PHY-101', 'Physics I', 'Physics', 3, 'Prof. Michael Brown', 28, 35, 'active', 'Fall 2024', 'Fundamental principles of physics'),
    ('CSE-201', 'Data Structures', 'Computer Science', 3, 'Md. Rakib Hassan', 42, 45, 'active', 'Fall 2024', 'Data structures and algorithms')
ON CONFLICT (course_code) DO NOTHING;

-- Sample materials
INSERT INTO course_materials (course_id, title, type, url, description)
VALUES
    (1, 'Course Syllabus', 'document', '/syllabus.pdf', 'Complete course outline'),
    (1, 'Lecture 1 Recording', 'video', '/lecture1.mp4', 'Introduction to Programming'),
    (2, 'Textbook PDF', 'document', '/calculus2.pdf', 'Main textbook'),
    (3, 'Lab Manual', 'document', '/lab-manual.pdf', 'Laboratory experiments guide');

-- Sample admin
INSERT INTO admin_info (name, admin_id, password, department, position, access_level)
VALUES ('Super Admin', 'ADMIN-001', '$2b$10$hashedpassword', 'IT Department', 'Super Admin', 'Full Access')
ON CONFLICT (admin_id) DO NOTHING;
```

### Quick Setup Commands

**Option 1: Using psql command line**

```bash
# Connect to PostgreSQL
psql -U postgres

# Run the commands above one by one
```

**Option 2: Using SQL files (if you have the files)**

```bash
# Execute the three SQL files in order
psql -U postgres -d student_portal -f course_tables.sql
psql -U postgres -d student_portal -f admin_table.sql
psql -U postgres -d student_portal -f update_notifications.sql
```

1. Created course tables with proper relationships
2. Added indexes for performance
3. Inserted sample data for testing
4. Set up proper foreign key constraints

## API Service Layer

Created `src/services/api.js` with:

- Centralized API configuration
- Reusable API call functions
- Error handling
- Separate modules for courses and notifications

## How to Use

### Starting the System

1. **Database**: Ensure PostgreSQL is running with `student_portal` database
2. **Backend**: Run `node index.js` from `/server` directory (Port 3000)