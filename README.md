# MU_Portal

The landing page of MU Portal, showcasing navigation and entry points for students and admins.

<img width="1455" height="859" alt="Screenshot 2025-09-09 220803" src="https://github.com/user-attachments/assets/a4d86226-532d-453d-a005-adc7aa8208cc" />

## 🌟 Overview
The homepage serves as the entry point of MU Portal, providing a simple and intuitive interface for both students and admins. From here, users can easily navigate to login or signup and explore the core features of the portal.

## 🛠️ Technologies Used

### Frontend
- **React.js** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication

## 🔥 Features

- Student Dashboard
- Course Management
- Grade Tracking
- Resource Management
- Admin Panel
- Authentication System

## 📸 Screenshots
## Student Signup
<img width="1318" height="872" alt="Screenshot 2025-09-09 220843" src="https://github.com/user-attachments/assets/87a0b5fe-6a70-4cfe-84b4-c41a2c037956" />
-Registration page where new students can create their accounts.

## Student Login
<img width="1282" height="729" alt="Screenshot 2025-09-09 220820" src="https://github.com/user-attachments/assets/1d472e84-89a8-48a4-b875-b9c906621cb4" />
-Login page for existing students to securely access the portal.

## Student Dashboard
<img width="1916" height="859" alt="Screenshot 2025-09-09 220928" src="https://github.com/user-attachments/assets/48bf36ee-8284-4074-8f36-7f9a551ae18c" />
-Personalized dashboard displaying key academic information at a glance.

## Student Profile
<img width="1919" height="872" alt="Screenshot 2025-09-09 220945" src="https://github.com/user-attachments/assets/25d10d6d-1c31-44aa-8ab6-d9ec0a884572" />
-Page showing student’s personal and academic details with edit options.

## Student Results
<img width="1917" height="868" alt="Screenshot 2025-09-09 221006" src="https://github.com/user-attachments/assets/49b44f4e-762d-4ce8-a193-25752c1d2944" />
-Section where students can view semester-wise results uploaded by admin.

## Student CGPA
<img width="1917" height="840" alt="Screenshot 2025-09-09 221017" src="https://github.com/user-attachments/assets/077c2ebb-0adb-4416-b553-c9dfea5720ba" />
-Automatic calculation and display of student’s overall CGPA.

## Student Courses
<img width="1917" height="869" alt="Screenshot 2025-09-09 221031" src="https://github.com/user-attachments/assets/0ddcb039-493c-4544-8b0d-fedf13ee1a92" />
-Overview of finished, ongoing, and remaining courses in the student’s study plan.

## Student Resources
<img width="1919" height="868" alt="Screenshot 2025-09-09 221044" src="https://github.com/user-attachments/assets/8b96988f-1bd2-4914-a54d-348820235531" />
-Centralized hub where students can access and download course-related materials.

## Admin Sign Up
<img width="1706" height="872" alt="Screenshot 2025-09-09 223949" src="https://github.com/user-attachments/assets/93396f91-7a89-4e6f-98d8-0702837363b8" />
-Admin signup page for creating a secure administrator account.

## Admin Login
<img width="1918" height="828" alt="Screenshot 2025-09-09 221102" src="https://github.com/user-attachments/assets/5c7b97ba-9d76-4082-8ec9-d23520d98d8d" />
-Secure login for administrators to access the admin panel.

## Admin Dashboard (Overview)
<img width="1919" height="839" alt="Screenshot 2025-09-09 221117" src="https://github.com/user-attachments/assets/47a474be-d9fa-4f50-8c3b-07b9e1628854" />

## Student Management
<img width="1917" height="839" alt="Screenshot 2025-09-09 221142" src="https://github.com/user-attachments/assets/21427d39-8c81-4666-b59f-52b23f8ff640" />
-Admin feature to verify student information.

## Course Management
<img width="1919" height="867" alt="Screenshot 2025-09-09 221152" src="https://github.com/user-attachments/assets/fc385e8a-3886-492a-882f-b479104c706b" />
-Admin interface to add, edit, or remove university courses.

## Result Management
<img width="1917" height="861" alt="Screenshot 2025-09-09 221208" src="https://github.com/user-attachments/assets/6d6910a8-e617-430b-84a6-e564fc787d14" />
-Admin module for uploading, updating, and publishing student results.



## Project Structure

```
PROJECT-300/
├── frontend/           # React.js Frontend Application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── contexts/   # React contexts
│   │   ├── hooks/      # Custom hooks
│   │   ├── services/   # API services
│   │   └── utils/      # Utility functions
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── backend/            # Node.js Backend API
│   ├── routes/         # API routes
│   ├── *.sql          # Database schemas
│   └── package.json    # Backend dependencies
├── docs/               # Documentation
│   ├── api/           # API documentation
│   ├── database/      # Database documentation
│   ├── features/      # Feature documentation
│   └── admin/         # Admin documentation
├── dist/              # Build output
├── node_modules/      # Dependencies
└── venv/              # Python virtual environment
```

## 🚀 Quick Start
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL/PostgreSQL database
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
### Backend Setup
```bash
cd backend
npm install
npm start
```
## Documentation
- [API Documentation](docs/api/)
- [Database Schema](docs/database/)
- [Feature Guides](docs/features/)
- [Admin Guide](docs/admin/)
## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
