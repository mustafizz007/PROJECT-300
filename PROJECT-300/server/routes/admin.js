import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';

const router = express.Router();

// Admin Signup Route
router.post('/signup', async (req, res) => {
  const { name, admin_id, password, department, position, access_level } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO admin_info (name, admin_id, password, department, position, access_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [name, admin_id, hashedPassword, department, position, access_level]
    );

    res.status(201).json({ 
      message: 'Admin account created successfully!', 
      adminId: result.rows[0].id 
    });
  } catch (err) {
    console.error('Admin Signup DB Error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Admin ID already exists' });
    } else {
      res.status(500).json({ error: 'Server error during admin signup' });
    }
  }
});

// Admin Login Route
router.post('/login', async (req, res) => {
  const { admin_id, password } = req.body;

  try {
    // Find admin by admin_id
    const result = await pool.query(
      'SELECT * FROM admin_info WHERE admin_id = $1',
      [admin_id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid admin ID or password' });
    }

    const admin = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid admin ID or password' });
    }

    // Successful login
    res.status(200).json({ 
      message: 'Admin login successful', 
      name: admin.name,
      department: admin.department,
      position: admin.position,
      access_level: admin.access_level
    });
  } catch (err) {
    console.error('Admin Login error:', err);
    res.status(500).json({ error: 'Server error during admin login' });
  }
});

// Get Admin Profile
router.get('/profile/:admin_id', async (req, res) => {
  const { admin_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, name, admin_id, department, position, access_level, created_at FROM admin_info WHERE admin_id = $1',
      [admin_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ admin: result.rows[0] });
  } catch (err) {
    console.error('Get Admin Profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get All Admins (for super admin)
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, admin_id, department, position, access_level, created_at FROM admin_info ORDER BY created_at DESC'
    );

    res.status(200).json({ admins: result.rows });
  } catch (err) {
    console.error('Get All Admins error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Admin Access Level (for super admin)
router.put('/update-access/:admin_id', async (req, res) => {
  const { admin_id } = req.params;
  const { access_level } = req.body;

  try {
    const result = await pool.query(
      'UPDATE admin_info SET access_level = $1 WHERE admin_id = $2 RETURNING *',
      [access_level, admin_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ 
      message: 'Admin access level updated successfully',
      admin: result.rows[0]
    });
  } catch (err) {
    console.error('Update Admin Access error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ADMIN DASHBOARD APIs

// Get dashboard overview stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Get total students
    const totalStudentsResult = await pool.query('SELECT COUNT(*) as count FROM student_info');
    const totalStudents = parseInt(totalStudentsResult.rows[0].count);

    // Get active courses
    const activeCoursesResult = await pool.query('SELECT COUNT(*) as count FROM courses WHERE status = $1', ['active']);
    const activeCourses = parseInt(activeCoursesResult.rows[0].count);

    // Get total course results published (unique course-semester combinations)
    const publishedResultsResult = await pool.query('SELECT COUNT(DISTINCT course_id) as count FROM student_result');
    const publishedResults = parseInt(publishedResultsResult.rows[0].count);

    // Get graduates (students with completed courses - simplified logic)
    const graduatesResult = await pool.query(`
      SELECT COUNT(DISTINCT student_id) as count 
      FROM student_result 
      WHERE semester LIKE '4-%'
    `);
    const graduates = parseInt(graduatesResult.rows[0].count);

    // Calculate average CGPA
    const avgCgpaResult = await pool.query(`
      SELECT AVG(cgpa) as avg_cgpa FROM (
        SELECT student_id, 
               ROUND(CAST(SUM(gpa * credit) / SUM(credit) AS NUMERIC), 2) as cgpa
        FROM student_result 
        GROUP BY student_id
      ) as student_cgpas
    `);
    const avgCgpa = parseFloat(avgCgpaResult.rows[0].avg_cgpa || 0).toFixed(2);

    // Calculate pass rate (students with CGPA >= 2.0)
    const passRateResult = await pool.query(`
      SELECT 
        COUNT(CASE WHEN cgpa >= 2.0 THEN 1 END) * 100.0 / COUNT(*) as pass_rate
      FROM (
        SELECT student_id, 
               SUM(gpa * credit) / SUM(credit) as cgpa
        FROM student_result 
        GROUP BY student_id
      ) as student_cgpas
    `);
    const passRate = parseFloat(passRateResult.rows[0].pass_rate || 0).toFixed(0);

    res.json({
      totalStudents,
      activeCourses,
      publishedResults,
      graduates,
      avgCgpa,
      passRate: `${passRate}%`
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Server error while fetching dashboard stats' });
  }
});

// Get all students for admin management
router.get('/students', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        si.id,
        si.student_id,
        si.name,
        si.department,
        si.phone,
        COALESCE(
          ROUND(CAST(SUM(sr.gpa * sr.credit) / SUM(sr.credit) AS NUMERIC), 2),
          0.00
        ) as cgpa,
        CASE 
          WHEN MAX(sr.semester) LIKE '4-%' THEN 'graduating'
          WHEN MAX(sr.semester) IS NOT NULL THEN 'active'
          ELSE 'inactive'
        END as status,
        COALESCE(MAX(sr.semester), 'Not Started') as current_semester
      FROM student_info si
      LEFT JOIN student_result sr ON si.student_id = sr.student_id
      GROUP BY si.id, si.student_id, si.name, si.department, si.phone
      ORDER BY si.student_id
    `);

    const students = result.rows.map(row => ({
      id: row.id,
      studentId: row.student_id,
      name: row.name,
      email: `${row.student_id}@student.university.edu`, // Generated email
      department: row.department,
      semester: row.current_semester === 'Not Started' ? 'Not Started' : `${row.current_semester} semester`,
      cgpa: parseFloat(row.cgpa),
      status: row.status,
      phone: row.phone
    }));

    res.json(students);
  } catch (err) {
    console.error('Get students error:', err);
    res.status(500).json({ error: 'Server error while fetching students' });
  }
});

// Create new student
router.post('/students', async (req, res) => {
  const { name, student_id, department, phone, password } = req.body;
  
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password || 'default123', 10);
    
    const result = await pool.query(
      'INSERT INTO student_info (name, student_id, password, department, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, student_id, hashedPassword, department, phone]
    );

    res.status(201).json({ 
      message: 'Student created successfully', 
      student: result.rows[0] 
    });
  } catch (err) {
    console.error('Create student error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Student ID already exists' });
    } else {
      res.status(500).json({ error: 'Server error while creating student' });
    }
  }
});

// Update student
router.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, department, phone } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE student_info SET name = $1, department = $2, phone = $3 WHERE id = $4 RETURNING *',
      [name, department, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ 
      message: 'Student updated successfully', 
      student: result.rows[0] 
    });
  } catch (err) {
    console.error('Update student error:', err);
    res.status(500).json({ error: 'Server error while updating student' });
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // First delete related results
    const student = await pool.query('SELECT student_id FROM student_info WHERE id = $1', [id]);
    if (student.rows.length > 0) {
      await pool.query('DELETE FROM student_result WHERE student_id = $1', [student.rows[0].student_id]);
    }
    
    // Then delete student
    const result = await pool.query('DELETE FROM student_info WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Delete student error:', err);
    res.status(500).json({ error: 'Server error while deleting student' });
  }
});

// Get recent activities for dashboard
router.get('/dashboard/recent-activities', async (req, res) => {
  try {
    // Get recent course results
    const recentResults = await pool.query(`
      SELECT DISTINCT c.title as course_name, c.course_code, 'results published' as activity_type, c.updated_at as activity_date
      FROM courses c 
      WHERE c.updated_at IS NOT NULL 
      ORDER BY c.updated_at DESC 
      LIMIT 3
    `);

    // Get recent student enrollments
    const recentStudents = await pool.query(`
      SELECT si.name as student_name, 'enrolled' as activity_type, si.id::text as activity_date
      FROM student_info si 
      ORDER BY si.id DESC 
      LIMIT 2
    `);

    const activities = [
      ...recentResults.rows.map(row => ({
        type: row.activity_type,
        course: row.course_code,
        courseName: row.course_name,
        date: row.activity_date
      })),
      ...recentStudents.rows.map(row => ({
        type: row.activity_type,
        student: row.student_name,
        date: new Date()
      }))
    ];

    res.json(activities.slice(0, 5)); // Return latest 5 activities
  } catch (err) {
    console.error('Recent activities error:', err);
    res.status(500).json({ error: 'Server error while fetching recent activities' });
  }
});

export default router;
