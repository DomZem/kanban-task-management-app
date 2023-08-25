import { initialState } from '@/data/tasks';
import { type ITask } from '@/types';
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: (state, action: PayloadAction<ITask>) => {
      state.push(action.payload);
    },
    taskEdited: (state, action: PayloadAction<ITask>) => {
      const { taskID, title, description, statusID } = action.payload;

      const existingTask = state.find((task) => task.taskID === taskID);

      // Update task data
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.statusID = statusID;
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

export const { taskAdded, taskEdited, taskDeleted } = tasksSlice.actions;

export const selectAllTasks = (state: any) => state.tasks;

export const selectTasksByBoardID = createSelector(
  [selectAllTasks, (state, boardID) => boardID],
  (tasks, boardID) => tasks.filter((task: ITask) => task.boardID === boardID)
);

export default tasksSlice.reducer;
