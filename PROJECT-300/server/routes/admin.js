import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';

const router = express.Router();

// Admin Signup Route
router.post('/signup', async (req, res) => {
  const { name, admin_id, password, department, position, access_level } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO admin_info (name, admin_id, password, department, position, access_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [name, admin_id, hashedPassword, department, position, access_level]
    );

    res.status(201).json({ 
      message: 'Admin account created successfully!', 
      adminId: result.rows[0].id 
    });
  } catch (err) {
    console.error('Admin Signup DB Error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Admin ID already exists' });
    } else {
      res.status(500).json({ error: 'Server error during admin signup' });
    }
  }
});

// Admin Login Route
router.post('/login', async (req, res) => {
  const { admin_id, password } = req.body;

  try {
    // Find admin by admin_id
    const result = await pool.query(
      'SELECT * FROM admin_info WHERE admin_id = $1',
      [admin_id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid admin ID or password' });
    }

    const admin = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid admin ID or password' });
    }

    // Successful login
    res.status(200).json({ 
      message: 'Admin login successful', 
      name: admin.name,
      department: admin.department,
      position: admin.position,
      access_level: admin.access_level
    });
  } catch (err) {
    console.error('Admin Login error:', err);
    res.status(500).json({ error: 'Server error during admin login' });
  }
});

// Get Admin Profile
router.get('/profile/:admin_id', async (req, res) => {
  const { admin_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, name, admin_id, department, position, access_level, created_at FROM admin_info WHERE admin_id = $1',
      [admin_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ admin: result.rows[0] });
  } catch (err) {
    console.error('Get Admin Profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get All Admins (for super admin)
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, admin_id, department, position, access_level, created_at FROM admin_info ORDER BY created_at DESC'
    );

    res.status(200).json({ admins: result.rows });
  } catch (err) {
    console.error('Get All Admins error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Admin Access Level (for super admin)
router.put('/update-access/:admin_id', async (req, res) => {
  const { admin_id } = req.params;
  const { access_level } = req.body;

  try {
    const result = await pool.query(
      'UPDATE admin_info SET access_level = $1 WHERE admin_id = $2 RETURNING *',
      [access_level, admin_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ 
      message: 'Admin access level updated successfully',
      admin: result.rows[0]
    });
  } catch (err) {
    console.error('Update Admin Access error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
