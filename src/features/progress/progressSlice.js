import { createSlice } from '@reduxjs/toolkit';

/**
 * Optional local mirror for optimistic UI. Source of truth is the
 * server (RTK Query cache); this just smooths immediate feedback.
 */
const initialState = {
  lastReadStoryId: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setLastRead: (state, action) => {
      state.lastReadStoryId = action.payload;
    },
  },
});

export const { setLastRead } = progressSlice.actions;
export default progressSlice.reducer;

export const selectLastRead = (state) => state.progress.lastReadStoryId;