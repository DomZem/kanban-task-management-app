import { type ISubtask } from '@/types';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ISubtask[] = [
  {
    subtaskID: nanoid(),
    title: 'Research competitor pricing and business models',
    isComplete: false,
    taskID: 'CwWTu6kUaL3CN3wHcmZlg',
  },
  {
    subtaskID: nanoid(),
    title: 'Surveying and testing',
    isComplete: false,
    taskID: 'CwWTu6kUaL3CN3wHcmZlg',
  },
  {
    subtaskID: nanoid(),
    title: 'Outline a business model that works for our solution',
    isComplete: false,
    taskID: 'CwWTu6kUaL3CN3wHcmZlg',
  },
];

export const subtasksSlice = createSlice({
  name: 'subtasks',
  initialState,
  reducers: {
    subtaskAdded: {
      reducer(state, action: PayloadAction<ISubtask>) {
        state.push(action.payload);
      },
      prepare(title, taskID) {
        return {
          payload: {
            subtaskID: nanoid(),
            title,
            isComplete: false,
            taskID,
          },
        };
      },
    },
  },
});

export const { subtaskAdded } = subtasksSlice.actions;

export default subtasksSlice.reducer;
