import Select from '@/components/atoms/Select/Select';
import EllipsisMenu, {
  type EllipsisMenuItem,
} from '@/components/molecules/EllipsisMenu/EllipsisMenu';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { selectActiveBoard } from '@/store/slices/boardsSlice';
import { selectSubtasksByTaskID } from '@/store/slices/subtasksSlice';
import { taskEdited } from '@/store/slices/tasksSlice';
import { type IStatus } from '@/types';
import { Dialog } from '@headlessui/react';
import { useState, type FC } from 'react';
import SubtasksList from '../SubtasksList/SubtasksList';

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
            className="heading-l flex-1 dark:text-primaryWhite"
          >
            {task.title}
          </Dialog.Title>

          <EllipsisMenu items={ellipsisMenuList} />
        </section>

        <Dialog.Description as="p" className="body-l text-primaryMediumGrey">
          {task.description}
        </Dialog.Description>

        <SubtasksList subtasks={subtasks} />

        <section>
          <label className="label" htmlFor="currentStatus">
            Current status
          </label>
          <Select
            options={statuses}
            selected={selectedStatus}
            onChange={setSelectedStatus}
            onCustomAction={() =>
              dispatch(
                taskEdited({
                  ...task,
                  statusID: selectedStatus.statusID,
                })
              )
            }
          />
        </section>
      </Dialog.Panel>
    </div>
  );
};

export default ViewTaskModal;
