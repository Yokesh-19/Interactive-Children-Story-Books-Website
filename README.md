# 📚 Interactive Children's Storybook Platform

An interactive web platform for children to explore stories, listen to audio narrations, watch story videos, take quizzes, and track their reading progress — all wrapped in a fun, kid-friendly interface.

---

## 📂 Project Structure

```
Interactive-Children-Story-Books-Website/
├── Frontend/        # React + Vite app (active development)
└── BackEnd/         # Spring Boot + MongoDB REST API (under updating)
```

---

## 🚀 What We Built

### Frontend — React + Vite

A fully structured, production-ready frontend built from scratch using modern tooling and atomic design principles.

**Pages**
- `HomePage` — Hero section, feature highlights, featured stories grid
- `StoriesPage` — Browse all stories with search, category and age-group filters
- `StoryDetailPage` — Page-by-page story reader with audio player, video player, and live progress tracking
- `QuizPage` — Interactive quiz per story with instant answer feedback and scoring
- `ProgressPage` — Dashboard showing stories read, quizzes passed, badges earned, minutes read
- `ProfilePage` — View and edit user profile
- `LoginPage` / `RegisterPage` — Auth forms with full validation via react-hook-form
- `NotFoundPage` — Friendly 404 page

**Component Architecture — Atomic Design**
- `atoms/` — Button, Input, Icon, Avatar, Badge, Spinner, ProgressBar, Typography
- `molecules/` — StoryCard, SearchBar, AudioPlayer, VideoPlayer, QuizOption, RatingStars, ProgressStat
- `organisms/` — Navbar, Footer, StoryGrid, StoryReader, QuizPanel, Sidebar, ProgressDashboard
- `templates/` — MainLayout, AuthLayout, DashboardLayout

**State Management**
- Redux Toolkit slices for auth, story filters, quiz session, and progress
- RTK Query for all API calls — caching, tag-based invalidation, optimistic updates
- Single `baseApi` root — all feature APIs inject endpoints into it
- Persistent auth via localStorage

**Other Features**
- Protected routes with token-based auth guard
- Debounced search input
- Animated UI with Framer Motion
- Fully responsive with Tailwind CSS
- Lucide React icons throughout
- Toast notifications via react-hot-toast
- Tailwind safelist for dynamic theme classes
- `@/` path alias via Vite for clean imports

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| State Management | Redux Toolkit + RTK Query |
| Routing | React Router v6 |
| Forms + Validation | React Hook Form |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Linting / Formatting | ESLint + Prettier |

---

## ⚙️ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Create a `.env` file inside `Frontend/`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🔧 What We Learned

- **Atomic Design** — Breaking UI into atoms → molecules → organisms → templates → pages keeps every component focused, reusable, and easy to test
- **RTK Query** — Eliminates manual loading/error state; tag-based cache invalidation keeps data automatically fresh after mutations
- **Optimistic Updates** — Updating the UI before the server responds makes the app feel instant; rolling back on failure keeps it safe
- **Protected Routes** — Using React Router v6's `<Outlet />` pattern to guard routes cleanly without wrapping every component
- **Tailwind Safelist** — Dynamic class names built with template literals (e.g. `bg-${theme}-100`) get purged at build time unless explicitly safelisted in `tailwind.config.js`
- **Framer Motion** — Declarative `initial`, `animate`, `exit` props integrate cleanly into React without imperative animation code
- **Vite Path Aliases** — `@/` alias removes brittle `../../..` relative imports across deep folder structures
- **forwardRef** — Required when wrapping native inputs in custom components to make `react-hook-form`'s `register()` work correctly
- **Single baseApi Pattern** — One RTK Query `createApi` instance shared across all features via `injectEndpoints` keeps the Redux store and middleware clean

---

## ⚠️ Backend — Under Updating Process

The `BackEnd/` folder contains a **Spring Boot + MongoDB** REST API.
It is currently being updated to fully support all frontend features:

- JWT authentication — `/auth/login`, `/auth/register`, `/auth/me`
- Stories CRUD with filtering by category and age group
- Quiz endpoints with answer submission and scoring
- Progress tracking per user per story
- Badge and achievement system

> Full backend integration with the frontend will be completed in the next update.

---

## 👨‍💻 Author

**Yokesh** — [GitHub](https://github.com/Yokesh-19)
