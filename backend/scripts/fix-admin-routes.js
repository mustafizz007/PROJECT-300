import fs from 'fs';

// Read the admin.js file
let content = fs.readFileSync('routes/admin.js', 'utf8');

// Fix the /results route - replace sr.id with a computed unique id
content = content.replace(
  /SELECT\s+sr\.id,/g,
  'SELECT \n        CONCAT(sr.student_id, \'-\', sr.course_id, \'-\', sr.semester) as id,'
);

// Fix created_at reference  
content = content.replace(
  /sr\.created_at/g,
  'CURRENT_TIMESTAMP as created_at'
);

// Fix ORDER BY clause to remove sr.created_at
content = content.replace(
  /ORDER BY sr\.created_at DESC, sr\.student_id, sr\.semester/g,
  'ORDER BY sr.student_id, sr.semester, sr.course_id'
);

// Fix courses query - change credit to credits
content = content.replace(
  /SELECT course_code, title, credit FROM courses/g,
  'SELECT course_code, title, credits as credit FROM courses'
);

// Write the fixed content back
fs.writeFileSync('routes/admin.js', content);

console.log('✅ Fixed admin routes!');
