import { initialState } from '@/data/subtasks';
import { type ISubtask } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const subtasksSlice = createSlice({
  name: 'subtasks',
  initialState,
  reducers: {
    subtaskAdded: (state, action: PayloadAction<ISubtask>) => {
      state.push(action.payload);
    },
    subtaskEdited: (state, action: PayloadAction<ISubtask>) => {
      const { subtaskID, title, isComplete } = action.payload;

      const existingSubtask = state.find(
        (subtask) => subtask.subtaskID === subtaskID
      );

      if (existingSubtask) {
        existingSubtask.title = title;
        existingSubtask.isComplete = isComplete;
      }
    },
    subtaskDeleted: (state, action: PayloadAction<ISubtask>) => {
      const { subtaskID } = action.payload;

      const existingSubtask = state.find(
        (subtask) => subtask.subtaskID === subtaskID
      );

      if (existingSubtask) {
        return state.filter(
          (subtask) => subtask.subtaskID !== existingSubtask.subtaskID
        );
      }
    },
  },
});

export const { subtaskAdded, subtaskEdited, subtaskDeleted } =
  subtasksSlice.actions;

export default subtasksSlice.reducer;
