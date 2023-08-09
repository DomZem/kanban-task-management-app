import { type IBoard } from '@/types';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

const initialState: IBoard[] = [
  {
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
    name: 'Platform Launch',
    columns: ['Todo', 'Doing', 'Done'],
  },
  {
    boardID: 'puUXSY2J7yE5EjkBPk335',
    name: 'Marketing Plan',
    columns: ['Todo', 'Done'],
  },
  {
    boardID: 'NN8M25A1URsnCR9alMzAf',
    name: 'Roadmap',
    columns: ['Inspiration', 'Plan', 'Work', 'Done'],
  },
];

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    boardAdded: {
      reducer(state, action: PayloadAction<IBoard>) {
        state.push(action.payload);
      },
      prepare(name: string, columns: string[]) {
        return {
          payload: {
            boardID: nanoid(),
            name,
            columns,
          },
        };
      },
    },
  },
});

export const { boardAdded } = boardsSlice.actions;

export default boardsSlice.reducer;
