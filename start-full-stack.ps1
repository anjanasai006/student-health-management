# start-full-stack.ps1
# Starts both frontend (Vite) and backend (Express) in separate terminals

Write-Output "Starting Student Health Management - Full Stack"
Write-Output "================================================"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start backend
Write-Output "Starting backend server on port 5000..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\server'; npm install; npm start" -WindowStyle Normal

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Output "Starting frontend dev server on port 5173..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot'; npm install; npm run dev" -WindowStyle Normal

Write-Output "================================================"
Write-Output "Frontend: http://localhost:5173"
Write-Output "Backend: http://localhost:5000"
Write-Output "Test Route: http://localhost:5173/student/dashboard"
Write-Output "API Health: http://localhost:5000/api/health"
Write-Output "================================================"
