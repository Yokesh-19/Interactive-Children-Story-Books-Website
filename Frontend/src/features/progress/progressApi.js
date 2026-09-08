import { baseApi } from '@/services/api/baseApi';

export const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard stats + in-progress list for the current user
    getProgress: builder.query({
      query: () => '/progress',
      providesTags: ['Progress'],
    }),

    // Save reading progress for a story (page reached / % complete)
    updateStoryProgress: builder.mutation({
      query: ({ storyId, progress, currentPage }) => ({
        url: `/progress/${storyId}`,
        method: 'PUT',
        body: { progress, currentPage },
      }),
      invalidatesTags: ['Progress'],
      // Optimistic update so the UI reflects progress instantly
      async onQueryStarted(
        { storyId, progress },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          progressApi.util.updateQueryData('getProgress', undefined, (draft) => {
            const item = draft?.inProgress?.find((s) => s.id === storyId);
            if (item) item.progress = progress;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo(); // roll back if the request fails
        }
      },
    }),

    // Mark a story as fully read
    markStoryComplete: builder.mutation({
      query: (storyId) => ({
        url: `/progress/${storyId}/complete`,
        method: 'POST',
      }),
      invalidatesTags: ['Progress'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProgressQuery,
  useUpdateStoryProgressMutation,
  useMarkStoryCompleteMutation,
} = progressApi;
