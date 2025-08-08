import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all courses with their materials
router.get('/courses', async (req, res) => {
  try {
    const coursesQuery = `
      SELECT 
        c.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', cm.id,
              'title', cm.title,
              'type', cm.type,
              'url', cm.url,
              'description', cm.description,
              'created_at', cm.created_at
            ) ORDER BY cm.created_at
          ) FILTER (WHERE cm.id IS NOT NULL), 
          '[]'::json
        ) as materials
      FROM courses c
      LEFT JOIN course_materials cm ON c.id = cm.course_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `;
    
    const result = await pool.query(coursesQuery);
    res.status(200).json({ courses: result.rows });
  } catch (err) {
    console.error('Get courses error:', err);
    res.status(500).json({ error: 'Server error while fetching courses' });
  }
});

// Get a single course by ID
router.get('/courses/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const courseQuery = `
      SELECT 
        c.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', cm.id,
              'title', cm.title,
              'type', cm.type,
              'url', cm.url,
              'description', cm.description
            ) ORDER BY cm.created_at
          ) FILTER (WHERE cm.id IS NOT NULL), 
          '[]'::json
        ) as materials
      FROM courses c
      LEFT JOIN course_materials cm ON c.id = cm.course_id
      WHERE c.id = $1
      GROUP BY c.id
    `;
    
    const result = await pool.query(courseQuery, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.status(200).json({ course: result.rows[0] });
  } catch (err) {
    console.error('Get course error:', err);
    res.status(500).json({ error: 'Server error while fetching course' });
  }
});

// Create a new course
router.post('/courses', async (req, res) => {
  const { 
    course_code, 
    title, 
    department, 
    credits, 
    instructor, 
    max_capacity, 
    semester, 
    description,
    status = 'active' 
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO courses (course_code, title, department, credits, instructor, max_capacity, semester, description, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [course_code, title, department, credits, instructor, max_capacity, semester, description, status]
    );

    // Add notification for students
    await pool.query(
      'INSERT INTO student_notifications (message, type) VALUES ($1, $2)',
      [`New course "${title}" has been created successfully`, 'success']
    );

    res.status(201).json({ 
      message: 'Course created successfully',
      course: result.rows[0]
    });
  } catch (err) {
    console.error('Create course error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Course code already exists' });
    } else {
      res.status(500).json({ error: 'Server error while creating course' });
    }
  }
});

// Update a course
router.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    course_code, 
    title, 
    department, 
    credits, 
    instructor, 
    max_capacity, 
    semester, 
    description,
    status
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE courses 
       SET course_code = $1, title = $2, department = $3, credits = $4, 
           instructor = $5, max_capacity = $6, semester = $7, description = $8, status = $9
       WHERE id = $10 RETURNING *`,
      [course_code, title, department, credits, instructor, max_capacity, semester, description, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Add notification for students
    await pool.query(
      'INSERT INTO student_notifications (message, type) VALUES ($1, $2)',
      [`Course "${title}" has been updated successfully`, 'info']
    );

    res.status(200).json({ 
      message: 'Course updated successfully',
      course: result.rows[0]
    });
  } catch (err) {
    console.error('Update course error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Course code already exists' });
    } else {
      res.status(500).json({ error: 'Server error while updating course' });
    }
  }
});

// Delete a course
router.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Get course title for notification
    const courseResult = await pool.query('SELECT title FROM courses WHERE id = $1', [id]);
    
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const courseTitle = courseResult.rows[0].title;

    // Delete course (materials will be deleted automatically due to CASCADE)
    await pool.query('DELETE FROM courses WHERE id = $1', [id]);

    // Add notification for students
    await pool.query(
      'INSERT INTO student_notifications (message, type) VALUES ($1, $2)',
      [`Course "${courseTitle}" has been deleted successfully`, 'warning']
    );

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Delete course error:', err);
    res.status(500).json({ error: 'Server error while deleting course' });
  }
});

// Add material to a course
router.post('/courses/:id/materials', async (req, res) => {
  const { id } = req.params;
  const { title, type, url, description } = req.body;

  try {
    // Check if course exists
    const courseCheck = await pool.query('SELECT title FROM courses WHERE id = $1', [id]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const result = await pool.query(
      'INSERT INTO course_materials (course_id, title, type, url, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, title, type, url, description]
    );

    // Add notification for students
    await pool.query(
      'INSERT INTO student_notifications (message, type) VALUES ($1, $2)',
      [`Material "${title}" has been added to course "${courseCheck.rows[0].title}"`, 'success']
    );

    res.status(201).json({ 
      message: 'Material added successfully',
      material: result.rows[0]
    });
  } catch (err) {
    console.error('Add material error:', err);
    res.status(500).json({ error: 'Server error while adding material' });
  }
});

// Update a material
router.put('/materials/:id', async (req, res) => {
  const { id } = req.params;
  const { title, type, url, description } = req.body;

  try {
    const result = await pool.query(
      'UPDATE course_materials SET title = $1, type = $2, url = $3, description = $4 WHERE id = $5 RETURNING *',
      [title, type, url, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.status(200).json({ 
      message: 'Material updated successfully',
      material: result.rows[0]
    });
  } catch (err) {
    console.error('Update material error:', err);
    res.status(500).json({ error: 'Server error while updating material' });
  }
});

// Delete a material
router.delete('/materials/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM course_materials WHERE id = $1 RETURNING title', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Material not found' });
    }

    // Add notification for students
    await pool.query(
      'INSERT INTO student_notifications (message, type) VALUES ($1, $2)',
      [`Material "${result.rows[0].title}" has been deleted successfully`, 'warning']
    );

    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (err) {
    console.error('Delete material error:', err);
    res.status(500).json({ error: 'Server error while deleting material' });
  }
});

// Get student notifications
router.get('/student/notifications', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM student_notifications ORDER BY created_at DESC LIMIT 10'
    );
    
    res.status(200).json({ notifications: result.rows });
  } catch (err) {
    console.error('Get student notifications error:', err);
    res.status(500).json({ error: 'Server error while fetching notifications' });
  }
});

// Mark student notification as read
router.put('/student/notifications/:id/read', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('UPDATE student_notifications SET is_read = true WHERE id = $1', [id]);
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Mark student notification read error:', err);
    res.status(500).json({ error: 'Server error while updating notification' });
  }
});

// Clear all student notifications
router.delete('/student/notifications', async (req, res) => {
  try {
    await pool.query('DELETE FROM student_notifications');
    res.status(200).json({ message: 'All notifications cleared' });
  } catch (err) {
    console.error('Clear student notifications error:', err);
    res.status(500).json({ error: 'Server error while clearing notifications' });
  }
});

// Get course statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_courses,
        COUNT(*) FILTER (WHERE status = 'active') as active_courses,
        COALESCE(AVG(enrolled_students::float / max_capacity::float) * 100, 0) as avg_capacity_percentage,
        COALESCE(SUM(enrolled_students), 0) as total_enrolled_students
      FROM courses
    `);

    const materialStats = await pool.query(`
      SELECT COUNT(*) as total_materials
      FROM course_materials
    `);

    res.status(200).json({ 
      stats: {
        ...stats.rows[0],
        total_materials: materialStats.rows[0].total_materials
      }
    });
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ error: 'Server error while fetching statistics' });
  }
});

export default router;
