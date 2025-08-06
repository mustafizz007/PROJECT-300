import bcrypt from 'bcrypt';
import pool from './db.js';

async function setupAdminTable() {
  try {
    console.log('Setting up admin_info table...');
    
    // Create the admin_info table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_info (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        admin_id VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        access_level VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Admin table created successfully!');
    
    // Create indexes
    await pool.query('CREATE INDEX IF NOT EXISTS idx_admin_id ON admin_info(admin_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_admin_department ON admin_info(department)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_admin_access_level ON admin_info(access_level)');

    console.log('Indexes created successfully!');

    // Create a default super admin
    const defaultPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    try {
      await pool.query(`
        INSERT INTO admin_info (name, admin_id, password, department, position, access_level) 
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        'Super Admin',
        'ADMIN-001', 
        hashedPassword,
        'IT Department',
        'Super Admin',
        'Full Access'
      ]);
      
      console.log('Default super admin created!');
      console.log('📝 Login with: ADMIN-001 / admin123');
    } catch (err) {
      if (err.code === '23505') {
        console.log('ℹ️  Default admin already exists');
      } else {
        throw err;
      }
    }

    console.log('Admin setup completed successfully!');

  } catch (error) {
    console.error('Error setting up admin table:', error);
  } finally {
    pool.end();
  }
}

setupAdminTable();
