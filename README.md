# Student Management System (MU_Portal)

A comprehensive student management portal built with React.js frontend and Node.js backend.

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

## Quick Start

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

##  Technologies Used

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

## Features

- Student Dashboard
- Course Management
- Grade Tracking
- Resource Management
- Admin Panel
- Authentication System

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
