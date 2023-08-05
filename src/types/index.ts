export interface IBoard {
  name: string;
  columns: IStatus[];
}

export interface ITask {
  title: string;
  description: string;
  status: IStatus[];
  subtasks: ISubtask[];
}

export type IStatus = string;

export interface ISubtask {
  title: string;
  isComplete: boolean;
}
