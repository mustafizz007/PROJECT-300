const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/student/:studentId - Fetch student name by ID
router.get('/:studentId', async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const result = await pool.query(
      'SELECT name FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ name: result.rows[0].name });
  } catch (err) {
    console.error('Get student error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
