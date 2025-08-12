# 🚀 How to Run PROJECT-300 Student Portal

## Quick Start (Automated)

```bash
# From project root directory
./start-project.sh
```

## Manual Start

### Terminal 1 - Backend
```bash
cd backend
npm install  # First time only
npm start
```

### Terminal 2 - Frontend  
```bash
cd frontend
npm install  # First time only
npm run dev
```

## Access URLs

- **Frontend (Student Portal)**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Features Working

✅ Student Dashboard
✅ Course Management
✅ Results Management  
✅ Admin Panel
✅ Dynamic Navigation
✅ Database Integration

## Stopping the Servers

- **Automated**: Press `Ctrl+C` in the terminal running `start-project.sh`
- **Manual**: Press `Ctrl+C` in each terminal window

## Troubleshooting

### Port Already in Use
```bash
# Kill existing processes
pkill -f "node.*index.js"
pkill -f "vite"
```

### Database Issues
```bash
cd backend
node scripts/setup-database.js
```

### Dependencies Issues
```bash
# Backend
cd backend && npm install

# Frontend  
cd frontend && npm install
```

---
*Last updated: August 12, 2025*
