import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/components/templates/MainLayout';
import AuthLayout from '@/components/templates/AuthLayout';
import DashboardLayout from '@/components/templates/DashboardLayout';

import HomePage from '@/pages/HomePage';
import StoriesPage from '@/pages/StoriesPage';
import StoryDetailPage from '@/pages/StoryDetailPage';
import QuizPage from '@/pages/QuizPage';
import ProgressPage from '@/pages/ProgressPage';
import ProfilePage from '@/pages/ProfilePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';

import ProtectedRoute from './ProtectedRoute';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useLogoutUserMutation } from '@/features/auth/authApi';
import {
  setCategory,
  setAgeGroup,
  selectStoryFilters,
} from '@/features/stories/storiesSlice';

export default function AppRoutes() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const filters = useSelector(selectStoryFilters);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = () => logoutUser();

  // Sidebar filter wiring for the Stories page
  const sidebarProps = {
    selectedCategory: filters.category,
    selectedAge: filters.ageGroup,
    onCategoryChange: (c) => dispatch(setCategory(c)),
    onAgeChange: (a) => dispatch(setAgeGroup(a)),
  };

  return (
    <Routes>
      {/* Auth routes (no navbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Main layout (navbar + footer) */}
      <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/stories/:id" element={<StoryDetailPage />} />
        <Route
          path="/stories/:id/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Dashboard layout (navbar + sidebar) */}
      <Route
        element={
          <DashboardLayout
            user={user}
            onLogout={handleLogout}
            sidebarProps={sidebarProps}
          />
        }
      >
        <Route path="/stories" element={<StoriesPage />} />
      </Route>

      {/* Progress — dashboard layout but no sidebar */}
      <Route
        element={
          <DashboardLayout
            user={user}
            onLogout={handleLogout}
            showSidebar={false}
          />
        }
      >
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}