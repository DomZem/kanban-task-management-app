import { initialState } from '@/data/tasks';
import { type ITask } from '@/types';
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: (state, action: PayloadAction<ITask>) => {
      const { title } = action.payload;
      state.push(action.payload);
      toast.success(`The task '${title}' has been added.`);
    },
    taskEdited: (state, action: PayloadAction<ITask>) => {
      const { taskID, title, description, statusID } = action.payload;

      const existingTask = state.find((task) => task.taskID === taskID);

      // Update task data
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.statusID = statusID;
        toast.success(`The task '${title}' has been edited.`);
      }
    },
    taskStatusChanged: (
      state,
      action: PayloadAction<{ taskID: string; statusID: string }>
    ) => {
      const { taskID, statusID } = action.payload;

      const existingTask = state.find((task) => task.taskID === taskID);

      // Update task data
      if (existingTask) {
        existingTask.statusID = statusID;
      }
    },
    taskDeleted: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      const existingTask = state.find((task) => task.taskID === taskID);

      if (existingTask) {
        toast.success(`The task '${existingTask.title}' has been deleted.`);
        return state.filter((task) => task.taskID !== existingTask.taskID);
      }
    },
  },
});

export const { taskAdded, taskEdited, taskStatusChanged, taskDeleted } =
  tasksSlice.actions;

export const selectAllTasks = (state: any) => state.tasks;

export const selectTasksByBoardID = createSelector(
  [selectAllTasks, (state, boardID) => boardID],
  (tasks, boardID) => tasks.filter((task: ITask) => task.boardID === boardID)
);

export default tasksSlice.reducer;
