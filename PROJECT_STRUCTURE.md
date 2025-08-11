# PROJECT-300 Structure Overview

## 📁 Root Directory Structure

```
PROJECT-300/
├── 📁 backend/                    # Backend Server (Node.js + Express)
│   ├── �� config/                 # Database and server configuration
│   ├── 📁 routes/                 # API route handlers
│   ├── 📁 scripts/                # Setup and utility scripts
│   ├── 📁 sql/                    # Database schema files
│   ├── index.js                   # Main server entry point
│   ├── package.json               # Backend dependencies
│   └── README.md                  # Backend documentation
│
├── 📁 frontend/                   # Frontend Client (React + Vite)
│   ├── 📁 public/                 # Static assets
│   ├── 📁 src/                    # Source code
│   │   ├── 📁 assets/             # Images, icons
│   │   ├── 📁 components/         # React components
│   │   │   ├── 📁 Admin/          # Admin-specific components
│   │   │   ├── 📁 ui/             # Reusable UI components
│   │   │   └── ...                # Other feature components
│   │   ├── 📁 contexts/           # React contexts
│   │   ├── 📁 hooks/              # Custom hooks
│   │   ├── 📁 lib/                # Utility libraries
│   │   ├── 📁 services/           # API service functions
│   │   ├── 📁 utils/              # Helper functions
│   │   ├── App.jsx                # Main App component
│   │   └── main.jsx               # React entry point
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   └── README.md                  # Frontend documentation
│
├── 📁 docs/                       # Project Documentation
│   ├── 📁 admin/                  # Admin feature docs
│   ├── 📁 api/                    # API documentation
│   ├── 📁 database/               # Database documentation
│   └── 📁 features/               # Feature specifications
│
├── .gitignore                     # Git ignore rules
├── README.md                      # Main project documentation
├── SETUP.md                       # Setup instructions
└── PROJECT_STRUCTURE.md           # This file
```

## Development Workflow

### Backend Development

```bash
cd backend
npm install
npm start
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

## Key Features

### Backend Features

- **Express.js API** - RESTful API endpoints
- **MySQL Database** - Student and course data management
- **Authentication** - JWT-based admin authentication
- **CORS Support** - Cross-origin resource sharing
- **Route Organization** - Modular route handlers

### Frontend Features

- **React 18** - Modern React with hooks
- **Vite** - Fast development and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Component Architecture** - Reusable component system
- **State Management** - Context API for global state
- **Responsive Design** - Mobile-first approach

## Database Schema

### Main Tables

- **students** - Student information and profiles
- **courses** - Course catalog and details
- **enrollments** - Student course enrollments
- **results** - Academic results and grades
- **semesters** - Academic semester information
- **admin_users** - Administrative user accounts

## API Endpoints

### Student APIs

- \`GET /api/student/:id\` - Get student profile
- \`GET /api/student/:id/courses\` - Get student courses
- \`GET /api/student/:id/results\` - Get academic results

### Course APIs

- \`GET /api/courses\` - Get all courses
- \`GET /api/courses/:id\` - Get specific course
- \`POST /api/courses\` - Create new course (admin)

### Admin APIs

- \`POST /api/admin/login\` - Admin authentication
- \`GET /api/admin/students\` - Get all students
- \`POST /api/admin/students\` - Create new student

## Application Flow

1. **Admin Dashboard** - Administrative interface for managing students and courses
2. **Student Portal** - Student interface for viewing courses, results, and resources
3. **Authentication** - Secure login system for both admin and students
4. **Data Management** - CRUD operations for all entities

## Getting Started

See [SETUP.md](SETUP.md) for detailed setup instructions.

## Documentation

- **API Documentation**: [docs/api/](docs/api/)
- **Database Schema**: [docs/database/](docs/database/)
- **Feature Specs**: [docs/features/](docs/features/)
- **Admin Guide**: [docs/admin/](docs/admin/)

---

This structure provides clear separation of concerns, making the project maintainable and scalable.
