import logoImage from '@/assets/logo.png';
import Button from '@/components/atoms/Button/Button';
import EllipsisMenu, {
  type EllipsisMenuItem,
} from '@/components/molecules/EllipsisMenu/EllipsisMenu';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { boardDeleted } from '@/store/slices/boardsSlice';
import { useState } from 'react';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';
import { useMediaQuery } from 'usehooks-ts';
import BoardModal from '../BoardModal/BoardModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import MobileSidebar from '../MobileSidebar/MobileSidebar';
import TaskModal from '../TaskModal/TaskModal';

export type ModalType =
  | 'create-board'
  | 'delete-board'
  | 'edit-board'
  | 'create-task'
  | 'mobile-sidebar';

const Header = () => {
  const tabletMatches = useMediaQuery('(min-width: 768px)');
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [currentModal, setCurrentModal] = useState<ModalType>('create-task');
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find(({ isActive }) => isActive)
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
      case 'mobile-sidebar':
        setCurrentModal('mobile-sidebar');
        break;
    }
    handleOpenModal();
  };

  const handleDeleteBoard = () => {
    dispatch(boardDeleted());
    handleCloseModal();
  };

  const deleteBoardDescription = `Are you sure you want to delete the ‘${board.name}’ board? This action will remove all columns and tasks and cannot be reversed.`;

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
              {board.name}
            </h2>

            <button
              className="md:hidden"
              onClick={() => openModal('mobile-sidebar')}
            >
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
            <Button
              version="secondary"
              disabled={board.statuses.length === 0}
              onClick={() => openModal('create-task')}
            >
              <MdAdd className="text-xl text-primaryWhite" />
              Add New Task
            </Button>
          )}

          <EllipsisMenu items={ellipsisMenuList} />
        </section>
      </header>
      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        {currentModal === 'mobile-sidebar' && (
          <MobileSidebar onCurrentModalChange={setCurrentModal} />
        )}
        {currentModal === 'create-task' && (
          <TaskModal type="add" title="Add New Task" />
        )}
        {currentModal === 'edit-board' && (
          <BoardModal type="edit" title="Edit Board" />
        )}
        {currentModal === 'delete-board' && (
          <DeleteModal
            title="Delete this board?"
            description={deleteBoardDescription}
            onDelete={handleDeleteBoard}
            onCancel={handleCloseModal}
          />
        )}
        {currentModal === 'create-board' && (
          <BoardModal type="add" title="Add New Board" />
        )}
      </Modal>
    </>
  );
};

export default Header;
