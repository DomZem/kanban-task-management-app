import Toggle from '@/components/atoms/Toggle/Toggle';
import MenuListItem from '@/components/molecules/MenuListItem/MenuListItem';
import { useAppSelector } from '@/hooks/storeHook';
import useDarkMode from '@/hooks/useDarkMode';
import { transformToKebabCase } from '@/utility';
import { Dialog } from '@headlessui/react';
import { type FC } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import { type ModalType } from '../Header/Header';

interface MobileSidebarProps {
  onCurrentModalChange: React.Dispatch<React.SetStateAction<ModalType>>;
}

const MobileSidebar: FC<MobileSidebarProps> = ({ onCurrentModalChange }) => {
  const boards = useAppSelector((state) => state.boards);
  const { pathname } = useLocation();
  const toggleMode = useDarkMode();

  return (
    <div className="flex min-h-full justify-center p-4">
      <Dialog.Panel
        as="div"
        className="mt-[54px] w-full max-w-[264px] self-start rounded-md bg-primaryWhite shadow-elipsisMenu dark:bg-primaryDarkGrey"
      >
        <section className="flex flex-col overflow-hidden">
          <h3 className="mb-5 ml-6 mt-5 text-xs font-bold uppercase tracking-[2.4px] text-primaryMediumGrey">
            all boards ({boards.length})
          </h3>
          <nav className="flex-1 overflow-y-auto overflow-x-hidden">
            {boards.map(({ name }) => (
              <MenuListItem
                value={name}
                link={transformToKebabCase(name)}
                isActive={pathname.substring(1) === transformToKebabCase(name)}
                key={name}
              />
            ))}
          </nav>
          <button
            className="flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-4 font-bold text-primaryPurple duration-200"
            onClick={() => onCurrentModalChange('create-board')}
          >
            <TbLayoutBoardSplit className="text-xl" />
            <p className="ml-3">+ Create New Board</p>
          </button>
          <div className="m-4 flex items-center justify-center rounded-md bg-primaryLightGrey py-3 dark:bg-primaryVeryDarkGrey">
            <div className="flex items-center gap-x-4">
              <IoMdSunny className="text-xl text-primaryMediumGrey" />

              <Toggle isSidebarActive onChange={toggleMode} />

              <IoMdMoon className="text-xl text-primaryMediumGrey" />
            </div>
          </div>
        </section>
      </Dialog.Panel>
    </div>
  );
};

export default MobileSidebar;
