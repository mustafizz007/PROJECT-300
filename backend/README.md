# Backend - Student Management System

Node.js backend API for the Student Management System.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL or PostgreSQL database

### Installation
```bash
npm install
```

### Database Setup
1. Create a database
2. Run the SQL files to set up tables:
   ```bash
   mysql -u username -p database_name < admin_table.sql
   mysql -u username -p database_name < course_tables.sql
   mysql -u username -p database_name < update_notifications.sql
   ```

### Environment Variables
Create a `.env` file with:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Development
```bash
npm start
```

## 📁 Structure

```
backend/
├── routes/            # API route handlers
│   ├── admin.js      # Admin routes
│   ├── courses.js    # Course routes
│   ├── student.js    # Student routes
│   └── courses-api/  # Course API modules
├── *.sql             # Database schema files
├── db.js             # Database connection
├── index.js          # Main server file
└── setup-*.js        # Database setup scripts
```

## 🔧 Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing

## 📋 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/signup` - Admin registration

### Student Routes
- `GET /api/student/:id` - Get student profile
- `GET /api/student/:id/courses` - Get student courses
- `GET /api/student/:id/notifications` - Get notifications

### Course Routes
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Admin Routes
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Add new student

## 🗄️ Database

The system uses MySQL with the following main tables:
- `students` - Student information
- `courses` - Course details
- `enrollments` - Student-course relationships
- `grades` - Student grades
- `admins` - Admin users
- `notifications` - System notifications
