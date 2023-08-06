import { type IBoard } from '@/types';

export const board: IBoard = {
  name: 'Platform Launch',
  columns: ['Todo', 'Doing', 'Done'],
  tasks: [
    {
      status: 'Todo',
      title: 'Build UI for onboarding flow',
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [
        {
          title: 'Research competitor pricing and business models',
          isComplete: true,
        },
        {
          title: 'Outline a business model that works for our solution',
          isComplete: true,
        },
        {
          title: 'Surveying and testing',
          isComplete: false,
        },
      ],
    },
    {
      status: 'Doing',
      title: 'Build UI for search',
      description:
        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      subtasks: [
        {
          title: 'Research competitor pricing and business models',
          isComplete: false,
        },
        {
          title: 'Outline a business model that works for our solution',
          isComplete: false,
        },
        {
          title: 'Surveying and testing',
          isComplete: false,
        },
      ],
    },
  ],
};
