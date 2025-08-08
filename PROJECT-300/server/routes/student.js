import express from 'express';
import pool from '../db.js'; // Make sure you added .js extension
const router = express.Router();

// Route: GET /api/student/academic-years-status/:studentId
router.get('/academic-years-status/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await pool.query(
      `SELECT semester, credit
       FROM student_result
       WHERE student_id = $1`,
      [studentId]
    );

    const rows = result.rows;

    // Organize semesters by year
    const years = {};
    rows.forEach(({ semester, credit }) => {
      const [year, term] = semester.split('-'); // e.g. '1-2' => year='1', term='2'
      if (!years[year]) {
        years[year] = {
          year: `Year ${year}`,
          credits: 0,
          semesters: new Set(),
        };
      }
      years[year].credits += parseFloat(credit);
      years[year].semesters.add(`${year}-${term}`);
    });

    // Prepare response with statuses
    const response = [];

    // Check for years 1 to 4 (or change range as needed)
    for (let y = 1; y <= 4; y++) {
      const yearKey = `${y}`;
      const yearData = years[yearKey];

      if (yearData) {
        const sems = yearData.semesters;
        let status = 'Not Started';
        if (sems.has(`${yearKey}-3`)) {
          status = 'Completed';
        } else if (sems.has(`${yearKey}-1`) || sems.has(`${yearKey}-2`)) {
          status = 'In Progress';
        }

        response.push({
          year: yearData.year,
          credits: yearData.credits,
          status,
        });
      } else {
        // Year not present at all → Not Started, 0 credits
        response.push({
          year: `Year ${y}`,
          credits: 0,
          status: 'Not Started',
        });
      }
    }

    res.json(response);
  } catch (err) {
    console.error('Error fetching academic years status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// NEW API: GET /api/student/phone/:studentId - Fetch student phone number
router.get('/phone/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await pool.query(
      'SELECT phone FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const phone = result.rows[0].phone;
    res.json({ 
      student_id: studentId,
      phone: phone || null 
    });
  } catch (err) {
    console.error('Get student phone error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route 2: Get CGPA of student by ID
router.get('/result/:student_id', async (req, res) => {
  const { student_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT
         SUM(gpa * credit) AS total_points,
         SUM(credit) AS total_credits
       FROM student_result
       WHERE student_id = $1`,
      [student_id]
    );

    const row = result.rows[0];
    if (row.total_credits === null || row.total_credits == 0) {
      return res.status(404).json({ message: "No results found for this student." });
    }

    const cgpa = (row.total_points / row.total_credits).toFixed(2);
    res.json({ student_id, cgpa, total_credits: parseFloat(row.total_credits) });
  } catch (err) {
    console.error('CGPA fetch error:', err);
    res.status(500).json({ error: 'Server error while calculating CGPA' });
  }
});

// Route: GET /api/student/semesters/:studentId
router.get('/semesters/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await pool.query(
      'SELECT DISTINCT semester FROM student_result WHERE student_id = $1 ORDER BY semester',
      [studentId]
    );

    const semesters = result.rows.map(row => row.semester);
    res.json({ semesters });
  } catch (err) {
    console.error('Error fetching semesters:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get student notifications
router.get('/notifications', async (req, res) => {
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
router.put('/notifications/:id/read', async (req, res) => {
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
router.delete('/notifications', async (req, res) => {
  try {
    await pool.query('DELETE FROM student_notifications');
    res.status(200).json({ message: 'All notifications cleared' });
  } catch (err) {
    console.error('Clear student notifications error:', err);
    res.status(500).json({ error: 'Server error while clearing notifications' });
  }
});

// GET /api/student/:studentId - Fetch student data including phone (catch-all route - must be last)
router.get('/:studentId', async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const result = await pool.query(
      'SELECT name, phone, department FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ 
      student_id: studentId,
      name: result.rows[0].name,
      phone: result.rows[0].phone,
      department: result.rows[0].department
    });
  } catch (err) {
    console.error('Get student error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;