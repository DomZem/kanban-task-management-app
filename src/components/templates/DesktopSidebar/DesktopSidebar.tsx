import ThemeSwitcher from '@/components/molecules/ThemeSwitcher/ThemeSwitcher';
import MenusList from '@/components/organisms/MenusList/MenusList';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const DesktopSidebar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <aside
        className={`border-primaryLinesLight bg-primaryWhite transition-[width] duration-200 ease-in-out dark:border-primaryLinesDark dark:bg-primaryDarkGrey ${
          isActive
            ? 'w-sidebarTabletWidth border-r-[1px] lg:w-sidebarDesktopWidth'
            : 'w-0'
        }`}
      >
        <div className="flex h-full flex-col justify-between pr-6 pt-8">
          <MenusList />
          <section>
            <div className="pl-6">
              <ThemeSwitcher isSidebarActive={isActive} />
            </div>

            <button
              className="mb-8 mt-2 flex w-full cursor-pointer items-center rounded-r-[100px] px-6 py-3.5 font-bold text-primaryMediumGrey duration-200 hover:bg-[#635FC7]/10 hover:text-primaryPurple hover:dark:bg-primaryWhite"
              onClick={() => setIsActive(false)}
            >
              <IoMdEyeOff className="text-xl" />
              <p className="heading-m ml-3">Hide Sidebar</p>
            </button>
          </section>
        </div>
      </aside>

      {!isActive && (
        <button
          className="fixed bottom-8 left-0 z-30 flex h-12 w-14 items-center justify-center rounded-r-[100px] bg-primaryPurple duration-200 hover:bg-primaryPurpleHover"
          onClick={() => setIsActive(true)}
        >
          <IoMdEye className="text-xl text-primaryWhite" />
        </button>
      )}
    </>
  );
};

export default DesktopSidebar;
