import { baseApi } from '@/services/api/baseApi';

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch the quiz for a given story
    getQuizByStory: builder.query({
      query: (storyId) => `/stories/${storyId}/quiz`,
      providesTags: (result, error, storyId) => [
        { type: 'Quiz', id: storyId },
      ],
    }),

    // Submit answers; backend returns score + any earned badge
    submitQuiz: builder.mutation({
      query: ({ storyId, answers }) => ({
        url: `/stories/${storyId}/quiz/submit`,
        method: 'POST',
        body: { answers },
      }),
      // Refresh progress after a submission
      invalidatesTags: ['Progress'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetQuizByStoryQuery, useSubmitQuizMutation } = quizApi;