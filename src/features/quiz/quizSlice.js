import { createSlice } from '@reduxjs/toolkit';

/**
 * Tracks the in-progress quiz attempt. Cleared when a quiz starts/finishes.
 */
const initialState = {
  currentQuizId: null,
  answers: {}, // { [questionId]: selectedKey }
  score: null, // set after completion
  completed: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      state.currentQuizId = action.payload;
      state.answers = {};
      state.score = null;
      state.completed = false;
    },
    answerQuestion: (state, action) => {
      const { questionId, key } = action.payload;
      state.answers[questionId] = key;
    },
    completeQuiz: (state, action) => {
      state.score = action.payload; // { correct, total }
      state.completed = true;
    },
    resetQuiz: () => initialState,
  },
});

export const { startQuiz, answerQuestion, completeQuiz, resetQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;

// Selectors
export const selectQuizState = (state) => state.quiz;