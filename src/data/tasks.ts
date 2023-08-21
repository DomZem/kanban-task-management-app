import { type ITask } from '@/types';

export const initialState: ITask[] = [
  {
    taskID: 'CwWTu6kUaL3CN3wHcmZlg',
    title: 'Build UI for onboarding flow',
    description:
      "We have a clear vision for our version one product, and now it's time to create the user interface for the onboarding flow. Additionally, we need to solidify the initial pricing model that we'll employ. Let's iterate through the subtasks to formulate a cohesive proposition.",
    statusID: 'G23bpua3v4pWoM2zDXub4',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'UF1D3nYdHRr52mSMJEXAG',
    title: 'Build UI for search',
    description:
      "Our goal is to develop the user interface components that facilitate an efficient search experience. Users should be able to quickly find what they're looking for. Let's design and implement the UI for search functionality.",
    statusID: 'G23bpua3v4pWoM2zDXub4',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'PJr2od62XXOqv6W39i2Ys',
    title: 'Build settings UI',
    description:
      'We need to create the user interface for the settings page, allowing users to customize their preferences and configurations. Design and implement the UI components that will provide a seamless settings experience.',
    statusID: 'G23bpua3v4pWoM2zDXub4',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'l35IxKtsHEO3f0sd4TIXI',
    title: 'QA and test all major user journeys',
    description:
      "It's time to thoroughly test the major user journeys within our application. Identify critical paths, simulate user interactions, and ensure a smooth user experience. Execute comprehensive quality assurance and testing procedures.",
    statusID: 'G23bpua3v4pWoM2zDXub4',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  // ===== Doing tasks ======
  {
    taskID: '7HtrFGuxjx41q9M2Cv_Yz',
    title: 'Design settings and search pages',
    description:
      'Currently in the design phase, this task involves creating the visual layouts for both the settings and search pages. Focus on user-friendly designs, intuitive navigation, and a cohesive visual identity.',
    statusID: 'TMuO5vcZQTslhTX3E7jOG',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: '2IE0Q7NKtjfTh7kvKveek',
    title: 'Add account management endpoints',
    description:
      "In this phase, we're extending the backend functionality to support user account management. Implement API endpoints for user registration, login, and profile management.",
    statusID: 'TMuO5vcZQTslhTX3E7jOG',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'YO0vjW5H8J3LkAbedvo24',
    title: 'Design onboarding flow',
    description:
      "In this active task, we're focusing on creating a smooth and engaging onboarding experience for our users. Design the step-by-step journey that introduces users to our platform, ensuring it is intuitive and aligned with our product's vision.",
    statusID: 'TMuO5vcZQTslhTX3E7jOG',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'ogIr9s5spp7xfD3i92lEf',
    title: 'Add search enpoints',
    description:
      "This task involves developing the necessary backend API endpoints to enable robust search functionality. Implement search queries, filters, and sorting to ensure users can efficiently retrieve the information they're looking for.",
    statusID: 'TMuO5vcZQTslhTX3E7jOG',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'bai6KcDMdq4l2f3DbbdJ1',
    title: 'Add authentication endpoints',
    description:
      "Security is crucial for our application. In this task, we're creating the backend endpoints needed for user authentication and authorization. Implement secure login, registration, and token-based authentication mechanisms.",
    statusID: 'TMuO5vcZQTslhTX3E7jOG',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 's45GucFgjZWoFQvojS2Qa',
    title:
      'Research pricing points of various competitors and trial different business models',
    description:
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    statusID: 'TMuO5vcZQTslhTX3E7jOG',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  // ===== Done tasks ======
  {
    taskID: 'd0Q1mpgNPnkaw2GCdZidS',
    title: 'Conduct 5 wireframe tests',
    description:
      'We successfully conducted usability tests on our wireframe prototypes, involving users to provide valuable feedback. This process helped us identify usability issues early on and refine our design decisions for a more user-friendly experience.',
    statusID: 'adzbogxxY15UV-XOtv64E',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'u99QlHeIND0gMzmblCDAo',
    title: 'Create wireframe prototype',
    description:
      "We've created a comprehensive wireframe prototype that serves as a visual blueprint for our product's interface. This prototype is the result of careful planning and design considerations to ensure a solid foundation for our user interface development.",
    statusID: 'adzbogxxY15UV-XOtv64E',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'adwQYOo36aTBT1NuinR_q',
    title: 'Review results of usability tests and iterate',
    description:
      'After analyzing the results of our usability tests, we identified areas for improvement. We iterated on our design based on the feedback received from users, refining the user experience to align better with their needs and preferences.',
    statusID: 'adzbogxxY15UV-XOtv64E',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'G4ywCTryh-6I09tP38TpP',
    title:
      'Create paper prototypes and conduct 10 usability tests with potential customers',
    description:
      "We went through a comprehensive process of creating paper prototypes and conducting usability tests with potential customers. This helped us validate our design concepts, gather insights, and make informed decisions to enhance our product's usability.",
    statusID: 'adzbogxxY15UV-XOtv64E',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'sk00OBCTLcNAniuQQOCOi',
    title: 'Market discovery',
    description:
      "Through thorough research and analysis, we've successfully explored the market landscape. This task provided us with valuable insights into potential opportunities, target demographics, and trends that will guide our product development and marketing strategies.",
    statusID: 'adzbogxxY15UV-XOtv64E',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: '3rToJGaX3NDQdy9NJjgSt',
    title: 'Competitor analysis',
    description:
      'We conducted a comprehensive analysis of our competitors, identifying their strengths and weaknesses. This analysis has informed our strategy and allowed us to differentiate our product by addressing gaps in the market.',
    statusID: 'adzbogxxY15UV-XOtv64E',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
  {
    taskID: 'AArbbxiJe0MpTa7pZCFy9',
    title: 'Research the market',
    description:
      "Our market research efforts have provided us with a deep understanding of the industry landscape, customer needs, and potential challenges. This knowledge will drive our product's features, positioning, and overall strategy.",
    statusID: 'adzbogxxY15UV-XOtv64E',
    boardID: 'I8xa1o7b8GYYMuSUhDxMG',
  },
];
