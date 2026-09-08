<div align="center">

# 📚 StoryLand — Interactive Children's Storybook Platform

### A full-stack, immersive reading experience with audio/video stories, interactive quizzes, and gamified progress tracking.

_Built for young readers. Architected for scale._

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)

![Spring Boot](https://img.shields.io/badge/Spring_Boot-Backend-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/Frontend-Complete-success?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-In_Progress-orange?style=for-the-badge)

</div>

---

## 🌟 Overview

**StoryLand** is a full-stack interactive learning platform that turns reading into an adventure for children. Kids can explore beautifully illustrated storybooks with **narrated audio and video**, test their understanding through **playful quizzes**, and watch their **reading journey grow** through a gamified progress dashboard.

The project was built with a strong emphasis on **clean architecture**, **scalable state management**, and a **delightful, child-friendly UI** — demonstrating production-grade frontend engineering practices from the ground up.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 📖 **Interactive Story Reader** | Paged, animated storybook reader with per-page illustrations and narration |
| 🎧 **Audio Narration** | Custom-built audio player with play/pause, seek, and live time tracking |
| 🎬 **Video Stories** | Toggle between reading and watching a full-story video experience |
| 🧠 **Interactive Quizzes** | Multi-question quizzes with instant feedback, scoring, and a results screen |
| 📈 **Progress Tracking** | Gamified dashboard with stats, badges, and "continue reading" resume support |
| 🔍 **Smart Search & Filters** | Debounced search plus category and age-group filtering |
| 🔐 **Authentication** | Persisted login with protected routes and profile management |
| 🎨 **Playful, Responsive UI** | Kid-friendly design with smooth micro-animations, fully responsive across devices |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** — fast, modern SPA tooling with lightning-quick HMR
- **Redux Toolkit** + **RTK Query** — scalable state management and a powerful data-fetching layer
- **React Router v6** — nested layout routes and protected routing
- **Tailwind CSS** — utility-first styling with a custom design system
- **Framer Motion** — fluid page transitions and playful micro-interactions
- **React Hook Form** — performant, validated forms
- **React Hot Toast** — friendly notifications
- **Lucide React** — a clean, consistent icon set

### Backend _(in progress)_
- **Spring Boot** — REST API layer
- **MongoDB** — flexible NoSQL document storage
- **Spring Security + JWT** — authentication & authorization

---

## 🏛️ Architecture — Atomic Design

The frontend is structured using **Atomic Design**, a methodology that builds interfaces from the smallest possible pieces upward. This keeps the UI **reusable, consistent, and easy to reason about** — and cleanly separates presentation from data.

```
🔬 Atoms        →  Smallest UI units (Button, Input, Badge, Spinner, ProgressBar…)
🧬 Molecules    →  Small combinations (StoryCard, AudioPlayer, QuizOption, SearchBar…)
🦠 Organisms    →  Full page sections (Navbar, StoryReader, QuizPanel, Dashboard…)
📄 Templates    →  Layout scaffolds (MainLayout, AuthLayout, DashboardLayout)
📱 Pages        →  Route-level screens that wire data into the UI
```

> **Core principle applied throughout:** atoms, molecules, and organisms are **purely presentational** — they never fetch data. All data logic lives in the `features/` layer, and **pages** are the only place that connect data to UI. This makes every component reusable and independently testable.

### 📁 Project Structure

```
src/
├── app/                    # Store configuration & root App component
├── assets/                 # Images, audio, video, icons, fonts
├── components/             # ATOMIC DESIGN (pure, presentational UI)
│   ├── atoms/              #   Button, Input, Icon, Avatar, Badge, Spinner, ProgressBar, Typography
│   ├── molecules/          #   SearchBar, StoryCard, QuizOption, AudioPlayer, VideoPlayer, RatingStars…
│   ├── organisms/          #   Navbar, Footer, StoryGrid, StoryReader, QuizPanel, Sidebar, Dashboard
│   └── templates/          #   MainLayout, AuthLayout, DashboardLayout
├── pages/                  # Route-level screens (data → UI)
├── features/               # Redux slices + RTK Query endpoints (the data layer)
│   ├── auth/               #   authSlice + authApi
│   ├── stories/            #   storiesSlice + storiesApi
│   ├── quiz/               #   quizSlice + quizApi
│   └── progress/           #   progressSlice + progressApi
├── services/api/           # baseApi — single RTK Query root
├── routes/                 # AppRoutes + ProtectedRoute
├── hooks/                  # Reusable hooks (useDebounce…)
├── utils/                  # Constants & helpers
└── styles/                 # Global styles & theme tokens
```

---

## ⚡ State Management & Data Layer Highlights

This project uses a **single, centralized RTK Query API slice** that every feature injects its endpoints into — giving the whole app **one shared cache, one middleware, and one set of cache tags**. Some of the engineering highlights:

- **🏷️ Tag-based cache invalidation** — submitting a quiz or updating reading progress automatically refetches the dashboard, with zero manual wiring.
- **⚡ Optimistic updates** — progress bars move *instantly* as a child reads, and gracefully roll back if a request fails.
- **⏱️ Debounced search** — search requests fire only after the user stops typing, avoiding a request per keystroke.
- **🔄 Auto-generated loading & error states** — every data hook exposes `isLoading`, `isError`, and `isFetching`, cleanly consumed by skeleton loaders and friendly error screens.
- **💾 Persisted authentication** — login state survives page refreshes via localStorage rehydration.
- **🧩 Feature-based slices** — local UI state (filters, quiz answers) is kept separate from server cache state, following Redux best practices.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/storyland-platform.git
cd storyland-platform/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at **`http://localhost:5173`** 🎉

### Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Available Scripts

```bash
npm run dev       # Start the dev server
npm run build     # Build for production
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

---

## 🧩 Backend

> ### ⚠️ **Note: Backend files are currently under active development.**
>
> The frontend is **fully complete** and built against a well-defined REST API contract. The **Spring Boot + MongoDB** backend — including authentication, story/quiz management, and progress persistence — is being implemented and will be added here soon.
>
> Until then, the frontend runs standalone and demonstrates all UI states (loading, empty, error, and success) exactly as they will behave once connected.

**Planned API surface:**

```
POST   /api/auth/register            # Create an account
POST   /api/auth/login               # Authenticate
GET    /api/auth/me                  # Current user profile
GET    /api/stories                  # List/search/filter stories
GET    /api/stories/:id              # Story detail
GET    /api/stories/:id/quiz         # Quiz for a story
POST   /api/stories/:id/quiz/submit  # Submit quiz answers
GET    /api/progress                 # User progress & stats
PUT    /api/progress/:id             # Save reading progress
```

---

## 🎓 What I Learned

Building StoryLand deepened my hands-on experience with modern frontend engineering:

- **Architecting a scalable React application** from scratch using **Atomic Design**, with a strict separation between presentational and data-connected components.
- **Mastering Redux Toolkit & RTK Query** — the injected-endpoints pattern, tag-based caching, optimistic updates, and separating client state from server cache.
- **Designing a reusable component library** with a consistent design system, theming tokens, and variant-driven components.
- **Building complex interactive UI** — a custom media player, a paged animated reader, and a stateful quiz engine.
- **Handling real-world data states** gracefully — loading skeletons, empty states, and error boundaries as first-class UX.
- **Crafting a polished, responsive, animated experience** with Tailwind CSS and Framer Motion.
- **Structuring a full-stack project** with a clean frontend/backend separation and a clear API contract.

---

## 🗺️ Roadmap

- [x] Complete frontend architecture (Atomic Design)
- [x] Redux Toolkit + RTK Query data layer
- [x] Story reader with audio & video
- [x] Interactive quiz engine
- [x] Progress dashboard & authentication
- [ ] Spring Boot + MongoDB backend _(in progress)_
- [ ] JWT authentication & authorization
- [ ] Admin panel for content management
- [ ] Achievement/badge system expansion
- [ ] Deployment (CI/CD)

---

<div align="center">

### Made with 💜 for little readers.

_If you like this project, consider giving it a ⭐!_

</div>
