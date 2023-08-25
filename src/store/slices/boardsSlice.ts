import { initialState } from '@/data/boards';
import { type IBoard, type IStatus } from '@/types/index';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

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
      prepare(name: string, statuses?: IStatus[]) {
        return {
          payload: {
            boardID: nanoid(),
            name,
            statuses: statuses ?? [],
            isActive: false,
          },
        };
      },
    },
    boardEdited: (
      state,
      action: PayloadAction<{ name: string; statuses: IStatus[] }>
    ) => {
      const { name, statuses } = action.payload;
      const existingBoard = state.find(({ isActive }) => isActive);

      if (existingBoard) {
        existingBoard.name = name;
        [...existingBoard.statuses] = [...statuses];
      }
    },
    boardDeleted: (state) => {
      const indexToRemove = state.findIndex(({ isActive }) => isActive);

      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
      }

      // If the deleted board was active, make the first board active
      state[state.length - 1].isActive = true;
    },
  },
});

export const { boardActivated, boardAdded, boardEdited, boardDeleted } =
  boardsSlice.actions;

export const selectActiveBoard = (state: any) =>
  state.boards.find((board: IBoard) => board.isActive);

export default boardsSlice.reducer;
