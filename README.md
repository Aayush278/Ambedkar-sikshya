# Ambedkar Sikhya

Master Website for Ambedkar Sikhya — Learn • Guide • Grow • Succeed

## Overview
Ambedkar Sikhya is a modern, trustworthy, student-first educational platform focusing on:
- Government Exam Counselling & Career Guidance
- Home Tuition Services
- Career Counselling
- Educational Information & Live Updates Hub
- YouTube Learning Platform
- Online MCQ Practice & Study Materials

## Tech Stack
- HTML5 (Single-folder flat architecture for simple direct upload to GitHub & Vercel)
- CSS3 (Vanilla: `style.css`, `components.css`, `responsive.css`, `admin.css`)
- Vanilla JavaScript (`main.js`, `forms.js`, `career.js`, `practice.js`, `script.js`, `updates.js`, `youtube.js`, `admin.js`, `supabase-config.js`)
- Supabase Integration (PostgreSQL backend for questions, materials, auth)
- JSON Data (`courses.json`, `updates.json`, `videos.json`)

## Hosting on Vercel & GitHub
All files sit directly in the root directory with no nested subfolders. You can:
1. Initialize a Git repository and push directly to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Ambedkar Sikhya website"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
2. Or drag-and-drop all files directly into your GitHub repository in your web browser.
3. Import the repository in [Vercel](https://vercel.com) — it will automatically detect the static site and deploy it instantly with clean URLs configured via `vercel.json`.

## Configuration
- Global settings & WhatsApp number: `main.js` (`SITE_CONFIG`)
- Supabase credentials: `supabase-config.js`
