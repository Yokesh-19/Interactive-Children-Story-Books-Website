import { baseApi } from '@/services/api/baseApi';
import { setCredentials, logout } from './authSlice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // On success, store user + token in Redux/localStorage
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user, token: data.token }));
        } catch {
          /* error surfaces through the hook's isError */
        }
      },
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user, token: data.token }));
        } catch {
          /* handled in component */
        }
      },
    }),

    getProfile: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation({
      query: (updates) => ({
        url: '/auth/me',
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['User'],
    }),

    logoutUser: builder.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutUserMutation,
} = authApi;