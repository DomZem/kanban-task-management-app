import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from './slices/boardsSlice';
import subtasksSlice from './slices/subtasksSlice';
import tasksSlice from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    tasks: tasksSlice,
    subtasks: subtasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
