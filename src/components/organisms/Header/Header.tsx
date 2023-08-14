import logoImage from '@/assets/logo.png';
import Button from '@/components/atoms/Button/Button';
import EllipsisMenu, {
  type EllipsisMenuItem,
} from '@/components/molecules/EllipsisMenu/EllipsisMenu';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { boardDeleted } from '@/store/slices/boardsSlice';
import { transformToPascalCase } from '@/utility';
import { useState } from 'react';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import BoardModal from '../BoardModal/BoardModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import TaskModal from '../TaskModal/TaskModal';

type ModalType = 'delete-board' | 'edit-board' | 'create-task';

const Header = () => {
  const tabletMatches = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();
  const boardName = transformToPascalCase(pathname);
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [currentModal, setCurrentModal] = useState<ModalType>('create-task');
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find((board) => board.name === boardName)
  );

  if (!board) {
    return null;
  }

  const ellipsisMenuList: EllipsisMenuItem[] = [
    {
      name: 'Edit Board',
      action: () => openModal('edit-board'),
    },
    {
      name: 'Delete Board',
      action: () => openModal('delete-board'),
      version: 'red',
    },
  ];

  const openModal = (modalType: ModalType) => {
    switch (modalType) {
      case 'create-task':
        setCurrentModal('create-task');
        break;
      case 'edit-board':
        setCurrentModal('edit-board');
        break;
      case 'delete-board':
        setCurrentModal('delete-board');
        break;
    }
    handleOpenModal();
  };

  const deleteBoardDescription = `Are you sure you want to delete the ‘${boardName}’ board? This action will remove all columns and tasks and cannot be reversed.`;

  return (
    <>
      <header className="flex items-center justify-between border-primaryLinesLight bg-primaryWhite px-4 dark:border-primaryLinesDark dark:bg-primaryDarkGrey">
        <section className="flex h-full">
          {tabletMatches && (
            <div className="flex h-full w-60 items-center border-r-[1px] border-primaryLinesLight dark:border-primaryLinesDark">
              <img className="mr-4" src={logoImage} alt="logo" />

              <h1 className="text-2xl font-bold text-primaryBlack dark:text-primaryWhite">
                kanban
              </h1>
            </div>
          )}
          <div className="flex items-center">
            <img className="mr-4 md:hidden" src={logoImage} alt="logo" />

            <h2 className="text-lg font-bold text-primaryBlack dark:text-primaryWhite md:ml-6 md:text-xl">
              {boardName}
            </h2>

            <button className="md:hidden">
              <MdKeyboardArrowDown className="p-1 text-3xl text-primaryPurple" />
            </button>
          </div>
        </section>

        <section className="flex items-center gap-x-4">
          {!tabletMatches ? (
            <button className="rounded-3xl bg-primaryPurple px-4 py-2 duration-200 hover:bg-primaryPurpleHover">
              <MdAdd className="text-xl text-primaryWhite" />
            </button>
          ) : (
            <Button onClick={() => openModal('create-task')}>
              <MdAdd className="text-xl text-primaryWhite" />
              Add New Task
            </Button>
          )}

          <EllipsisMenu items={ellipsisMenuList} />
        </section>
      </header>
      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        {currentModal === 'create-task' && (
          <TaskModal type="create" title="Add New Task" />
        )}
        {currentModal === 'edit-board' && (
          <BoardModal type="edit" title="Edit Board" board={board} />
        )}
        {currentModal === 'delete-board' && (
          <DeleteModal
            title="Delete this board?"
            description={deleteBoardDescription}
            onDelete={() => dispatch(boardDeleted({ boardName }))}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </>
  );
};

export default Header;
