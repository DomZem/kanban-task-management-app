import TaskListItem from '@/components/molecules/TaskListItem/TaskListItem';
import { type ISubtask, type ITask } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import { type FC } from 'react';

interface TasksListProps {
  tasks: ITask[];
  subtasks: ISubtask[];
  statusID: string;
  statusColor: string;
  onSetTaskID: React.Dispatch<React.SetStateAction<string>>;
  onOpenModal: () => void;
}

const TasksList: FC<TasksListProps> = ({
  tasks,
  subtasks,
  statusID,
  statusColor,
  onSetTaskID,
  onOpenModal,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: statusID,
  });

  return (
    <ul
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? statusColor : 'transparent',
      }}
      className="mt-4 flex flex-1 flex-col gap-y-5 rounded-xl p-1 duration-200"
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
          <TaskListItem
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

export default TasksList;
