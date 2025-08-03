import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'student_portal',
  password: '123admin',
  port: 5432,
});

export default pool;
