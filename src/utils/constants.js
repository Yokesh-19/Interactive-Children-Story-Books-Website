export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const TOKEN_KEY = 'storyland_token';

export const ROUTES = {
  HOME: '/',
  STORIES: '/stories',
  STORY_DETAIL: '/stories/:id',
  QUIZ: '/stories/:id/quiz',
  PROGRESS: '/progress',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const AGE_GROUPS = ['3-5', '6-8', '9-12'];
export const STORY_CATEGORIES = [
  'Adventure',
  'Fantasy',
  'Animals',
  'Bedtime',
  'Science',
  'Fairy Tale',
];