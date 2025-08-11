# Development Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL or PostgreSQL
- Git

## Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ApurboShib/PROJECT-300.git
   cd PROJECT-300
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd ../backend
   npm install
   ```

4. **Database Setup**
   - Create a new database
   - Update database configuration in `backend/.env`
   - Run database migrations:
     ```bash
     mysql -u username -p database_name < admin_table.sql
     mysql -u username -p database_name < course_tables.sql
     mysql -u username -p database_name < update_notifications.sql
     ```

## Running the Application

### Development Mode

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server will run on http://localhost:3000

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will run on http://localhost:5173

## Production Build

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start Production Server**
   ```bash
   cd backend
   npm run start:prod
   ```

## Environment Configuration

Create `.env` files:

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=student_management
JWT_SECRET=your_super_secret_key
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change port in backend `.env` file
   - Update frontend API URL accordingly

2. **Database connection error**
   - Verify database credentials
   - Ensure database server is running
   - Check firewall settings

3. **Module not found**
   - Run `npm install` in respective directory
   - Clear node_modules and reinstall if needed

## Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally
4. Commit changes: `git commit -m "Add your feature"`
5. Push branch: `git push origin feature/your-feature`
6. Create Pull Request
