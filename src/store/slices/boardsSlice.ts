import { type IBoard } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: IBoard[] = [
  {
    name: 'Platform Launch',
    columns: ['Todo', 'Doing'],
  },
  {
    name: 'Marketing Plan',
    columns: ['Todo', 'Finished'],
  },
  {
    name: 'Roadmap',
    columns: ['Todo', 'Done'],
  },
];

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    boardAdded: (state, action: PayloadAction<IBoard>) => {
      state.push(action.payload);
    },
  },
});

export const { boardAdded } = boardsSlice.actions;

export default boardsSlice.reducer;
