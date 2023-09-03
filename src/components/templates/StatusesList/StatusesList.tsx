import Button from '@/components/atoms/Button/Button';
import BoardModal from '@/components/organisms/BoardModal/BoardModal';
import DeleteModal from '@/components/organisms/DeleteModal/DeleteModal';
import TaskModal from '@/components/organisms/TaskModal/TaskModal';

import TasksList from '@/components/organisms/TasksList/TasksList';
import ViewTaskModal from '@/components/organisms/ViewTaskModal/ViewTaskModal';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { selectActiveBoard } from '@/store/slices/boardsSlice';
import { selectAllSubtasks } from '@/store/slices/subtasksSlice';
import {
  selectTasksByBoardID,
  taskDeleted,
  taskStatusChanged,
} from '@/store/slices/tasksSlice';
import { type IStatus, type ITask } from '@/types';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
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

  const board = useAppSelector(selectActiveBoard);

  if (!board) {
    return <div>Something went wrong. Board not found!</div>;
  }

  const tasks = useAppSelector((state) =>
    selectTasksByBoardID(state, board.boardID)
  );

  const task = tasks.find((task: ITask) => task.taskID === selectedTaskID);

  const subtasks = useAppSelector(selectAllSubtasks);

  const statuses = board.statuses;

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && active) {
      const taskID = active.id.toString();
      const statusID = over.id.toString();

      dispatch(taskStatusChanged({ taskID, statusID }));
    }
  };

  if (statuses.length === 0) {
    return (
      <>
        <div className="flex min-h-full items-center justify-center">
          <div className="flex flex-1 flex-col items-center gap-y-[25px]">
            <h3 className="heading-l text-center">
              This board is empty. Create a new column to get started.
            </h3>
            <Button version="secondary" onClick={handleOpenBoardEdit}>
              <MdAdd className="text-xl text-primaryWhite" />
              Add New Column
            </Button>
          </div>
        </div>
        <Modal isOpen={isOpen} onCloseModal={handleCancelModal}>
          <BoardModal type="edit" title="Edit Board" />
        </Modal>
      </>
    );
  }

  return (
    <>
      <ul className="flex min-h-full min-w-fit justify-start gap-x-4">
        <DndContext onDragEnd={handleDragEnd}>
          {statuses.map(({ statusID, name, color }: IStatus) => {
            const taskCount = tasks.filter(
              (task: ITask) => task.statusID === statusID
            ).length;

            const filteredTasks = tasks.filter(
              (task: ITask) => task.statusID === statusID
            );

            return (
              <li className="flex w-[288px] flex-col" key={statusID}>
                <div className="flex items-center gap-x-3 p-1">
                  <div
                    style={{
                      backgroundColor: color,
                    }}
                    className="h-[15px] w-[15px] rounded-full"
                  ></div>
                  <h3 className="heading-s uppercase">
                    {name} ({taskCount})
                  </h3>
                </div>
                {tasks && (
                  <TasksList
                    tasks={filteredTasks}
                    subtasks={subtasks}
                    statusColor={color}
                    statusID={statusID}
                    onSetTaskID={setSelectedTaskID}
                    onOpenModal={handleOpenModal}
                  />
                )}
              </li>
            );
          })}
        </DndContext>
        <li className="min-h-full w-[280px] pt-10">
          <div className="flex h-full items-center justify-center rounded-md bg-column text-primaryMediumGrey duration-200 hover:text-primaryPurple dark:bg-columnDark">
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
