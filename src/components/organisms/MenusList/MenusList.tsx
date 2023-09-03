import MenusListItem from '@/components/molecules/MenusListItem/MenusListItem';
import BoardModal from '@/components/organisms/BoardModal/BoardModal';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { boardActivated } from '@/store/slices/boardsSlice';
import { TbLayoutBoardSplit } from 'react-icons/tb';

const MenusList = () => {
  const dispatch = useAppDispatch();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const boards = useAppSelector((state) => state.boards);

  return (
    <>
      <section className="flex flex-col overflow-hidden">
        <h3 className="mb-[19px] ml-6 text-[12px] font-bold uppercase leading-normal tracking-[2.4px] text-primaryMediumGrey">
          all boards ({boards.length})
        </h3>
        <nav className="flex-1 overflow-y-auto overflow-x-hidden">
          {boards.map(({ boardID, name, isActive }) => (
            <MenusListItem
              value={name}
              isActive={isActive}
              key={name}
              onClick={() => dispatch(boardActivated({ boardID }))}
            />
          ))}
        </nav>
        <button
          className="flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-3.5 text-primaryPurple duration-200"
          onClick={handleOpenModal}
        >
          <TbLayoutBoardSplit className="text-xl" />
          <p className="heading-m ml-3">+ Create New Board</p>
        </button>
      </section>
      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        <BoardModal type="add" title="Add New Board" />
      </Modal>
    </>
  );
};

export default MenusList;
