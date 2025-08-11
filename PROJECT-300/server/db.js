import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'student_portal',
  password: 'nubah123',
  port: 5432,
});

export default pool;
