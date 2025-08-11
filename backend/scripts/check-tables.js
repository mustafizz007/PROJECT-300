import pool from '../config/db.js';

async function checkTables() {
  try {
    // Check student_info table structure
    console.log('📋 Checking student_info table structure:');
    const studentInfoResult = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'student_info' 
      ORDER BY ordinal_position
    `);
    
    if (studentInfoResult.rows.length > 0) {
      console.table(studentInfoResult.rows);
    } else {
      console.log('❌ student_info table does not exist');
    }
    
    // Check student_result table structure
    console.log('\n📋 Checking student_result table structure:');
    const studentResultResult = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'student_result' 
      ORDER BY ordinal_position
    `);
    
    if (studentResultResult.rows.length > 0) {
      console.table(studentResultResult.rows);
    } else {
      console.log('❌ student_result table does not exist');
    }
    
  } catch (err) {
    console.error('❌ Error checking tables:', err);
  } finally {
    await pool.end();
  }
}

checkTables();
