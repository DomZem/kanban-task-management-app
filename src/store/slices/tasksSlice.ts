import { type ITask } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ITask[] = [
  {
    taskID: 'CwWTu6kUaL3CN3wHcmZlg',
    title: 'Build UI for onboarding flow',
    description:
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    status: 'Todo',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
];

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
  },
});

export const { taskAdded } = tasksSlice.actions;

export default tasksSlice.reducer;
