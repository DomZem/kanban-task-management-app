import TaskItem from '@/components/molecules/TaskItem/TaskItem';
import { type ISubtask, type ITask } from '@/types';
import { type FC } from 'react';

interface TaskListProps {
  tasks: ITask[];
  subtasks: ISubtask[];
  column: string;
  onSetTaskID: React.Dispatch<React.SetStateAction<string>>;
  onOpenModal: () => void;
}

const TaskList: FC<TaskListProps> = ({
  tasks,
  subtasks,
  column,
  onSetTaskID,
  onOpenModal,
}) => (
  <ul className="mt-6 flex flex-col gap-y-5">
    {tasks.map(({ taskID, title, statusID }) => {
      if (statusID === column) {
        const subtasksArr = subtasks.filter(
          (subtask) => subtask.taskID === taskID
        );

        const handleOnTaskClick = () => {
          onSetTaskID(taskID);
          onOpenModal();
        };

        const taskDescription = `${
          subtasksArr.filter(({ isComplete }) => isComplete).length
        } of ${subtasksArr.length} substasks`;

        return (
          <TaskItem
            key={taskID}
            title={title}
            description={taskDescription}
            onClick={handleOnTaskClick}
          />
        );
      }
      return null;
    })}
  </ul>
);

export default TaskList;
