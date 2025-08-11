import pool from '../config/db.js';

async function checkPrimaryKeys() {
  try {
    console.log('🔍 Checking primary keys on student_result table...');
    
    const result = await pool.query(`
      SELECT 
        tc.constraint_name, 
        tc.table_name, 
        kcu.column_name,
        tc.constraint_type
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      WHERE tc.table_name = 'student_result'
        AND tc.constraint_type = 'PRIMARY KEY';
    `);
    
    if (result.rows.length > 0) {
      console.table(result.rows);
    } else {
      console.log('❌ No primary key found on student_result table');
    }
    
  } catch (err) {
    console.error('❌ Error checking primary keys:', err);
  } finally {
    await pool.end();
  }
}

checkPrimaryKeys();
