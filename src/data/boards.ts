import { type IBoard } from '@/types';

export const initialState: IBoard[] = [
  {
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
    name: 'Platform Launch',
    statuses: [
      {
        statusID: 'G23bpua3v4pWoM2zDXub4',
        name: 'Todo',
      },
      {
        statusID: 'TMuO5vcZQTslhTX3E7jOG',
        name: 'Doing',
      },
      {
        statusID: 'adzbogxxY15UV-XOtv64E',
        name: 'Done',
      },
    ],
    isActive: true,
  },
  {
    boardID: 'puUXSY2J7yE5EjkBPk335',
    name: 'Marketing Plan',
    statuses: [
      {
        statusID: 'S6AL8VS_P7rshwFjbocDM',
        name: 'Todo',
      },
      {
        statusID: 'jjreKmP-a-cm0thLGGqCs',
        name: 'Done',
      },
    ],
    isActive: false,
  },
  {
    boardID: 'NN8M25A1URsnCR9alMzAf',
    name: 'Roadmap',
    statuses: [
      {
        statusID: 'L2uQLmEofMsbDuPwz-qBj',
        name: 'Inspiration',
      },
      {
        statusID: 'cQQvpLAx5U8wXD6CeMCrD',
        name: 'Plan',
      },
      {
        statusID: 'kuL2t9uD5lVjY0Abqu3os',
        name: 'Work',
      },
      {
        statusID: 'oY2bf_2vrUTtJHMCL0zaM',
        name: 'Done',
      },
    ],
    isActive: false,
  },
];
