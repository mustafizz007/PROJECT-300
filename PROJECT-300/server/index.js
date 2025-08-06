import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pool from './db.js';
import studentRoutes from './routes/student.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = 3000;

//  CORS middleware before anything else
app.use(cors());
app.use(express.json());

// Mount student routes
app.use('/api/student', studentRoutes);

// Mount admin routes
app.use('/admin', adminRoutes);

//  Signup Route
app.post('/signup', async (req, res) => {
  const { name, student_id, password, department } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO student_info (name, student_id, password, department) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, student_id, hashedPassword, department]
    );

    res.status(201).json({ message: 'Signup successful!', userId: result.rows[0].id });
  } catch (err) {
    console.error(' DB Insert Error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Student ID already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { student_id, password } = req.body;

  try {
    // 1. Find student by student_id
    const result = await pool.query(
      'SELECT * FROM student_info WHERE student_id = $1',
      [student_id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid student ID or password' });
    }

    const user = result.rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid student ID or password' });
    }

    res.status(200).json({ message: 'Login successful', name: user.name });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});