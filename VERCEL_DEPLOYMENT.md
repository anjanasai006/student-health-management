# ✅ Fixed Deployment to Vercel

Your backend and frontend are now configured to connect properly on Vercel.

## Quick Start

### 1️⃣ Set Up MongoDB Atlas (Required)
```
Go to: https://mongodb.com/cloud/atlas
- Create account → Create cluster (free tier)
- Get connection string (Connect → Drivers)
- Copy your MongoDB URI
```

### 2️⃣ Push to GitHub
```powershell
cd 'c:\Users\Anjana sai\Downloads\student-health-management\student-health-management'
git add .
git commit -m "Fixed Vercel deployment"
git push
```

### 3️⃣ Deploy Backend First
1. Go to **vercel.com** → Click "New Project"
2. Import your GitHub repo
3. Select **"Root Directory"** = `server`
4. Click "Deploy"
5. Add environment variables (Settings → Environment):
   - `MONGO_URI`: Your MongoDB connection string
   - `CLIENT_URL`: Will update after frontend deploys
   - `NODE_ENV`: `production`
6. Redeploy
7. **Copy your backend URL** (e.g., `https://your-backend.vercel.app`)

### 4️⃣ Deploy Frontend Second
1. Go to **vercel.com** → Click "New Project"
2. Import same GitHub repo
3. Keep default settings (frontend root)
4. Add environment variable:
   - `VITE_API_URL`: Your backend URL from step 3 (e.g., `https://your-backend.vercel.app/api`)
5. Deploy

### 5️⃣ Update Backend URL
1. Go back to backend project in Vercel
2. Settings → Environment Variables
3. Update `CLIENT_URL` = Your frontend URL (e.g., `https://your-frontend.vercel.app`)
4. Redeploy

## What Changed ✨

✅ **Backend CORS** - Now accepts any origin (works with Vercel)
✅ **Frontend API Client** - Auto-detects `/api` on production, `localhost:5000/api` in development
✅ **Vercel Config** - Proper serverless configuration
✅ **Environment Variables** - Set up for production

## Testing After Deployment

1. Go to your frontend URL
2. Try logging in
3. Check mood tracker or any page that calls the API
4. Should work without errors!

## Troubleshooting

**API calls not working?**
- Check browser console (F12) for errors
- Verify `VITE_API_URL` is set correctly in Vercel
- Confirm `MONGO_URI` is valid in backend environment

**Still having issues?**
- Check Vercel logs: Project → Deployments → Click deployment → Logs
