export interface IBoard {
  name: string;
  columns: IStatus[];
  tasks: ITask[];
}

export interface ITask {
  status: IStatus;
  title: string;
  description: string;
  subtasks: ISubtask[];
}

export interface ISubtask {
  title: string;
  isComplete: boolean;
}

export type IStatus = string;
