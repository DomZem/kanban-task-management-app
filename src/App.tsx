/* eslint-disable array-callback-return */
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useMediaQuery } from 'usehooks-ts';
import Button from './components/atoms/Button/Button';
import DeleteModal from './components/organisms/DeleteModal/DeleteModal';
import DesktopSidebar from './components/organisms/DesktopSidebar/DesktopSidebar';
import Header from './components/organisms/Header/Header';
import TaskList from './components/organisms/TaskList/TaskList';
import TaskModal from './components/organisms/TaskModal/TaskModal';
import ViewTaskModal from './components/organisms/ViewTaskModal/ViewTaskModal';
import Modal from './components/templates/Modal/Modal';
import useModal from './components/templates/Modal/useModal';
import { useAppDispatch, useAppSelector } from './hooks/storeHook';
import { taskDeleted } from './store/slices/tasksSlice';

const App = () => {
  const [selectedTaskID, setSelectedTaskID] = useState<string>('');
  const tabletMatches = useMediaQuery('(min-width: 768px)');
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [taskAction, setTaskAction] = useState<'view' | 'edit' | 'delete'>(
    'view'
  );
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find(({ isActive }) => isActive)
  );

  if (!board) return null;

  const tasks = useAppSelector((state) =>
    state.tasks.filter((task) => task.boardID === board.boardID)
  );

  const subtasks = useAppSelector((state) => state.subtasks);

  const task = tasks.find((task) => task.taskID === selectedTaskID);

  const statuses = board.statuses;

  const handleCancelModal = () => {
    setTaskAction('view');
    handleCloseModal();
  };

  const handleDeleteTask = () => {
    dispatch(taskDeleted({ taskID: selectedTaskID }));
    setTaskAction('delete');
    handleCloseModal();
  };

  return (
    <>
      <div className="grid h-screen grid-rows-[64px_1fr] overflow-hidden md:grid-rows-[80px_1fr] lg:grid-rows-[97px_1fr]">
        <Header />
        <div className="flex overflow-hidden">
          {tabletMatches && <DesktopSidebar />}
          <main className="flex-1 overflow-y-auto bg-primaryLightGrey p-4 text-primaryMediumGrey dark:bg-primaryVeryDarkGrey">
            {statuses.length > 0 ? (
              <ul className="flex min-w-fit justify-start gap-x-6">
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
              </ul>
            ) : (
              <div className="flex min-h-full items-center justify-center">
                <div className="flex flex-1 flex-col items-center gap-y-6">
                  <h3 className="text-center text-lg font-medium">
                    This board is empty. Create a new column to get started.
                  </h3>
                  <Button>
                    <MdAdd className="text-xl text-primaryWhite" />
                    Add New Column
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <Modal isOpen={isOpen} onCloseModal={handleCancelModal}>
        {taskAction === 'view' && (
          <ViewTaskModal
            taskID={selectedTaskID}
            handleTaskDelete={() => setTaskAction('delete')}
            handleTaskEdit={() => setTaskAction('edit')}
          />
        )}

        {taskAction === 'edit' && (
          <TaskModal type="edit" title="Edit Task" task={task} />
        )}

        {taskAction === 'delete' && (
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

export default App;
