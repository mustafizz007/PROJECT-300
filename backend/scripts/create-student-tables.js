import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createStudentTables() {
  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, '../sql/student_tables.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL
    await pool.query(sql);
    console.log('✅ Student tables created successfully!');
    
    // Test the connection
    const result = await pool.query('SELECT COUNT(*) FROM student_info');
    console.log(`📊 Student records: ${result.rows[0].count}`);
    
    const resultCount = await pool.query('SELECT COUNT(*) FROM student_result');
    console.log(`📊 Result records: ${resultCount.rows[0].count}`);
    
  } catch (err) {
    console.error('❌ Error creating student tables:', err);
  } finally {
    await pool.end();
  }
}

createStudentTables();
