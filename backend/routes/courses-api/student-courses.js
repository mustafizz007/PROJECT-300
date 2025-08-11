import express from 'express';
import pool from '../../config/db.js';

const router = express.Router();

// Helper function for letter grades
function getLetterGrade(gpa) {
  if (gpa >= 3.7) return 'A+';
  if (gpa >= 3.3) return 'A';
  if (gpa >= 3.0) return 'A-';
  if (gpa >= 2.7) return 'B+';
  if (gpa >= 2.3) return 'B';
  if (gpa >= 2.0) return 'B-';
  if (gpa >= 1.7) return 'C+';
  if (gpa >= 1.3) return 'C';
  if (gpa >= 1.0) return 'C-';
  return 'F';
}

/**
 * GET /api/student-courses/completed/:studentId
 * Fetch all completed courses for a student with course details
 */
router.get('/completed/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {    
    // Query to get completed courses with course details
    const result = await pool.query(
      `SELECT 
         sr.course_id,
         sr.credit,
         sr.gpa,
         sr.semester,
         COALESCE(c.title, 'Course Name Not Found') as course_title,
         COALESCE(c.instructor, 'Instructor Not Found') as instructor,
         COALESCE(c.department, 'Unknown Department') as department,
         COALESCE(c.course_code, sr.course_id) as course_code
       FROM student_result sr
       LEFT JOIN courses c ON sr.course_id = c.course_code
       WHERE sr.student_id = $1
       ORDER BY sr.semester, sr.course_id`,
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'No completed courses found for this student',
        completed_courses: []
      });
    }

    // Transform data to match frontend expectations
    const completedCourses = result.rows.map((row, index) => {
      return {
        id: index + 1, // Frontend expects an ID
        title: row.course_title,
        instructor: `Lecturer: ${row.instructor}`,
        grade: getLetterGrade(parseFloat(row.gpa)),
        gpa: parseFloat(row.gpa).toFixed(2),
        code: row.course_code,
        credits: row.credit,
        semester: row.semester,
        department: row.department
      };
    });

    // Calculate summary statistics
    const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = completedCourses.reduce((sum, course) => sum + (parseFloat(course.gpa) * course.credits), 0);
    const overallCGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';

    const responseData = {
      student_id: studentId,
      completed_courses: completedCourses,
      summary: {
        total_courses: completedCourses.length,
        total_credits: totalCredits,
        overall_cgpa: overallCGPA,
        semesters_completed: [...new Set(completedCourses.map(course => course.semester))].length
      }
    };

    res.json(responseData);
    
  } catch (err) {
    console.error('Error fetching completed courses:', err);
    res.status(500).json({ 
      error: 'Server error while fetching completed courses', 
      details: err.message 
    });
  }
});

/**
 * GET /api/student-courses/running/:studentId
 * Fetch currently running courses for a student based on current semester
 */
router.get('/running/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    // First, get the current semester (highest semester + 1)
    const semesterResult = await pool.query(
      'SELECT MAX(semester) as highest_semester FROM student_result WHERE student_id = $1',
      [studentId]
    );

    const highestSemester = semesterResult.rows[0].highest_semester;
    
    let currentSemester;
    if (!highestSemester) {
      currentSemester = '1-1'; // First semester if no completed courses
    } else {
      const [year, term] = highestSemester.split('-').map(num => parseInt(num));
      let nextYear = year;
      let nextTerm = term + 1;
      
      if (nextTerm > 3) {
        nextYear = year + 1;
        nextTerm = 1;
      }
      
      currentSemester = `${nextYear}-${nextTerm}`;
    }

    // Get student's department to filter relevant courses
    const studentResult = await pool.query(
      'SELECT department FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentDepartment = studentResult.rows[0].department;

    // Get completed course codes to exclude them
    const completedResult = await pool.query(
      'SELECT DISTINCT course_id FROM student_result WHERE student_id = $1',
      [studentId]
    );

    const completedCourseIds = completedResult.rows.map(row => row.course_id);

    // Get available courses for the current semester (not yet completed)
    let query, params;
    if (completedCourseIds.length > 0) {
      query = `SELECT 
         id,
         course_code,
         title,
         instructor,
         credits,
         department,
         description,
         semester as course_semester
       FROM courses 
       WHERE department = $1 
       AND course_code NOT IN (${completedCourseIds.map((_, index) => `$${index + 2}`).join(', ')})
       AND status = 'active'
       ORDER BY course_code
       LIMIT 6`; // Limit to reasonable number of running courses
      params = [studentDepartment, ...completedCourseIds];
    } else {
      query = `SELECT 
         id,
         course_code,
         title,
         instructor,
         credits,
         department,
         description,
         semester as course_semester
       FROM courses 
       WHERE department = $1 
       AND status = 'active'
       ORDER BY course_code
       LIMIT 6`;
      params = [studentDepartment];
    }

    const coursesResult = await pool.query(query, params);

    const runningCourses = coursesResult.rows.map((course, index) => ({
      id: index + 1,
      title: course.title,
      instructor: `Lecturer: ${course.instructor}`,
      grade: null, // No grade yet for running courses
      code: course.course_code,
      credits: course.credits,
      semester: currentSemester,
      department: course.department,
      status: "ongoing",
      description: course.description
    }));

    res.json({
      student_id: studentId,
      current_semester: currentSemester,
      running_courses: runningCourses,
      summary: {
        total_courses: runningCourses.length,
        total_credits: runningCourses.reduce((sum, course) => sum + course.credits, 0)
      }
    });
    
  } catch (err) {
    console.error('Error fetching running courses:', err);
    res.status(500).json({ 
      error: 'Server error while fetching running courses', 
      details: err.message 
    });
  }
});

/**
 * GET /api/student-courses/completed-with-resources/:studentId
 * Fetch completed courses with their course materials
 */
router.get('/completed-with-resources/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    // Query to get completed courses with course details and materials
    const result = await pool.query(
      `SELECT 
         sr.course_id,
         sr.credit,
         sr.gpa,
         sr.semester,
         COALESCE(c.title, 'Course Name Not Found') as course_title,
         COALESCE(c.instructor, 'Instructor Not Found') as instructor,
         COALESCE(c.department, 'Unknown Department') as department,
         COALESCE(c.course_code, sr.course_id) as course_code,
         c.id as course_db_id
       FROM student_result sr
       LEFT JOIN courses c ON sr.course_id = c.course_code
       WHERE sr.student_id = $1
       ORDER BY sr.semester, sr.course_id`,
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'No completed courses found for this student',
        completed_courses: []
      });
    }

    // Get course materials for each completed course
    const coursesWithResources = await Promise.all(
      result.rows.map(async (course) => {
        if (!course.course_db_id) {
          // No course materials if course not found in courses table
          return {
            id: course.course_id,
            title: `${course.course_code} - ${course.course_title}`,
            instructor: `Lecturer: ${course.instructor}`,
            grade: getLetterGrade(parseFloat(course.gpa)),
            gpa: parseFloat(course.gpa).toFixed(2),
            code: course.course_code,
            credits: course.credit,
            semester: course.semester,
            department: course.department,
            pdfResources: [],
            urlResources: []
          };
        }

        // Fetch materials for this course
        const materialsResult = await pool.query(
          `SELECT title, type, url, description 
           FROM course_materials 
           WHERE course_id = $1 
           ORDER BY created_at DESC`,
          [course.course_db_id]
        );

        // Separate materials by type
        const pdfResources = materialsResult.rows
          .filter(material => material.type === 'document')
          .map(material => ({
            name: material.title,
            url: material.url,
            description: material.description
          }));

        const urlResources = materialsResult.rows
          .filter(material => ['link', 'video'].includes(material.type))
          .map(material => ({
            name: material.title,
            url: material.url,
            description: material.description,
            type: material.type
          }));

        return {
          id: course.course_id,
          title: `${course.course_code} - ${course.course_title}`,
          instructor: `Lecturer: ${course.instructor}`,
          grade: getLetterGrade(parseFloat(course.gpa)),
          gpa: parseFloat(course.gpa).toFixed(2),
          code: course.course_code,
          credits: course.credit,
          semester: course.semester,
          department: course.department,
          pdfResources: pdfResources,
          urlResources: urlResources
        };
      })
    );

    const responseData = {
      student_id: studentId,
      completed_courses: coursesWithResources,
      summary: {
        total_courses: coursesWithResources.length,
        total_credits: coursesWithResources.reduce((sum, course) => sum + course.credits, 0),
        courses_with_materials: coursesWithResources.filter(course => 
          course.pdfResources.length > 0 || course.urlResources.length > 0
        ).length
      }
    };

    res.json(responseData);
    
  } catch (err) {
    console.error('Error fetching completed courses with resources:', err);
    res.status(500).json({ 
      error: 'Server error while fetching completed courses with resources', 
      details: err.message 
    });
  }
});

/**
 * GET /api/student-courses/remaining-with-resources/:studentId
 * Fetch remaining courses with their course materials
 */
router.get('/remaining-with-resources/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    // Get student's department
    const studentResult = await pool.query(
      'SELECT department FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentDepartment = studentResult.rows[0].department;

    // Get completed course codes
    const completedResult = await pool.query(
      'SELECT DISTINCT course_id FROM student_result WHERE student_id = $1',
      [studentId]
    );

    const completedCourseIds = completedResult.rows.map(row => row.course_id);

    // Get all available courses in student's department that are not completed
    let query, params;
    if (completedCourseIds.length > 0) {
      query = `SELECT 
         id,
         course_code,
         title,
         instructor,
         credits,
         department,
         description
       FROM courses 
       WHERE department = $1 
       AND course_code NOT IN (${completedCourseIds.map((_, index) => `$${index + 2}`).join(', ')})
       AND status = 'active'
       ORDER BY course_code`;
      params = [studentDepartment, ...completedCourseIds];
    } else {
      query = `SELECT 
         id,
         course_code,
         title,
         instructor,
         credits,
         department,
         description
       FROM courses 
       WHERE department = $1 
       AND status = 'active'
       ORDER BY course_code`;
      params = [studentDepartment];
    }

    const availableResult = await pool.query(query, params);

    // Get course materials for each remaining course
    const coursesWithResources = await Promise.all(
      availableResult.rows.map(async (course) => {
        // Fetch materials for this course
        const materialsResult = await pool.query(
          `SELECT title, type, url, description 
           FROM course_materials 
           WHERE course_id = $1 
           ORDER BY created_at DESC`,
          [course.id]
        );

        // Separate materials by type
        const pdfResources = materialsResult.rows
          .filter(material => material.type === 'document')
          .map(material => ({
            name: material.title,
            url: material.url,
            description: material.description
          }));

        const urlResources = materialsResult.rows
          .filter(material => ['link', 'video'].includes(material.type))
          .map(material => ({
            name: material.title,
            url: material.url,
            description: material.description,
            type: material.type
          }));

        return {
          id: course.id,
          title: `${course.course_code} - ${course.title}`,
          instructor: `Lecturer: ${course.instructor}`,
          grade: null, // No grade for remaining courses
          code: course.course_code,
          credits: course.credits,
          department: course.department,
          description: course.description,
          status: "not_started",
          pdfResources: pdfResources,
          urlResources: urlResources
        };
      })
    );

    res.json({
      student_id: studentId,
      student_department: studentDepartment,
      remaining_courses: coursesWithResources,
      completed_courses_count: completedCourseIds.length,
      summary: {
        total_remaining: coursesWithResources.length,
        total_credits: coursesWithResources.reduce((sum, course) => sum + course.credits, 0),
        courses_with_materials: coursesWithResources.filter(course => 
          course.pdfResources.length > 0 || course.urlResources.length > 0
        ).length
      }
    });
    
  } catch (err) {
    console.error('Error fetching remaining courses with resources:', err);
    res.status(500).json({ 
      error: 'Server error while fetching remaining courses with resources', 
      details: err.message 
    });
  }
});

/**
 * GET /api/student-courses/summary/:studentId
 * Get a complete summary of student's course progress
 */
router.get('/summary/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    // Get completed courses count and credits
    const completedResult = await pool.query(
      `SELECT 
         COUNT(*) as completed_count,
         SUM(credit) as completed_credits,
         ROUND(CAST(SUM(gpa * credit) / SUM(credit) AS NUMERIC), 2) as overall_cgpa
       FROM student_result 
       WHERE student_id = $1`,
      [studentId]
    );

    // Get student department
    const studentResult = await pool.query(
      'SELECT name, department FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { name, department } = studentResult.rows[0];
    const { completed_count, completed_credits, overall_cgpa } = completedResult.rows[0];

    // Get total available courses from ALL departments
    const totalCoursesResult = await pool.query(
      'SELECT COUNT(*) as total_courses FROM courses WHERE status = $1',
      ['active']
    );

    // Get total departmental courses
    const departmentalCoursesResult = await pool.query(
      'SELECT COUNT(*) as departmental_courses FROM courses WHERE department = $1 AND status = $2',
      [department, 'active']  
    );

    const totalCourses = parseInt(totalCoursesResult.rows[0].total_courses);
    const departmentalCourses = parseInt(departmentalCoursesResult.rows[0].departmental_courses);
    const remainingCourses = totalCourses - parseInt(completed_count);

    const summary = {
      student_id: studentId,
      student_name: name,
      department: department,
      completed_courses: parseInt(completed_count),
      remaining_courses: Math.max(0, remainingCourses),
      total_available_courses: totalCourses,
      departmental_courses: departmentalCourses,
      interdisciplinary_courses: totalCourses - departmentalCourses,
      completed_credits: parseFloat(completed_credits) || 0,
      overall_cgpa: parseFloat(overall_cgpa) || 0,
      progress_percentage: totalCourses > 0 ? Math.round((parseInt(completed_count) / totalCourses) * 100) : 0
    };

    res.json(summary);
    
  } catch (err) {
    console.error('Error fetching course summary:', err);
    res.status(500).json({ 
      error: 'Server error while fetching course summary', 
      details: err.message 
    });
  }
});

/**
 * GET /api/student-courses/remaining/:studentId
 * UPDATED VERSION WITH FIX FOR INTERDISCIPLINARY COURSES
 */
router.get('/remaining/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    // Get student's department
    const studentResult = await pool.query(
      'SELECT department FROM student_info WHERE student_id = $1',
      [studentId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentDepartment = studentResult.rows[0].department;

    // Get completed course codes
    const completedResult = await pool.query(
      'SELECT DISTINCT course_id FROM student_result WHERE student_id = $1',
      [studentId]
    );

    const completedCourseIds = completedResult.rows.map(row => row.course_id);

    // Create normalized completed course codes (remove dashes) for comparison
    const normalizedCompleted = completedCourseIds.map(id => id.replace(/-/g, ''));

    // Get all available courses that are not completed (using normalized comparison)
    const query = `SELECT 
       course_code,
       title,
       instructor,
       credits,
       department,
       description
     FROM courses 
     WHERE REPLACE(course_code, '-', '') NOT IN (${normalizedCompleted.map((_, index) => `$${index + 1}`).join(', ')})
     AND status = 'active'
     ORDER BY department, course_code`;

    const availableResult = await pool.query(query, normalizedCompleted);

    const remainingCourses = availableResult.rows.map((row, index) => ({
      id: index + 1,
      title: row.title,
      instructor: `Lecturer: ${row.instructor}`,
      grade: null,
      code: row.course_code,
      credits: row.credits,
      department: row.department,
      description: row.description,
      status: "not_started",
      is_departmental: row.department === studentDepartment
    }));

    res.json({
      student_id: studentId,
      student_department: studentDepartment,
      remaining_courses: remainingCourses,
      completed_courses_count: completedCourseIds.length,
      summary: {
        total_remaining: remainingCourses.length,
        total_credits: remainingCourses.reduce((sum, course) => sum + course.credits, 0)
      }
    });
    
  } catch (err) {
    console.error('Error fetching remaining courses:', err);
    res.status(500).json({ 
      error: 'Server error while fetching remaining courses', 
      details: err.message 
    });
  }
});

export default router;
