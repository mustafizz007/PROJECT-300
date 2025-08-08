# Course Management System - Dynamic Backend Integration
### API Endpoints

#### Course Management

- `GET /api/admin/courses` - Get all courses with materials
- `GET /api/admin/courses/:id` - Get single course
- `POST /api/admin/courses` - Create new course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course

#### Material Management

- `POST /api/admin/courses/:id/materials` - Add material to course
- `PUT /api/admin/materials/:id` - Update material
- `DELETE /api/admin/materials/:id` - Delete material

#### Notifications & Stats

- `GET /api/admin/notifications` - Get notifications
- `PUT /api/admin/notifications/:id/read` - Mark as read
- `DELETE /api/admin/notifications` - Clear all
- `GET /api/admin/stats` - Get course statistics

## Database Setup

1. Created course tables with proper relationships
2. Added indexes for performance
3. Inserted sample data for testing
4. Set up proper foreign key constraints

## API Service Layer

Created `src/services/api.js` with:

- Centralized API configuration
- Reusable API call functions
- Error handling
- Separate modules for courses and notifications

## How to Use

### Starting the System

1. **Database**: Ensure PostgreSQL is running with `student_portal` database
2. **Backend**: Run `node index.js` from `/server` directory (Port 3000
## Database Tables Created

- `courses` - Main course information
- `course_materials` - Course materials with types (document, video, link, assignment)
- `admin_notifications` - Notification history
- Proper indexes for optimal performance

The system is now fully dynamic and production-ready!
