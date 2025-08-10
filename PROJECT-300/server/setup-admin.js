import bcrypt from 'bcrypt';
import pool from './db.js';

/**
 * ADMIN SERVER CONNECTION SETUP INSTRUCTIONS
 *
 * This file sets up the admin authentication system and connects to the PostgreSQL database.
 * 
 * HOW ADMIN CONNECTS TO SERVER:
 * 
 * 1. DATABASE CONNECTION:
 *    - Uses PostgreSQL database via 'pool' from './db.js'
 *    - Database connection is configured in db.js file
 *    - Pool manages multiple database connections efficiently
 * 
 * 2. ADMIN TABLE STRUCTURE:
 *    - Creates 'admin_info' table with admin credentials
 *    - Stores: id, name, admin_id, password (hashed), department, position, access_level
 *    - Uses bcrypt for password hashing (security)
 * 
 * 3. SERVER INTEGRATION FLOW:
 *    Step 1: Run this script to create admin table: `node setup-admin.js`
 *    Step 2: Admin table is created with default super admin
 *    Step 3: Server routes (admin.js) use this table for authentication
 *    Step 4: Frontend admin login connects to server API endpoints
 * 
 * 4. CONNECTION ENDPOINTS:
 *    - POST /api/admin/login - Admin login authentication
 *    - GET /api/admin/profile - Get admin profile data
 *    - Admin routes are defined in './routes/admin.js'
 * 
 * 5. DEFAULT ADMIN CREDENTIALS:
 *    - Admin ID: ADMIN-001
 *    - Password: admin123
 *    - Access Level: Full Access
 * 
 * 6. SECURITY FEATURES:
 *    - Password hashing with bcrypt (salt rounds: 10)
 *    - Unique admin_id constraint
 *    - Database indexes for performance
 *    - Error handling for duplicate entries
 * 
 * TO USE THIS SETUP:
 * 1. Ensure PostgreSQL is running
 * 2. Configure database connection in db.js
 * 3. Run: `npm install bcrypt pg`
 * 4. Execute: `node setup-admin.js`
 * 5. Start server: `node index.js`
 * 6. Admin can now login through frontend
 */

async function setupAdminTable() {
  try {
    console.log('Setting up admin_info table...');
    
    // STEP 1: Create the admin_info table
    // This table stores all admin credentials and is used by server for authentication
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_info (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        admin_id VARCHAR(100) UNIQUE NOT NULL,  -- Unique login ID for admin
        password VARCHAR(255) NOT NULL,          -- Hashed password for security
        department VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        access_level VARCHAR(100) NOT NULL,      -- Controls admin permissions
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Admin table created successfully!');
    
    // STEP 2: Create database indexes for faster queries
    // These indexes improve server response time during admin login
    await pool.query('CREATE INDEX IF NOT EXISTS idx_admin_id ON admin_info(admin_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_admin_department ON admin_info(department)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_admin_access_level ON admin_info(access_level)');

    console.log('Indexes created successfully!');

    // STEP 3: Create a default super admin for initial system access
    // This admin can be used immediately after server setup
    const defaultPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);  // Hash password for security
    
    try {
      await pool.query(`
        INSERT INTO admin_info (name, admin_id, password, department, position, access_level) 
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        'Super Admin',
        'ADMIN-001',      // This ID is used for login from frontend
        hashedPassword,   // Secure hashed password
        'IT Department',
        'Super Admin',
        'Full Access'     // Highest permission level
      ]);
      
      console.log('Default super admin created!');
      console.log('📝 Login with: ADMIN-001 / admin123');
      console.log('Admin can now connect to server via frontend login');
    } catch (err) {
      if (err.code === '23505') {  // Unique constraint violation
        console.log('ℹ️  Default admin already exists');
        console.log('Server connection ready - admin can login');
      } else {
        throw err;
      }
    }

    console.log('Admin setup completed successfully!');
    console.log('Server is ready to accept admin connections');

  } catch (error) {
    console.error('Error setting up admin table:', error);
  } finally {
    // STEP 4: Close database connection after setup
    pool.end();
  }
}

setupAdminTable();
