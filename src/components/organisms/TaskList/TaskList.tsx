import TaskItem from '@/components/molecules/TaskItem/TaskItem';
import { type ISubtask, type ITask } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import { type FC } from 'react';

interface TaskListProps {
  tasks: ITask[];
  subtasks: ISubtask[];
  statusID: string;
  onSetTaskID: React.Dispatch<React.SetStateAction<string>>;
  onOpenModal: () => void;
}

const TaskList: FC<TaskListProps> = ({
  tasks,
  subtasks,
  statusID,
  onSetTaskID,
  onOpenModal,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: statusID,
  });

  return (
    <ul
      ref={setNodeRef}
      className={`${
        isOver ? 'bg-primaryPurple' : ''
      } mt-4 flex flex-1 flex-col gap-y-5 rounded-xl p-1 duration-200`}
    >
      {tasks.map(({ taskID, title }) => {
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
            taskID={taskID}
            title={title}
            description={taskDescription}
            onClick={handleOnTaskClick}
            key={taskID}
          />
        );
      })}
    </ul>
  );
};

export default TaskList;
