@echo off
echo Starting Chrisland Tuckshop...

:: Start backend server
start cmd /k "cd /d C:\Users\USER\Downloads\chrisland-tuckshop\server && node index.js"

:: Wait a bit for backend to initialize
timeout /t 3 /nobreak >nul

:: Start frontend React app
start cmd /k "cd /d C:\Users\USER\Downloads\chrisland-tuckshop\client && npm start"

echo Both servers launched. You can close this window.
pause
