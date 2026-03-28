# Portfolio React - Multi-File Structure

A modern, professional portfolio built with React, Vite, and Tailwind CSS. Converted from a single-file Babel/React app into a maintainable, modular structure.

## 🚀 Project Structure

```
portfolio-react/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Navigation bar component
│   │   ├── HomeView.jsx            # Hero + skills + projects + testimonials section
│   │   ├── AllProjectsView.jsx     # Full projects grid
│   │   ├── AllSkillsView.jsx       # Full skills grid
│   │   ├── ProjectDetailView.jsx   # Individual project detail page
│   │   ├── SkillDetailView.jsx     # Individual skill category detail
│   │   ├── LoginView.jsx           # Login form
│   │   ├── Dashboard.jsx           # Admin/Guest dashboard with services, meetings, support
│   │   ├── HangingCard.jsx         # Reusable hanging card animation
│   │   └── Toast.jsx               # Toast notification component
│   ├── data/
│   │   ├── defaults.js             # All default data (profile, projects, skills, etc.)
│   │   └── iconMap.js              # Lucide icon mapping system
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles and animations
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration for Tailwind
└── README.md                       # This file
```

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎨 Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modular Components**: Each view is isolated in its own file
- **Data-Driven**: All content in `data/defaults.js` for easy customization
- **Glass Morphism UI**: Modern frosted glass aesthetic
- **Smooth Animations**: Hanging cards, floating elements, fade-ins
- **Admin Dashboard**: Full CRUD operations for profile, projects, services, testimonials
- **Meeting & Support System**: Built-in scheduling and ticket management
- **Firebase Authentication**: Login, Sign Up, and Forgot Password flows
- **Role Resolution**: Custom claim `admin: true` or fallback env allowlist

## 🔐 Authentication Setup

1. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
2. Fill all `VITE_FIREBASE_*` keys in `.env.local`.
3. (Optional) Set `VITE_ADMIN_EMAILS` as a comma-separated fallback admin allowlist.
4. In Firebase Console, enable `Authentication` → `Sign-in method` → `Email/Password` and `Google`.
5. Create users in `Authentication` → `Users`, or sign up from the app.

### Admin Role Priority

1. If Firebase custom claim `admin: true` exists, user is admin.
2. Otherwise, if email exists in `VITE_ADMIN_EMAILS`, user is admin.
3. All other authenticated users are standard users.

## 🔐 Auth Screens

- **Login**: Sign in with Firebase email/password
- **Continue with Google**: Popup-based Google sign-in
- **Sign Up**: Create a new account
- **Forgot**: Send password reset email

## 🛠️ Customization Guide

### Change Profile Data
Edit `src/data/defaults.js` → `DEFAULT_PROFILE`

### Add/Remove Projects
Edit `src/data/defaults.js` → `DEFAULT_PROJECTS` array

### Modify Skills
Edit `src/data/defaults.js` → `DEFAULT_SKILLS` array

### Update Services
Edit `src/data/defaults.js` → `DEFAULT_SERVICES` array

### Change Colors
Modify Tailwind config in `tailwind.config.js` or `src/index.css`

### Update Icons
Add/modify imports in `src/data/iconMap.js` (uses lucide-react)

## 🎯 Component Usage

### HomeView
Displays hero section with skills, projects, education, testimonials, and contact.

```jsx
<HomeView 
  profile={profile}
  skills={skills}
  projects={projects}
  education={education}
  testimonials={testimonials}
  navigate={navigate}
/>
```

### Dashboard
Admin/guest portal for managing content and viewing analytics.

```jsx
<Dashboard
  user={appUser}
  profile={profile}
  skills={skills}
  projects={projects}
  education={education}
  testimonials={testimonials}
  meetings={meetings}
  support={support}
  services={services}
  saveData={saveData}
  onLogout={handleLogout}
/>
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
Update `vite.config.js`:
```js
export default {
  base: '/portfolio-react/',
  // ... other config
}
```

Then deploy `dist/` folder to GitHub Pages.

## 📝 License

This project is open source and available under the MIT license.

## 🤝 Contributing

Feel free to fork and submit PRs for improvements!

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
