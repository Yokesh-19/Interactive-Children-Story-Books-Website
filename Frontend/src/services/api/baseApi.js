import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, TOKEN_KEY } from '@/utils/constants';

/**
 * Single API slice for the whole app.
 * Every feature (auth, stories, quiz, progress) does:
 *   baseApi.injectEndpoints({ ... })
 * so they all share ONE cache, ONE middleware, ONE set of tags.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Safe even before authSlice exists (falls back to localStorage)
      const token =
        getState()?.auth?.token || localStorage.getItem(TOKEN_KEY);
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Story', 'Quiz', 'Progress', 'User'],
  endpoints: () => ({}), // features inject their endpoints
});

export default baseApi;