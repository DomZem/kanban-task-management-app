/* eslint-disable array-callback-return */
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import Button from './components/atoms/Button/Button';
import DeleteModal from './components/organisms/DeleteModal/DeleteModal';
import DesktopSidebar from './components/organisms/DesktopSidebar/DesktopSidebar';
import Header from './components/organisms/Header/Header';
import TaskList from './components/organisms/TaskList/TaskList';
import ViewTaskModal from './components/organisms/ViewTaskModal/ViewTaskModal';
import Modal from './components/templates/Modal/Modal';
import useModal from './components/templates/Modal/useModal';
import { useAppDispatch, useAppSelector } from './hooks/storeHook';
import useMediaQuery from './hooks/useMediaQuery';
import { taskDeleted } from './store/slices/tasksSlice';
import { transformToPascalCase } from './utility';

const App = () => {
  const [taskID, setTaskID] = useState<string>('');
  const tabletMatches = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isTaskToDelete, setIsTaskToDelete] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find((board) => board.name === transformToPascalCase(pathname))
  );

  if (!board) return;

  const columns = board.columns;

  const tasks = useAppSelector((state) =>
    state.tasks.filter((task) => task.boardID === board.boardID)
  );

  const subtasks = useAppSelector((state) => state.subtasks);

  const taskName = tasks.find((task) => task.taskID === taskID)?.title;

  return (
    <>
      <div className="grid h-screen grid-rows-[64px_1fr] overflow-hidden md:grid-rows-[80px_1fr] lg:grid-rows-[97px_1fr]">
        <Header />
        <div className="flex overflow-hidden">
          {tabletMatches && <DesktopSidebar />}
          <main className="flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-primaryLightGrey p-4 text-primaryMediumGrey dark:bg-primaryVeryDarkGrey">
            {columns ? (
              <div className="h-full w-full flex-1">
                <ul className="flex h-full justify-start gap-x-6">
                  {columns.map((column) => (
                    <li className="w-[280px]" key={column}>
                      <div className="flex items-center gap-x-3">
                        <div className="h-4 w-4 rounded-full bg-teal-500"></div>
                        <h3 className="text-xs font-bold uppercase tracking-[2.4px]">
                          {column}
                        </h3>
                      </div>
                      {tasks && (
                        <TaskList
                          tasks={tasks}
                          subtasks={subtasks}
                          column={column}
                          onSetTaskID={setTaskID}
                          onOpenModal={handleOpenModal}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-y-6">
                <h3 className="text-center text-lg font-medium">
                  This board is empty. Create a new column to get started.
                </h3>
                <Button>
                  <MdAdd className="text-xl text-primaryWhite" />
                  Add New Column
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        {!isTaskToDelete ? (
          <ViewTaskModal
            taskID={taskID}
            action={() => setIsTaskToDelete(true)}
          />
        ) : (
          <DeleteModal
            title="Delete this task?"
            description={`Are you sure you want to delete the ‘${taskName}’ task and its subtasks? This action cannot be reversed.`}
            onDelete={() => {
              dispatch(taskDeleted({ taskID }));
              setIsTaskToDelete(false);
              handleCloseModal();
            }}
            onCancel={() => {
              handleCloseModal();
              setIsTaskToDelete(false);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default App;
