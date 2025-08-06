# Admin Authentication Setup

This guide will help you set up the admin authentication system for your MuPortal application.

## Database Setup

### 1. Create the Admin Table

Run the following SQL commands in your PostgreSQL database to create the admin_info table:

```sql
-- Connect to your database first
\c student_portal

-- Create admin_info table
CREATE TABLE IF NOT EXISTS admin_info (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  admin_id VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  access_level VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_id ON admin_info(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_department ON admin_info(department);
CREATE INDEX IF NOT EXISTS idx_admin_access_level ON admin_info(access_level);
```

### 2. Create a Super Admin Account (Optional)

You can create a default super admin account by running this command in your terminal:

```bash
# Navigate to your server directory
cd server

# Run this node script to create a super admin
node -e "
const bcrypt = require('bcrypt');
bcrypt.hash('admin123', 10).then(hash => {
  console.log('INSERT INTO admin_info (name, admin_id, password, department, position, access_level) VALUES');
  console.log('(\'Super Admin\', \'ADMIN-001\', \'' + hash + '\', \'IT Department\', \'Super Admin\', \'Full Access\');');
});
"
```

Copy the output and run it in your PostgreSQL database.

## Features

### Admin Components Created:

1. **AdminLogin** (`/src/components/AdminLogin/AdminLogin.jsx`)

   - Admin authentication form
   - Blue/cyan color scheme to differentiate from student login
   - Connects to `/admin/login` endpoint

2. **AdminSignUp** (`/src/components/AdminSignUp/AdminSignUp.jsx`)
   - Admin account creation form
   - Additional fields: position, access level
   - More departments including administrative ones
   - Connects to `/admin/signup` endpoint

### Server Routes Created:

1. **Admin Routes** (`/server/routes/admin.js`)
   - `POST /admin/signup` - Create admin account
   - `POST /admin/login` - Admin authentication
   - `GET /admin/profile/:admin_id` - Get admin profile
   - `GET /admin/all` - Get all admins (for super admin)
   - `PUT /admin/update-access/:admin_id` - Update access level

### Navigation

The admin components are integrated into your existing router:

- Home page has "Admin Login" button
- Admin login leads to admin signup option
- Admin signup leads back to admin login

## Admin Account Fields

- **Name**: Full name of the admin
- **Admin ID**: Unique identifier (e.g., ADMIN-001)
- **Password**: Encrypted using bcrypt
- **Department**: Department they manage
- **Position**: Their role/title
- **Access Level**: Permission level (Full Access, Department Access, Limited Access, View Only)

## Usage

### Starting the Server

Make sure your server includes the admin routes:

```bash
cd server
npm start
```

### Creating Admin Accounts

1. Navigate to the home page
2. Click "Admin Login"
3. Click "Create Admin Account"
4. Fill out the form with admin details
5. Submit to create the account

### Admin Login

1. Navigate to admin login
2. Enter Admin ID and password
3. Successfully authenticated admins can access admin features

## Access Levels

- **Full Access**: Complete system control
- **Department Access**: Limited to specific department
- **Limited Access**: Restricted permissions
- **View Only**: Read-only access

## Security Notes

- All passwords are hashed using bcrypt
- Admin IDs must be unique
- Consider implementing session management for production
- Add role-based access control for different admin functions

## Next Steps

To complete the admin system, you may want to add:

1. Admin Dashboard component
2. User management interface
3. System statistics and reports
4. Content management tools
5. Access control middleware
