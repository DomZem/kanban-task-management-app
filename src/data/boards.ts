import { type IBoard } from '@/types';

export const initialState: IBoard[] = [
  {
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
    name: 'Platform Launch',
    statuses: [
      {
        statusID: 'G23bpua3v4pWoM2zDXub4',
        name: 'Todo',
        color: '#49C4E5',
      },
      {
        statusID: 'TMuO5vcZQTslhTX3E7jOG',
        name: 'Doing',
        color: '#8471F2',
      },
      {
        statusID: 'adzbogxxY15UV-XOtv64E',
        name: 'Done',
        color: '#67E2AE',
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
        color: '#49C4E5',
      },
      {
        statusID: 'jjreKmP-a-cm0thLGGqCs',
        name: 'Done',
        color: '#8471F2',
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
        color: '#49C4E5',
      },
      {
        statusID: 'cQQvpLAx5U8wXD6CeMCrD',
        name: 'Plan',
        color: '#8471F2',
      },
      {
        statusID: 'kuL2t9uD5lVjY0Abqu3os',
        name: 'Work',
        color: '#67E2AE',
      },
    ],
    isActive: false,
  },
];
