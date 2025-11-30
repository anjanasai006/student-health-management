# Student Health Management System

A full-stack mental health and mood tracking application for students with authentication, MongoDB persistence, and real-time data updates.

- Student portal
- Admin portal
- Dashboards (student + admin)
- Feedback page
- Student health & attendance tracking
- Login page
- Landing / Home page

## How to run

1. **Unzip** the project.
2. Open the folder in **VS Code**.
3. Make sure you have **Node.js 18+** installed.
4. In the VS Code terminal run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Tech stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS

## Notes

- This is a **UI/UX focused demo**. There is **no real backend**.
- The login form accepts any email/password and redirects based on the role.
- You can connect the forms and dashboards to your own REST API or Firebase.