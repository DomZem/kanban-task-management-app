import { initialState } from '@/data/tasks';
import { type ITask } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: (state, action: PayloadAction<ITask>) => {
      state.push(action.payload);
    },
    taskStatusUpdated: (
      state,
      action: PayloadAction<{ taskID: string; status: string }>
    ) => {
      const { taskID, status } = action.payload;
      const existingTask = state.find((task) => task.taskID === taskID);
      if (existingTask) {
        existingTask.status = status;
      }
    },
    taskDeleted: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      const indexToRemove = state.findIndex((task) => task.taskID === taskID);

      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
      }
    },
  },
});

export const { taskAdded, taskStatusUpdated, taskDeleted } = tasksSlice.actions;

export default tasksSlice.reducer;
