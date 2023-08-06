import { board } from '@/data';
import { type IBoard } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: IBoard[] = [board];

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
