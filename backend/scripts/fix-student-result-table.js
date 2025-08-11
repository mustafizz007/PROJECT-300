import pool from '../config/db.js';

async function fixStudentResultTable() {
  try {
    console.log('🔧 Adding missing id column to student_result table...');
    
    // Add the id column as a serial primary key
    await pool.query(`
      ALTER TABLE student_result 
      ADD COLUMN id SERIAL PRIMARY KEY
    `);
    
    console.log('✅ Added id column to student_result table');
    
    // Add missing timestamp columns
    await pool.query(`
      ALTER TABLE student_result 
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    `);
    
    console.log('✅ Added timestamp columns to student_result table');
    
    // Check the updated structure
    console.log('\n📋 Updated student_result table structure:');
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'student_result' 
      ORDER BY ordinal_position
    `);
    
    console.table(result.rows);
    
  } catch (err) {
    console.error('❌ Error fixing student_result table:', err);
  } finally {
    await pool.end();
  }
}

fixStudentResultTable();
