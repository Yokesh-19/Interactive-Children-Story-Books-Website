import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '@/services/api/baseApi';

import authReducer from '@/features/auth/authSlice';
import storiesReducer from '@/features/stories/storiesSlice';
import quizReducer from '@/features/quiz/quizSlice';
import progressReducer from '@/features/progress/progressSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    stories: storiesReducer,
    quiz: quizReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export default store;