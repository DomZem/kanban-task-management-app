import Button from '@/components/atoms/Button/Button';
import BoardModal from '@/components/organisms/BoardModal/BoardModal';
import DeleteModal from '@/components/organisms/DeleteModal/DeleteModal';
import TaskList from '@/components/organisms/TaskList/TaskList';
import TaskModal from '@/components/organisms/TaskModal/TaskModal';
import ViewTaskModal from '@/components/organisms/ViewTaskModal/ViewTaskModal';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { taskDeleted } from '@/store/slices/tasksSlice';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';

const StatusesList = () => {
  const [selectedTaskID, setSelectedTaskID] = useState<string>('');
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [currentModal, setCurrentModal] = useState<
    'task-view' | 'task-edit' | 'task-delete' | 'board-edit'
  >('task-view');

  const dispatch = useAppDispatch();

  const handleCancelModal = () => {
    setCurrentModal('task-view');
    handleCloseModal();
  };

  const handleDeleteTask = () => {
    dispatch(taskDeleted({ taskID: selectedTaskID }));
    handleCancelModal();
  };

  const handleOpenBoardEdit = () => {
    setCurrentModal('board-edit');
    handleOpenModal();
  };

  const board = useAppSelector((state) =>
    state.boards.find(({ isActive }) => isActive)
  );

  if (!board) {
    return <div>Something went wrong. Board not found!</div>;
  }

  const tasks = useAppSelector((state) =>
    state.tasks.filter((task) => task.boardID === board.boardID)
  );

  const task = tasks.find((task) => task.taskID === selectedTaskID);

  const subtasks = useAppSelector((state) => state.subtasks);

  const statuses = board.statuses;

  if (statuses.length === 0) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="flex flex-1 flex-col items-center gap-y-6">
          <h3 className="text-center text-lg font-medium">
            This board is empty. Create a new column to get started.
          </h3>
          <Button version="secondary" onClick={handleOpenBoardEdit}>
            <MdAdd className="text-xl text-primaryWhite" />
            Add New Column
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ul className="flex min-h-full min-w-fit justify-start gap-x-6">
        {statuses.map(({ statusID, name }) => {
          const taskCount = tasks.filter(
            (task) => task.statusID === statusID
          ).length;

          return (
            <li className="w-[280px]" key={statusID}>
              <div className="flex items-center gap-x-3">
                <div
                  className={`bg- h-4 w-4 rounded-full bg-primaryPurple`}
                ></div>
                <h3 className="text-xs font-bold uppercase tracking-[2.4px]">
                  {name} ({taskCount})
                </h3>
              </div>
              {tasks && (
                <TaskList
                  tasks={tasks}
                  subtasks={subtasks}
                  column={statusID}
                  onSetTaskID={setSelectedTaskID}
                  onOpenModal={handleOpenModal}
                />
              )}
            </li>
          );
        })}
        <li className="min-h-full w-[280px] pt-10">
          <div className="flex h-full items-center justify-center rounded-md bg-addNewColumn text-primaryMediumGrey duration-200 hover:text-primaryPurple dark:bg-addNewColumnDark">
            <button
              className="flex h-full w-full items-center justify-center text-2xl font-bold"
              onClick={handleOpenBoardEdit}
            >
              <MdAdd />
              New Column
            </button>
          </div>
        </li>
      </ul>
      <Modal isOpen={isOpen} onCloseModal={handleCancelModal}>
        {currentModal === 'task-view' && (
          <ViewTaskModal
            taskID={selectedTaskID}
            handleTaskDelete={() => setCurrentModal('task-delete')}
            handleTaskEdit={() => setCurrentModal('task-edit')}
          />
        )}

        {currentModal === 'task-edit' && (
          <TaskModal type="edit" title="Edit Task" task={task} />
        )}

        {currentModal === 'board-edit' && (
          <BoardModal type="edit" title="Edit Board" />
        )}

        {currentModal === 'task-delete' && (
          <DeleteModal
            title="Delete this task?"
            description={`Are you sure you want to delete the ‘${task?.title}’ task and its subtasks? This action cannot be reversed.`}
            onDelete={handleDeleteTask}
            onCancel={handleCancelModal}
          />
        )}
      </Modal>
    </>
  );
};
export default StatusesList;
