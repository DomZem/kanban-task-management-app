import Select from '@/components/atoms/Select/Select';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { subtaskCompleteStatusUpdated } from '@/store/slices/subtasksSlice';
import { taskStatusUpdated } from '@/store/slices/tasksSlice';
import { Dialog } from '@headlessui/react';
import { useState, type FC } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

interface ViewTaskModalProps {
  taskID: string;
}

const ViewTaskModal: FC<ViewTaskModalProps> = ({ taskID }) => {
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.find((task) => task.taskID === taskID)
  );

  const board = useAppSelector((state) =>
    state.boards.find((board) => board.boardID === task?.boardID)
  );

  const subtasks = useAppSelector((state) =>
    state.subtasks.filter((subtask) => subtask.taskID === taskID)
  );

  if (!board || !task || !subtasks) {
    return <div>Something went wrong try maybe later!</div>;
  }

  const [selectedCurrentStatus, setSelectedCurrentStatus] = useState(
    task.status
  );

  const subtasksCount = subtasks.length;
  const completedSubtasksCount = subtasks.filter(
    (subtask) => subtask.isComplete
  ).length;

  const handleSubtaskCheckboxChange = (
    subtaskID: string,
    isComplete: boolean
  ) => {
    dispatch(subtaskCompleteStatusUpdated({ subtaskID, isComplete }));
  };

  return (
    <Dialog.Panel className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6">
      <section className="flex items-center">
        <Dialog.Title as="h3" className="flex-1 text-lg font-bold">
          {task.title}
        </Dialog.Title>
        <button className="p-2">
          <HiDotsVertical className="text-xl text-primaryMediumGrey" />
        </button>
      </section>

      <Dialog.Description
        as="p"
        className="text-sm font-medium leading-6 text-primaryMediumGrey"
      >
        {task.description}
      </Dialog.Description>

      <section>
        <p className="label">
          Subtasks ({completedSubtasksCount} of {subtasksCount})
        </p>
        <ul className="mt-4 flex flex-col gap-y-2">
          {subtasks.map(({ subtaskID, title, isComplete }) => (
            <li
              key={subtaskID}
              className="flex items-center gap-x-4 rounded bg-primaryLightGrey p-3"
            >
              <input
                type="checkbox"
                id={subtaskID}
                checked={isComplete}
                onChange={() => {
                  handleSubtaskCheckboxChange(subtaskID, !isComplete);
                }}
              />
              <label
                htmlFor={subtaskID}
                className={`text-xs font-bold text-primaryBlack  ${
                  isComplete && 'line-through'
                }`}
              >
                {title}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <label className="label" htmlFor="currentStatus">
          Current status
        </label>
        <Select
          options={board.columns}
          selected={selectedCurrentStatus}
          onChange={setSelectedCurrentStatus}
          onCustomAction={() => {
            dispatch(
              taskStatusUpdated({ taskID, status: selectedCurrentStatus })
            );
          }}
        />
      </section>
    </Dialog.Panel>
  );
};

export default ViewTaskModal;
