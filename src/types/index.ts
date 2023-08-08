export interface IBoard {
  boardID: string;
  name: string;
  columns: IStatus[];
}

export interface ITask {
  taskID: string;
  title: string;
  description: string;
  status: IStatus;
  boardID: string;
}

export interface ISubtask {
  subtaskID: string;
  title: string;
  isComplete: boolean;
  taskID: string;
}

export type IStatus = string;
