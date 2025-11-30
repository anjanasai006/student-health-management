# 🎓 Student Health Management - UI/UX Demo

This is a **UI/UX focused demo** with no backend required. All data is stored locally using browser localStorage.

## ✨ Features

### 🔐 **Authentication**
- **Any email/password** is accepted (demo mode)
- Role-based access: **Student** or **Admin**
- Demo credentials:
  - Student: `student@example.com` / `password`
  - Admin: `admin@example.com` / `password`

### 👨‍🎓 **Student Dashboard**
- Health status overview
- Attendance tracking
- Mood tracker with history
- Therapy session booking
- Feedback submission
- Mental health statistics

### 🧠 **Mood Tracker**
- Track daily mood with emoji (😢 to 😄)
- Add personal notes
- View mood history with statistics
- Edit/delete mood entries
- **All data saved locally** in browser

### 👨‍💼 **Admin Dashboard**
- Active students overview
- Health alerts monitoring
- Session management
- Therapy session tracking
- Leave request approvals
- Health trend analytics

### 🎯 **Therapy Sessions**
- View available therapists
- Book online sessions
- Manage upcoming sessions
- Join live sessions (UI only)
- Therapist recommendations

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Running

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Frontend will run at:** `http://localhost:5173`

## 📁 Project Structure

```
src/
├── pages/
│   ├── Login.jsx              # Demo login (accepts any credentials)
│   ├── StudentDashboard.jsx   # Student main dashboard
│   ├── MoodTracker.jsx        # Mood tracking with localStorage
│   ├── AdminDashboard.jsx     # Admin control center
│   ├── TherapySession.jsx     # Therapy booking UI
│   └── ...
├── components/
│   ├── MoodEntry.jsx          # Mood entry form (localStorage)
│   ├── Sidebar.jsx            # Navigation menu
│   ├── MainLayout.jsx         # Main layout wrapper
│   └── ...
├── api/
│   └── client.js              # API configuration (for future backend)
└── App.jsx                    # Main app with routes
```

## 💾 Data Storage

### Demo Data
All data is stored in **browser localStorage**:

- **User session:** `localStorage.user`, `localStorage.studentId`
- **Mood entries:** `localStorage.moodEntries_[studentId]`
- **Other data:** Stored in memory (resets on page refresh)

### Example Usage
```javascript
// Mood data automatically saved to localStorage
localStorage.getItem('moodEntries_' + studentId)
```

## 🔌 Connecting to Real Backend

To connect to your own REST API or Firebase:

### Option 1: Update API Client
Edit `src/api/client.js` to point to your backend:

```javascript
const API_BASE_URL = "https://your-api.com/api";
```

### Option 2: Replace apiClient Calls
In any component, replace:

```javascript
// Old
const res = await apiClient.login(email, password);

// With your API
const res = await fetch('https://your-api.com/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
}).then(r => r.json());
```

## 📝 Demo Features That Work Locally

✅ Login/Register (any credentials work)  
✅ Student Dashboard (mock data)  
✅ Mood Tracker with localStorage persistence  
✅ Admin Dashboard (mock data)  
✅ Therapy Session booking (UI only)  
✅ Navigation & routing  
✅ Role-based access (Student/Admin)  
✅ Responsive design (mobile-friendly)

## ⚠️ Features That Need Backend

❌ Real authentication with password validation  
❌ Persistent data across devices  
❌ Live therapy sessions  
❌ Email notifications  
❌ Multi-user synchronization  

## 🎨 Customization

### Change App Title
Edit `index.html`:
```html
<title>Your App Name</title>
```

### Modify Mock Data
Edit demo data in component `useState()`:
```javascript
const [moodEntries, setMoodEntries] = useState([
  { _id: "1", mood: 4, notes: "Great day!" }
]);
```

### Update Color Scheme
Edit `src/index.css` or component className values (Tailwind CSS)

## 📱 Responsive Design

- ✅ Mobile-first design
- ✅ Tablet optimized
- ✅ Desktop friendly
- ✅ Touch-friendly buttons
- ✅ Responsive layouts

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Storage:** Browser localStorage
- **Build:** Vite

## 📦 Deploy to Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

No backend needed - frontend will deploy and work immediately!

## 📚 Available Routes

- `/` - Home/Login
- `/student/dashboard` - Student dashboard
- `/student/mood` - Mood tracker
- `/student/tracking` - Health tracking
- `/student/feedback` - Feedback form
- `/student/therapy` - Therapy sessions
- `/admin/dashboard` - Admin dashboard
- `/feedback` - Feedback view
- `/404` - Not found page

## 💡 Notes

- This is a **UI/UX demo** - ideal for presentations, prototypes, and UX testing
- All data resets when localStorage is cleared
- Perfect for designing and testing user flows
- Easy to integrate with real backend later

## 🤝 Next Steps

1. **Test the UI/UX** - Navigate through all pages
2. **Customize branding** - Update colors, text, logo
3. **Deploy to Vercel** - Share with stakeholders
4. **Connect backend** - Integrate with your API when ready
5. **Add authentication** - Implement real login when backend is ready

---

**Ready to convert to production?** Replace `localStorage` with API calls in each component! 🚀
