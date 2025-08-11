import express from 'express';
import pool from '../config/db.js'; 
const router = express.Router();


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
      const [year, term] = semester.split('-'); 
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

// DEBUG API: Check raw semester data
router.get('/debug-semester/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await pool.query(
      `SELECT semester, course_id, credit, gpa FROM student_result WHERE student_id = $1 ORDER BY semester, course_id`,
      [studentId]
    );
    
    res.json({ 
      student_id: studentId,
      raw_data: result.rows 
    });
  } catch (err) {
    console.error('Debug error:', err);
    res.status(500).json({ error: 'Server error' });
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

// NEW API: GET /api/student/current-semester/:studentId - Get the current semester (highest semester + 1)
router.get('/current-semester/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    // Get the highest semester for the student
    const result = await pool.query(
      'SELECT MAX(semester) as highest_semester FROM student_result WHERE student_id = $1',
      [studentId]
    );

    const highestSemester = result.rows[0].highest_semester;
    
    if (!highestSemester) {
      // Student has no completed courses, so current semester is 1-1
      return res.json({ 
        student_id: studentId,
        current_semester: '1-1',
        year: 1,
        term: 1
      });
    }

    // Parse the highest semester (format: "year-term")
    const [year, term] = highestSemester.split('-').map(num => parseInt(num));
    
    // Calculate next semester
    let nextYear = year;
    let nextTerm = term + 1;
    
    // If term exceeds 3, move to next year
    if (nextTerm > 3) {
      nextYear = year + 1;
      nextTerm = 1;
    }
    
    const currentSemester = `${nextYear}-${nextTerm}`;
    
    res.json({
      student_id: studentId,
      current_semester: currentSemester,
      year: nextYear,
      term: nextTerm,
      highest_completed_semester: highestSemester
    });
  } catch (err) {
    console.error('Error fetching current semester:', err);
    res.status(500).json({ error: 'Server error while fetching current semester' });
  }
});

// NEW API: GET /api/student/semester-results/:studentId - Fetch semester-wise results
router.get('/semester-results/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    // console.log('Fetching semester results for student:', studentId);
    
    const result = await pool.query(
      `SELECT 
         semester,
         COUNT(*) as course_count,
         SUM(credit) as total_credits,
         ROUND(CAST(SUM(gpa * credit) / SUM(credit) AS NUMERIC), 2) as semester_gpa
       FROM student_result 
       WHERE student_id = $1 
       GROUP BY semester 
       ORDER BY semester`,
      [studentId]
    );

    // console.log('Database result:', result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No results found for this student' });
    }

    // Transform the data to match frontend expectations
    const semesterResults = result.rows.map((row, index) => {
      // Simple semester naming - just use the index + 1
      const semesterNumber = index + 1;
      const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
      const ordinal = ordinals[semesterNumber] || `${semesterNumber}th`;
      
      // console.log('Processing row:', row);
      // console.log('Total credits raw value:', row.total_credits, 'Type:', typeof row.total_credits);
      
      return {
        semester: `${ordinal} semester`,
        cgpa: parseFloat(row.semester_gpa).toFixed(2),
        credits: row.total_credits, // Use raw value directly
        status: 'Completed',
        course_count: parseInt(row.course_count)
      };
    });

    // console.log('Final semester results:', semesterResults);

    res.json({ 
      student_id: studentId,
      semester_results: semesterResults 
    });
  } catch (err) {
    console.error('Error fetching semester results:', err);
    console.error('Error details:', err.message);
    res.status(500).json({ error: 'Server error while fetching semester results', details: err.message });
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

// NEW API: GET /api/student/:studentId/results/:semester - Fetch detailed semester results with course names
router.get('/:studentId/results/:semester', async (req, res) => {
  const { studentId, semester } = req.params;
  try {
    // console.log(`Fetching detailed results for student ${studentId}, semester ${semester}`);
    
    const result = await pool.query(
      `SELECT 
         sr.course_id,
         sr.credit,
         sr.gpa,
         sr.semester,
         COALESCE(c.title, 'Course Name Not Found') as course_title
       FROM student_result sr
       LEFT JOIN courses c ON sr.course_id = c.course_code
       WHERE sr.student_id = $1 AND sr.semester = $2
       ORDER BY sr.course_id`,
      [studentId, semester]
    );

    // console.log('Raw query result:', result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No results found for this student and semester' });
    }

    // Transform the data to match frontend expectations
    const courses = result.rows.map((row, index) => ({
      sl: index + 1,
      courseId: row.course_id,
      courseName: row.course_title,
      cgpa: parseFloat(row.gpa).toFixed(2),
      credits: row.credit,
      status: 'Regular' // All completed courses are marked as Regular
    }));

    // Calculate summary statistics
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = courses.reduce((sum, course) => sum + (parseFloat(course.cgpa) * course.credits), 0);
    const semesterCGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';

    const responseData = {
      courses,
      summary: {
        totalCredits: totalCredits,
        remainingCredits: Math.max(0, 160 - totalCredits), // Assuming 160 is total required
        totalCGPA: semesterCGPA
      }
    };

    // console.log('Final response:', responseData);
    res.json(responseData);
  } catch (err) {
    console.error('Error fetching detailed semester results:', err);
    res.status(500).json({ error: 'Server error while fetching semester results', details: err.message });
  }
});

// NEW API: GET /api/student/:studentId/cgpa - Get overall CGPA and highest semester CGPA
router.get('/:studentId/cgpa', async (req, res) => {
  const { studentId } = req.params;
  try {
    // console.log('Fetching CGPA data for student:', studentId);
    
    // Get overall CGPA
    const overallResult = await pool.query(
      `SELECT
         ROUND(CAST(SUM(gpa * credit) / SUM(credit) AS NUMERIC), 2) as overall_cgpa,
         SUM(credit) as total_credits
       FROM student_result
       WHERE student_id = $1`,
      [studentId]
    );

    // Get semester-wise CGPAs to find the highest
    const semesterResult = await pool.query(
      `SELECT 
         semester,
         ROUND(CAST(SUM(gpa * credit) / SUM(credit) AS NUMERIC), 2) as semester_cgpa
       FROM student_result 
       WHERE student_id = $1 
       GROUP BY semester 
       ORDER BY semester_cgpa DESC, semester`,
      [studentId]
    );

    if (overallResult.rows.length === 0) {
      return res.status(404).json({ error: 'No results found for this student' });
    }

    const overallCgpa = overallResult.rows[0].overall_cgpa;
    const semesterData = semesterResult.rows;
    
    // Find highest CGPA semester
    const highestSemester = semesterData[0];
    
    // Convert semester format (1-1, 1-2, etc.) to readable format
    const convertSemesterFormat = (semester) => {
      const parts = semester.split('-');
      const yearNum = parseInt(parts[0]);
      const termNum = parseInt(parts[1]);
      
      // Calculate semester number: Year 1 Term 1 = Semester 1, Year 1 Term 2 = Semester 2, etc.
      const semesterNum = (yearNum - 1) * 3 + termNum;
      
      const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
      return ordinals[semesterNum] || `${semesterNum}th`;
    };

    const response = {
      currentCGPA: overallCgpa.toString(),
      scale: "4.0",
      highestCGPA: highestSemester.semester_cgpa.toString(),
      highestSemester: `${convertSemesterFormat(highestSemester.semester)} semester`,
      totalCredits: parseFloat(overallResult.rows[0].total_credits)
    };

    console.log('CGPA response:', response);
    res.json(response);
  } catch (err) {
    console.error('Error fetching CGPA data:', err);
    res.status(500).json({ error: 'Server error while fetching CGPA data' });
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