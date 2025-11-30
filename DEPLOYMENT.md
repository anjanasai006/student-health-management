# Deployment Guide — Student Health Management

This guide covers deploying both frontend and backend to Vercel.

## Prerequisites

- GitHub account with the project pushed
- Vercel account (free at vercel.com)
- MongoDB Atlas account (free tier available)

## Step 1: Set Up MongoDB Atlas (Cloud Database)

1. Go to **mongodb.com/cloud/atlas** and create a free account
2. Create a new cluster (free tier available)
3. Get your connection string:
   - Click "Connect" → "Drivers" → Copy connection string
   - Replace `<username>`, `<password>` with your credentials
   - Replace `<dbname>` with `studentmentalhealth`
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/studentmentalhealth?retryWrites=true&w=majority`
4. Save this for later (MONGO_URI)

## Step 2: Deploy Frontend to Vercel

1. Push your code to GitHub:
   ```powershell
   cd 'c:\Users\Anjana sai\Downloads\student-health-management\student-health-management'
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/student-health-management.git
   git push -u origin main
   ```

2. Go to **vercel.com** and click "New Project"
3. Import the GitHub repository
4. Configure build settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add environment variables in Vercel:
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```
   (Replace `your-backend` with your actual backend URL after deploying)

6. Click "Deploy" and wait for the frontend to deploy

**Frontend URL**: `https://your-project.vercel.app`

## Step 3: Deploy Backend to Vercel

1. Create an `api/index.js` in the server folder (already done in this repo)

2. Update `server/.env` with production values:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studentmentalhealth?retryWrites=true&w=majority
   CLIENT_URL=https://your-frontend.vercel.app
   PORT=3001
   ```

3. Commit and push to GitHub:
   ```powershell
   git add server/
   git commit -m "Add Vercel serverless config"
   git push
   ```

4. Go to **vercel.com** and create a new project from the same repo (select "server" folder)

5. Configure settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Output Directory**: Leave blank

6. Add environment variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studentmentalhealth?retryWrites=true&w=majority
   CLIENT_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```

7. Deploy

**Backend URL**: `https://your-backend.vercel.app/api`

## Step 4: Update Frontend API URL

After backend deploys, update the frontend environment:

1. Go to Vercel dashboard → Frontend project → Settings → Environment Variables
2. Update:
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```
3. Redeploy frontend

## Step 5: Test Deployment

1. Visit your frontend: `https://your-frontend.vercel.app`
2. Try logging in: `student@example.com` / `password`
3. Check backend health: `https://your-backend.vercel.app/api/health`

## Troubleshooting

**CORS errors**: Ensure `CLIENT_URL` in backend env vars matches your frontend URL

**MongoDB connection fails**: 
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Vercel)

**Routes not found**: Make sure Express app is exported as default in `server/server.js`

## Local Development

To test locally before deployment:

```powershell
# Terminal 1: Backend
cd server
npm install
npm start

# Terminal 2: Frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

## Production Checklist

- [ ] Database backup configured in MongoDB Atlas
- [ ] CORS properly configured for frontend domain
- [ ] Environment variables set in Vercel
- [ ] Test login with seeded credentials
- [ ] Test mood tracker functionality
- [ ] Verify data persists in MongoDB Atlas
- [ ] Enable authentication/JWT in production (optional)
- [ ] Set up error logging (e.g., Sentry)
- [ ] Monitor performance with Vercel analytics

## Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.mongodb.com/atlas/
- Vite Docs: https://vitejs.dev/
- Express Docs: https://expressjs.com/
