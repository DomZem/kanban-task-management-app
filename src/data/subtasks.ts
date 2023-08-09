import { type ISubtask } from '@/types';
import { nanoid } from '@reduxjs/toolkit';

export const initialState: ISubtask[] = [
  // Subtasks for 'Build UI for onboarding flow'
  {
    subtaskID: nanoid(),
    title: 'Research UI design patterns for onboarding flow',
    isComplete: false,
    taskID: 'CwWTu6kUaL3CN3wHcmZlg',
  },
  {
    subtaskID: nanoid(),
    title: 'Finalize user journey for onboarding process',
    isComplete: false,
    taskID: 'CwWTu6kUaL3CN3wHcmZlg',
  },
  {
    subtaskID: nanoid(),
    title: 'Design onboarding user interface elements',
    isComplete: false,
    taskID: 'CwWTu6kUaL3CN3wHcmZlg',
  },
  // Subtask for 'Build UI for search'
  {
    subtaskID: nanoid(),
    title: 'Design onboarding user interface elements',
    isComplete: false,
    taskID: 'UF1D3nYdHRr52mSMJEXAG',
  },
  // Subtasks for 'Build UI for search'
  {
    subtaskID: nanoid(),
    title: 'Design onboarding user interface elements',
    isComplete: false,
    taskID: 'PJr2od62XXOqv6W39i2Ys',
  },
  {
    subtaskID: nanoid(),
    title: 'Design onboarding user interface elements',
    isComplete: false,
    taskID: 'PJr2od62XXOqv6W39i2Ys',
  },
  // Subtasks for 'QA and test all major user journeys'
  {
    subtaskID: nanoid(),
    title: 'Identify critical user journeys for testing',
    isComplete: false,
    taskID: 'l35IxKtsHEO3f0sd4TIXI',
  },
  {
    subtaskID: nanoid(),
    title: 'Create test scenarios for user journey validation',
    isComplete: false,
    taskID: 'l35IxKtsHEO3f0sd4TIXI',
  },
  // Subtasks for 'Design settings and search pages'
  {
    subtaskID: nanoid(),
    title: 'Sketch UI concepts for settings page',
    isComplete: true,
    taskID: '7HtrFGuxjx41q9M2Cv_Yz',
  },
  {
    subtaskID: nanoid(),
    title: 'Prototype search results page layout',
    isComplete: false,
    taskID: '7HtrFGuxjx41q9M2Cv_Yz',
  },
  {
    subtaskID: nanoid(),
    title: 'Refine visual design for settings UI',
    isComplete: false,
    taskID: '7HtrFGuxjx41q9M2Cv_Yz',
  },
  // Subtasks for 'Add account management endpoints'
  {
    subtaskID: nanoid(),
    title: 'Define API endpoints for account creation',
    isComplete: true,
    taskID: '2IE0Q7NKtjfTh7kvKveek',
  },
  {
    subtaskID: nanoid(),
    title: 'Implement user profile update endpoints',
    isComplete: true,
    taskID: '2IE0Q7NKtjfTh7kvKveek',
  },
  {
    subtaskID: nanoid(),
    title: 'Test account-related API functionalities',
    isComplete: false,
    taskID: '2IE0Q7NKtjfTh7kvKveek',
  },
  // Subtasks for 'Design onboarding flow'
  {
    subtaskID: nanoid(),
    title: 'Sketch initial onboarding process steps',
    isComplete: true,
    taskID: 'YO0vjW5H8J3LkAbedvo24',
  },
  {
    subtaskID: nanoid(),
    title: 'Create wireframes for onboarding screens',
    isComplete: false,
    taskID: 'YO0vjW5H8J3LkAbedvo24',
  },
  {
    subtaskID: nanoid(),
    title: 'Design seamless transitions between onboarding stages',
    isComplete: false,
    taskID: 'YO0vjW5H8J3LkAbedvo24',
  },
  // Subtasks for 'Add search enpoints'
  {
    subtaskID: nanoid(),
    title: 'Define API endpoints for search functionality',
    isComplete: true,
    taskID: 'ogIr9s5spp7xfD3i92lEf',
  },
  {
    subtaskID: nanoid(),
    title: 'Implement search query processing logic',
    isComplete: false,
    taskID: 'ogIr9s5spp7xfD3i92lEf',
  },
  // Subtasks for 'Add authentication endpoints'
  {
    subtaskID: nanoid(),
    title: 'Develop API endpoints for user authentication',
    isComplete: true,
    taskID: 'bai6KcDMdq4l2f3DbbdJ1',
  },
  {
    subtaskID: nanoid(),
    title: 'Implement token-based authentication logic',
    isComplete: false,
    taskID: 'bai6KcDMdq4l2f3DbbdJ1',
  },
  // Subtasks for 'Research pricing points of various competitors and trial different business models'
  {
    subtaskID: nanoid(),
    title: 'Research competitor pricing and business models',
    isComplete: true,
    taskID: 's45GucFgjZWoFQvojS2Qa',
  },
  {
    subtaskID: nanoid(),
    title: 'Outline a business model that works for our solution',
    isComplete: true,
    taskID: 's45GucFgjZWoFQvojS2Qa',
  },
  {
    subtaskID: nanoid(),
    title:
      'Talk to potential customers about our proposed solution and ask for fair price expectancy',
    isComplete: false,
    taskID: 's45GucFgjZWoFQvojS2Qa',
  },
  // Subtasks for 'Conduct 5 wireframe tests'
  {
    subtaskID: nanoid(),
    title: 'Recruit participants for wireframe evaluation',
    isComplete: true,
    taskID: 'd0Q1mpgNPnkaw2GCdZidS',
  },
  // Subtasks for 'Create wireframe prototype'
  {
    subtaskID: nanoid(),
    title: 'Develop interactive wireframes for user testing',
    isComplete: true,
    taskID: 'u99QlHeIND0gMzmblCDAo',
  },
  // Subtasks for 'Review results of usability tests and iterate'
  {
    subtaskID: nanoid(),
    title: 'Collect usability testing feedback data',
    isComplete: true,
    taskID: 'adwQYOo36aTBT1NuinR_q',
  },
  {
    subtaskID: nanoid(),
    title: 'Analyze usability test results for improvements',
    isComplete: true,
    taskID: 'adwQYOo36aTBT1NuinR_q',
  },
  {
    subtaskID: nanoid(),
    title: 'Implement iterative design changes based on feedback',
    isComplete: true,
    taskID: 'adwQYOo36aTBT1NuinR_q',
  },
  // Subtasks for 'Create paper prototypes and conduct 10 usability tests with potential customers'
  {
    subtaskID: nanoid(),
    title: 'Craft paper-based prototypes for usability testing',
    isComplete: true,
    taskID: 'G4ywCTryh-6I09tP38TpP',
  },
  {
    subtaskID: nanoid(),
    title: 'Recruit participants for paper prototype evaluations',
    isComplete: true,
    taskID: 'G4ywCTryh-6I09tP38TpP',
  },
  // Subtasks for 'Market discovery'
  {
    subtaskID: nanoid(),
    title: 'Investigate potential target markets for the product',
    isComplete: true,
    taskID: 'sk00OBCTLcNAniuQQOCOi',
  },
  // Subtasks for 'Competitor analysis'
  {
    subtaskID: nanoid(),
    title: 'Research competing products and services',
    isComplete: true,
    taskID: '3rToJGaX3NDQdy9NJjgSt',
  },
  {
    subtaskID: nanoid(),
    title: 'Analyze strengths and weaknesses of competitors',
    isComplete: true,
    taskID: '3rToJGaX3NDQdy9NJjgSt',
  },
  // Subtasks for 'Research the market'
  {
    subtaskID: nanoid(),
    title: 'Explore market trends and emerging technologies',
    isComplete: true,
    taskID: 'AArbbxiJe0MpTa7pZCFy9',
  },
  {
    subtaskID: nanoid(),
    title: 'Identify opportunities and challenges in the market',
    isComplete: true,
    taskID: 'AArbbxiJe0MpTa7pZCFy9',
  },
];
