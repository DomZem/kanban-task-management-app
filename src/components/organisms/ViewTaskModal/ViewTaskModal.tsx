import Select from '@/components/atoms/Select/Select';
import EllipsisMenu, {
  type EllipsisMenuItem,
} from '@/components/molecules/EllipsisMenu/EllipsisMenu';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { selectActiveBoard } from '@/store/slices/boardsSlice';
import {
  selectSubtasksByTaskID,
  subtaskEdited,
} from '@/store/slices/subtasksSlice';
import { taskEdited } from '@/store/slices/tasksSlice';
import { type IStatus, type ISubtask } from '@/types';
import { Dialog } from '@headlessui/react';
import { useState, type FC } from 'react';

interface ViewTaskModalProps {
  taskID: string;
  handleTaskEdit: () => void;
  handleTaskDelete: () => void;
}

const ViewTaskModal: FC<ViewTaskModalProps> = ({
  taskID,
  handleTaskEdit,
  handleTaskDelete,
}) => {
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.find((task) => task.taskID === taskID)
  );

  const board = useAppSelector(selectActiveBoard);

  const subtasks = useAppSelector((state) =>
    selectSubtasksByTaskID(state, taskID)
  );

  if (!board || !task || !subtasks) {
    return <div>Something went wrong try maybe later!</div>;
  }

  const statuses = board.statuses;

  const initialSelectedStatus =
    board.statuses.find(
      (status: IStatus) => status.statusID === task.statusID
    ) ?? statuses[0];

  const [selectedStatus, setSelectedStatus] = useState(initialSelectedStatus);

  const subtasksCount = subtasks.length;
  const completedSubtasksCount = subtasks.filter(
    (subtask: ISubtask) => subtask.isComplete
  ).length;

  const ellipsisMenuList: EllipsisMenuItem[] = [
    {
      name: 'Edit Task',
      action: handleTaskEdit,
    },
    {
      name: 'Delete Task',
      action: handleTaskDelete,
      version: 'red',
    },
  ];

  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <Dialog.Panel className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6 dark:bg-primaryDarkGrey">
        <section className="flex items-center">
          <Dialog.Title
            as="h3"
            className="flex-1 text-lg font-bold dark:text-primaryWhite"
          >
            {task.title}
          </Dialog.Title>

          <EllipsisMenu items={ellipsisMenuList} />
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
            {subtasks.map((subtask: ISubtask) => (
              <li
                key={subtask.subtaskID}
                className="flex items-center gap-x-4 rounded bg-primaryLightGrey p-3 duration-200 hover:bg-[#635FC7]/25 dark:bg-primaryVeryDarkGrey hover:dark:bg-[#635FC7]/25"
              >
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  id={subtask.subtaskID}
                  checked={subtask.isComplete}
                  onChange={() => {
                    dispatch(
                      subtaskEdited({
                        ...subtask,
                        isComplete: !subtask.isComplete,
                      })
                    );
                  }}
                />
                <label
                  htmlFor={subtask.subtaskID}
                  className={`text-xs font-bold text-primaryBlack duration-200 dark:text-primaryWhite ${
                    subtask.isComplete &&
                    'text-black/50 line-through dark:text-[#fff]/50'
                  }`}
                >
                  {subtask.title}
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
            options={statuses}
            selected={selectedStatus}
            onChange={setSelectedStatus}
            onCustomAction={() => {
              dispatch(
                taskEdited({
                  ...task,
                  statusID: selectedStatus.statusID,
                })
              );
            }}
          />
        </section>
      </Dialog.Panel>
    </div>
  );
};

export default ViewTaskModal;
