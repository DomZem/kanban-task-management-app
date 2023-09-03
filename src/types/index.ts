export interface IBoard {
  boardID: string;
  name: string;
  statuses: IStatus[];
  isActive: boolean;
}

export interface ITask {
  taskID: string;
  title: string;
  description?: string;
  statusID: string;
  boardID: string;
}

export interface ISubtask {
  subtaskID: string;
  title: string;
  isComplete: boolean;
  taskID: string;
}

export interface IStatus {
  statusID: string;
  name: string;
  color: string;
}
