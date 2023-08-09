import { initialState } from '@/data/tasks';
import { type ITask } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action: PayloadAction<ITask>) {
        state.push(action.payload);
      },
      prepare(taskID, title, description, status, boardID) {
        return {
          payload: {
            taskID,
            title,
            description,
            status,
            boardID,
          },
        };
      },
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
  },
});

export const { taskAdded, taskStatusUpdated } = tasksSlice.actions;

export default tasksSlice.reducer;
