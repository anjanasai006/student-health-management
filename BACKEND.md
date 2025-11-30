# Student Health Management - Backend

A Node.js + Express backend API for the Student Health Management System.

## Quick Start

### Prerequisites
- Node.js >=18
- npm

### Installation & Run

**From the project root:**

```bash
# Install backend dependencies
cd server
npm install

# Start backend server (runs on http://localhost:5000)
npm start

# Or use watch mode for development
npm run dev
```

**Frontend (runs in separate terminal):**

```bash
# From project root
npm install
npm run dev
# Runs on http://localhost:5173
```

**Or use the full-stack startup script:**

```powershell
# From project root (Windows PowerShell)
.\start-full-stack.ps1
# Opens both frontend and backend in separate windows
```

## API Endpoints

### Health Check
- `GET /api/health` — Check if backend is running

### Authentication
- `POST /api/auth/login` — Login user
  - Body: `{ "email": "student@example.com", "password": "password" }`
- `POST /api/auth/logout` — Logout user

### Student Routes
- `GET /api/student/dashboard/:studentId` — Get student dashboard data
- `GET /api/student/tracking/:studentId` — Get health tracking records
- `PUT /api/student/health-status/:studentId` — Update health status
  - Body: `{ "status": "good" | "fair" | "critical" }`

### Admin Routes
- `GET /api/admin/dashboard` — Get all students & stats
- `GET /api/admin/student/:studentId` — Get detailed student info
- `POST /api/admin/student/:studentId/health-record` — Add health record
  - Body: `{ "type": "checkup", "notes": "...", "status": "active" }`
- `PUT /api/admin/student/:studentId/status` — Update student health status
  - Body: `{ "healthStatus": "good" | "fair" | "critical" }`

### Feedback Routes
- `GET /api/feedback` — Get all feedback
- `POST /api/feedback/submit` — Submit feedback
  - Body: `{ "studentId": 1, "studentName": "John", "rating": 4, "message": "Great service!" }`
- `GET /api/feedback/student/:studentId` — Get feedback by student

## Test Credentials

**Student Account:**
- Email: `student@example.com`
- Password: `password`

**Admin Account:**
- Email: `admin@example.com`
- Password: `password`

## Environment Variables

Create a `.env` file in the `server/` folder (or copy from `.env.example`):

```
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Data Store

Currently uses in-memory storage (server/data/db.js). Replace with a real database (MongoDB, PostgreSQL, SQLite) for production.

## Frontend Integration

The frontend API client is in `src/api/client.js`. Ensure the backend URL matches your environment:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

## Architecture

```
server/
├── server.js              # Main Express app
├── package.json           # Dependencies
├── .env                   # Environment variables
├── data/
│   └── db.js             # In-memory data store
└── routes/
    ├── auth.js           # Authentication endpoints
    ├── student.js        # Student dashboard & tracking
    ├── admin.js          # Admin dashboard & management
    └── feedback.js       # Feedback endpoints
```

## Production Deployment

For production:
1. Replace in-memory db with a real database
2. Add JWT authentication (use `jsonwebtoken` package)
3. Hash passwords with `bcryptjs`
4. Add input validation and error handling
5. Use environment-based config for secrets
6. Deploy backend to cloud (AWS Lambda, Google Cloud Run, Heroku, etc.)

## Troubleshooting

**Backend won't start:**
- Ensure port 5000 is not in use: `netstat -ano | findstr :5000` (Windows)
- Check Node version: `node -v` (need >=18)
- Clear node_modules: `rm -r node_modules; npm install`

**CORS errors:**
- Ensure `CLIENT_URL` in `.env` matches your frontend URL
- If frontend is on different port, update `CORS origin` in `server.js`

**Frontend can't reach backend:**
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check browser console for errors
- Ensure API client URL matches backend URL in `src/api/client.js`
