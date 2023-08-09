import { initialState } from '@/data/subtasks';
import { type ISubtask } from '@/types';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

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
    subtaskCompleteStatusUpdated: (
      state,
      action: PayloadAction<{ subtaskID: string; isComplete: boolean }>
    ) => {
      const { subtaskID, isComplete } = action.payload;
      const existingSubtask = state.find(
        (subtask) => subtask.subtaskID === subtaskID
      );
      if (existingSubtask) {
        existingSubtask.isComplete = isComplete;
      }
    },
  },
});

export const { subtaskAdded, subtaskCompleteStatusUpdated } =
  subtasksSlice.actions;

export default subtasksSlice.reducer;
