import { baseApi } from '@/services/api/baseApi';

export const storiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // List with optional filters — RTK Query caches per unique arg combo
    getStories: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        if (params.search) search.set('search', params.search);
        if (params.category) search.set('category', params.category);
        if (params.ageGroup) search.set('ageGroup', params.ageGroup);
        if (params.sortBy) search.set('sortBy', params.sortBy);
        const qs = search.toString();
        return `/stories${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id, _id }) => ({ type: 'Story', id: id || _id })),
              { type: 'Story', id: 'LIST' },
            ]
          : [{ type: 'Story', id: 'LIST' }],
    }),

    getStoryById: builder.query({
      query: (id) => `/stories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Story', id }],
    }),

    getFeaturedStories: builder.query({
      query: () => '/stories/featured',
      providesTags: [{ type: 'Story', id: 'FEATURED' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStoriesQuery,
  useGetStoryByIdQuery,
  useGetFeaturedStoriesQuery,
} = storiesApi;
