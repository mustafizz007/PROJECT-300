// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres', // your username
//   host: 'localhost',
//   database: 'student_portal', // the one where you created the table
//   password: 'nubah123', // what you set during install
//   port: 5432,
// });

//module.exports = pool; 

import pkg from 'pg';
const { Pool } = pkg;

//import pkg from 'pg';
//const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'student_portal',
  password: '123admin',
  port: 5432,
});

export default pool;

