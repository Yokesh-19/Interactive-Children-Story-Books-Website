import { createSlice } from '@reduxjs/toolkit';

/**
 * Local UI state for browsing stories: filters + search.
 * The actual story data lives in the RTK Query cache, not here.
 */
const initialState = {
  searchTerm: '',
  category: null,
  ageGroup: null,
  sortBy: 'popular', // 'popular' | 'newest' | 'rating'
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setAgeGroup: (state, action) => {
      state.ageGroup = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setSearchTerm, setCategory, setAgeGroup, setSortBy, resetFilters } =
  storiesSlice.actions;
export default storiesSlice.reducer;

// Selectors
export const selectStoryFilters = (state) => state.stories;