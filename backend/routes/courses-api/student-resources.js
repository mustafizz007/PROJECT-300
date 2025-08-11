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
 * GET /api/student-resources/completed/:studentId
 * Fetch completed courses with their course materials for resources page
 */
router.get('/completed/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    console.log(`Fetching completed courses with resources for student: ${studentId}`);
    
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
        let pdfResources = [];
        let urlResources = [];

        if (course.course_db_id) {
          // Fetch materials for this course
          const materialsResult = await pool.query(
            `SELECT title, type, url, description 
             FROM course_materials 
             WHERE course_id = $1 
             ORDER BY created_at DESC`,
            [course.course_db_id]
          );

          // Separate materials by type
          pdfResources = materialsResult.rows
            .filter(material => material.type === 'document')
            .map(material => ({
              name: material.title,
              url: material.url,
              description: material.description
            }));

          urlResources = materialsResult.rows
            .filter(material => ['link', 'video'].includes(material.type))
            .map(material => ({
              name: material.title,
              url: material.url,
              description: material.description,
              type: material.type
            }));
        }

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

    console.log(`Response: ${coursesWithResources.length} completed courses with resources`);
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
 * GET /api/student-resources/remaining/:studentId
 * Fetch remaining courses with their course materials for resources page
 */
router.get('/remaining/:studentId', async (req, res) => {
  const { studentId } = req.params;
  
  try {
    console.log(`Fetching remaining courses with resources for student: ${studentId}`);
    
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

    // Get all available courses from ALL departments that are not completed
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
       WHERE course_code NOT IN (${completedCourseIds.map((_, index) => `$${index + 1}`).join(', ')})
       AND status = 'active'
       ORDER BY department, course_code`;
      params = [...completedCourseIds];
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
       WHERE status = 'active'
       ORDER BY department, course_code`;
      params = [];
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

    const responseData = {
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
    };

    console.log(`Response: ${coursesWithResources.length} remaining courses with resources`);
    res.json(responseData);
    
  } catch (err) {
    console.error('Error fetching remaining courses with resources:', err);
    res.status(500).json({ 
      error: 'Server error while fetching remaining courses with resources', 
      details: err.message 
    });
  }
});

export default router;
