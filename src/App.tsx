/* eslint-disable array-callback-return */
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import Button from './components/atoms/Button/Button';
import DesktopSidebar from './components/organisms/DesktopSidebar/DesktopSidebar';
import Header from './components/organisms/Header/Header';
import ViewTaskModal from './components/organisms/ViewTaskModal/ViewTaskModal';
import Modal from './components/templates/Modal/Modal';
import useModal from './components/templates/Modal/useModal';
import { useAppSelector } from './hooks/storeHook';
import useMediaQuery from './hooks/useMediaQuery';
import { transformToPascalCase } from './utility';

const App = () => {
  const [taskID, setTaskID] = useState<string>('');
  const tabletMatches = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const board = useAppSelector((state) =>
    state.boards.find((board) => board.name === transformToPascalCase(pathname))
  );

  if (!board) return;

  const columns = board.columns;

  const tasks = useAppSelector((state) =>
    state.tasks.filter((task) => task.boardID === board.boardID)
  );

  const subtasks = useAppSelector((state) => state.subtasks);

  return (
    <>
      <div className="grid h-screen grid-rows-[64px_1fr] overflow-hidden md:grid-rows-[80px_1fr] lg:grid-rows-[97px_1fr]">
        <Header />
        <div className="flex overflow-hidden">
          {tabletMatches && <DesktopSidebar />}
          <main className="flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-primaryVeryDarkGrey p-4 text-primaryMediumGrey">
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
                        <ul className="mt-6 flex flex-col gap-y-5">
                          {tasks.map((task, index) => {
                            if (task.status === column) {
                              const subtasksArr = subtasks.filter(
                                (subtask) => subtask.taskID === task.taskID
                              );

                              return (
                                <li
                                  key={index}
                                  className="cursor-pointer rounded-lg bg-primaryDarkGrey px-4 py-6"
                                  onClick={() => {
                                    setTaskID(task.taskID);
                                    handleOpenModal();
                                  }}
                                >
                                  <h4 className="mb-2 break-words text-base font-bold text-primaryWhite">
                                    {task.title}
                                  </h4>
                                  <p className="text-xs font-bold text-primaryMediumGrey">
                                    {
                                      subtasksArr.filter(
                                        (subtask) => subtask.isComplete
                                      ).length
                                    }{' '}
                                    of {subtasksArr.length} substasks
                                  </p>
                                </li>
                              );
                            }
                          })}
                        </ul>
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
        <ViewTaskModal taskID={taskID} />
      </Modal>
    </>
  );
};

export default App;
