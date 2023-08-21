import { type IBoard } from '@/types';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

const initialState: IBoard[] = [
  {
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
    name: 'Platform Launch',
    columns: ['Todo', 'Doing', 'Done'],
    isActive: true,
  },
  {
    boardID: 'puUXSY2J7yE5EjkBPk335',
    name: 'Marketing Plan',
    columns: ['Todo', 'Done'],
    isActive: false,
  },
  {
    boardID: 'NN8M25A1URsnCR9alMzAf',
    name: 'Roadmap',
    columns: ['Inspiration', 'Plan', 'Work', 'Done'],
    isActive: false,
  },
];

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    boardActivated: (state, action: PayloadAction<{ boardID: string }>) => {
      const { boardID } = action.payload;
      state.forEach((board) => {
        if (board.boardID === boardID) {
          board.isActive = true;
        } else {
          board.isActive = false;
        }
      });
    },
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
            isActive: false,
          },
        };
      },
    },
    boardDeleted: (state, action: PayloadAction<IBoard>) => {
      const { boardID } = action.payload;
      const indexToRemove = state.findIndex(
        (board) => board.boardID === boardID
      );

      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
      }

      // If the deleted board was active, make the first board active
      state[state.length - 1].isActive = true;
    },
  },
});

export const { boardActivated, boardAdded, boardDeleted } = boardsSlice.actions;

export default boardsSlice.reducer;
