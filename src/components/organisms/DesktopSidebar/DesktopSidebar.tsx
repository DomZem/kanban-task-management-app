import Toggle from '@/components/atoms/Toggle/Toggle';
import MenuListItem from '@/components/molecules/MenuListItem/MenuListItem';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import useDarkMode from '@/hooks/useDarkMode';
import { boardActivated } from '@/store/slices/boardsSlice';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff, IoMdMoon, IoMdSunny } from 'react-icons/io';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import BoardModal from '../BoardModal/BoardModal';

const DesktopSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const boards = useAppSelector((state) => state.boards);
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const dispatch = useAppDispatch();
  const toggleMode = useDarkMode();

  return (
    <>
      <aside
        className={`flex flex-col justify-between border-primaryLinesLight bg-primaryWhite transition-[width] duration-200 ease-in-out dark:border-primaryLinesDark dark:bg-primaryDarkGrey ${
          isActive ? 'w-64 border-r-[1px]' : 'w-0'
        }`}
      >
        <section className="flex flex-col overflow-hidden">
          <h3 className="mb-5 ml-6 mt-5 text-xs font-bold uppercase tracking-[2.4px] text-primaryMediumGrey">
            all boards ({boards.length})
          </h3>
          <nav className="flex-1 overflow-y-auto overflow-x-hidden">
            {boards.map(({ boardID, name, isActive }) => (
              <MenuListItem
                value={name}
                isActive={isActive}
                key={name}
                onClick={() => dispatch(boardActivated({ boardID }))}
              />
            ))}
          </nav>
          <button
            className="flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-4 font-bold text-primaryPurple duration-200"
            onClick={handleOpenModal}
          >
            <TbLayoutBoardSplit className="text-xl" />
            <p className="ml-3">+ Create New Board</p>
          </button>
        </section>
        <section>
          <div>{/* User photo | firstName LastName | Logout icon */}</div>
          <div className="ml-3 mr-3 flex items-center justify-center rounded-md bg-primaryLightGrey py-3 dark:bg-primaryVeryDarkGrey">
            <div className="flex items-center gap-x-4">
              <IoMdSunny className="text-xl text-primaryMediumGrey" />

              <Toggle isSidebarActive={isActive} onChange={toggleMode} />

              <IoMdMoon className="text-xl text-primaryMediumGrey" />
            </div>
          </div>
          <button
            className="mb-8 mt-8 flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-4 font-bold text-primaryMediumGrey duration-200 hover:bg-[#635FC7]/10 hover:text-primaryPurple hover:dark:bg-primaryWhite"
            onClick={() => setIsActive(false)}
          >
            <IoMdEyeOff className="text-xl" />
            <p className="ml-3">Hide Sidebar</p>
          </button>
        </section>
      </aside>

      {!isActive && (
        <button
          className="fixed bottom-8 left-0 z-30 flex h-14 w-16 items-center justify-center rounded-r-[100px] bg-primaryPurple duration-200 hover:bg-primaryPurpleHover"
          onClick={() => setIsActive(true)}
        >
          <IoMdEye className="text-xl text-primaryWhite" />
        </button>
      )}

      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        <BoardModal type="create" title="Add New Board" />
      </Modal>
    </>
  );
};

export default DesktopSidebar;
