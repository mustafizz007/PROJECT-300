import express from 'express';
import pool from '../db.js'; 
const router = express.Router();

// Test route - should be hit first
router.get('/test', (req, res) => {
  console.log('TEST ROUTE HIT!');
  res.json({ message: 'Test route working!' });
});

// Get phone number only - MUST BE BEFORE /:studentId route
router.get('/phone/:studentId', async (req, res) => {
  const { studentId } = req.params;
  console.log('Phone route hit for student:', studentId);
  try {
    const result = await pool.query(
      'SELECT phone FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log('Phone data:', result.rows[0]);
    res.json({ 
      phone: result.rows[0].phone || ''
    });
  } catch (err) {
    console.error('Get phone error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add phone number endpoint
router.get('/add-phone/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    await pool.query(
      'UPDATE student_info SET phone = $1 WHERE student_id = $2',
      ['01765-159810', studentId]
    );
    res.json({ message: 'Phone added successfully', studentId });
  } catch (err) {
    console.error('Add phone error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Test database structure
router.get('/db-test/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM student_info WHERE student_id = $1 LIMIT 1',
      [studentId]
    );
    
    if (result.rows.length === 0) {
      return res.json({ error: 'Student not found' });
    }
    
    res.json({ 
      columns: Object.keys(result.rows[0]),
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Test DB error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Test database structure
router.get('/test-db/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM student_info WHERE student_id = $1 LIMIT 1',
      [studentId]
    );
    
    if (result.rows.length === 0) {
      return res.json({ error: 'Student not found' });
    }
    
    res.json({ 
      columns: Object.keys(result.rows[0]),
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Test DB error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route: GET /api/student/highest-cgpa/:studentId - Get highest semester CGPA
router.get('/highest-cgpa/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    console.log('Fetching highest CGPA for student:', studentId);
    
    // Calculate CGPA for each semester and find the highest
    const result = await pool.query(
      `SELECT 
         semester,
         SUM(gpa * credit) AS total_points,
         SUM(credit) AS total_credits,
         (SUM(gpa * credit) / SUM(credit)) AS semester_cgpa
       FROM student_result 
       WHERE student_id = $1 
       GROUP BY semester 
       HAVING SUM(credit) > 0
       ORDER BY semester_cgpa DESC, semester DESC
       LIMIT 1`,
      [studentId]
    );

    console.log('Query result:', result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No results found for this student." });
    }

    const highestRecord = result.rows[0];
    
    // Round the CGPA in JavaScript instead of SQL
    const roundedCGPA = Math.round(highestRecord.semester_cgpa * 100) / 100;
    
    res.json({
      student_id: studentId,
      highest_cgpa: roundedCGPA,
      semester: highestRecord.semester,
      total_points: parseFloat(highestRecord.total_points),
      total_credits: parseFloat(highestRecord.total_credits)
    });
  } catch (err) {
    console.error('Highest CGPA fetch error:', err);
    res.status(500).json({ error: 'Server error while calculating highest CGPA' });
  }
});

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

// Route: GET /api/student/result/:student_id - Get CGPA of student by ID
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

// Route: GET /api/student/highest-cgpa/:studentId - Get highest semester CGPA
router.get('/highest-cgpa/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    console.log('Fetching highest CGPA for student:', studentId);
    
    // Calculate CGPA for each semester and find the highest
    const result = await pool.query(
      `SELECT 
         semester,
         SUM(gpa * credit) AS total_points,
         SUM(credit) AS total_credits,
         (SUM(gpa * credit) / SUM(credit)) AS semester_cgpa
       FROM student_result 
       WHERE student_id = $1 
       GROUP BY semester 
       HAVING SUM(credit) > 0
       ORDER BY semester_cgpa DESC, semester DESC
       LIMIT 1`,
      [studentId]
    );

    console.log('Query result:', result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No results found for this student." });
    }

    const highestRecord = result.rows[0];
    
    // Round the CGPA in JavaScript instead of SQL
    const roundedCGPA = Math.round(highestRecord.semester_cgpa * 100) / 100;
    
    res.json({
      student_id: studentId,
      highest_cgpa: roundedCGPA,
      semester: highestRecord.semester,
      total_points: parseFloat(highestRecord.total_points),
      total_credits: parseFloat(highestRecord.total_credits)
    });
  } catch (err) {
    console.error('Highest CGPA fetch error:', err);
    res.status(500).json({ error: 'Server error while calculating highest CGPA' });
  }
});

// GET /api/student/:studentId - Fetch student name and phone by ID (MUST BE LAST)
router.get('/:studentId', async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const result = await pool.query(
      'SELECT * FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log('Full student data from DB:', result.rows[0]);
    console.log('Available columns:', Object.keys(result.rows[0]));
    
    const responseData = { 
      name: result.rows[0].name,
      phone: result.rows[0].phone || 'No phone found', // Show debug info
      studentId: studentId,
      debug: result.rows[0] // Include all data for debugging
    };
    
    console.log('Response data:', responseData);
    res.json(responseData);
  } catch (err) {
    console.error('Get student error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;