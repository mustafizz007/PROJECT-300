#!/bin/bash

echo "🚀 Starting PROJECT-300 Student Portal..."

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Please run this script from the PROJECT-300 root directory"
    exit 1
fi

# Function to check if port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Kill existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*index.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

# Start Backend
echo "🖥️  Starting Backend Server (Port 3000)..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

npm start &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Check if backend is running
if check_port 3000; then
    echo "✅ Backend server started successfully on http://localhost:3000"
else
    echo "❌ Failed to start backend server"
    exit 1
fi

# Start Frontend
echo "🎨 Starting Frontend Development Server (Port 5173)..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Wait for frontend to start
sleep 3

# Check if frontend is running
if check_port 5173; then
    echo "✅ Frontend server started successfully on http://localhost:5173"
else
    echo "❌ Failed to start frontend server"
    exit 1
fi

echo ""
echo "🎉 PROJECT-300 is now running!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap 'echo "🛑 Stopping servers..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0' INT

# Keep script running
wait
