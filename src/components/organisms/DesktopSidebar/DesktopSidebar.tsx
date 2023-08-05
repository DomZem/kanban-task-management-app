import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { boardAdded } from '@/store/slices/boardsSlice';
import { transformToKebabCase } from '@/utility';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff, IoMdMoon, IoMdSunny } from 'react-icons/io';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { NavLink, useLocation } from 'react-router-dom';

const DesktopSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const boards = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  return (
    <aside
      className={`flex flex-col justify-between border-r-[1px] border-primaryLinesDark bg-primaryDarkGrey duration-200 ${
        isActive ? 'w-64' : 'w-0'
      }`}
    >
      <section className="flex flex-col overflow-hidden">
        <h3 className="mb-5 ml-6 mt-5 text-xs font-bold uppercase tracking-[2.4px] text-primaryMediumGrey">
          all boards ({boards.length})
        </h3>
        <nav className="flex-1 overflow-y-auto overflow-x-hidden">
          {boards.map(({ name }) => (
            <NavLink
              className={`flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-4 font-bold text-primaryMediumGrey duration-200 ${
                pathname.substring(1) === transformToKebabCase(name) &&
                'bg-primaryPurple text-primaryWhite'
              }`}
              to={transformToKebabCase(name)}
              key={name}
            >
              <TbLayoutBoardSplit className="text-xl" />
              <p className="ml-3">{name}</p>
            </NavLink>
          ))}
        </nav>
        <button
          className="flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-4 font-bold text-primaryPurple duration-200"
          onClick={() =>
            dispatch(
              boardAdded({
                name: 'Random board',
                columns: [],
              })
            )
          }
        >
          <TbLayoutBoardSplit className="text-xl" />
          <p className="ml-3">+ Create New Board</p>
        </button>
      </section>
      <section>
        <div>{/* User photo | firstName LastName | Logout icon */}</div>
        <div className="ml-3 mr-3 flex items-center justify-center rounded-md bg-primaryVeryDarkGrey py-3">
          <div className="flex items-center gap-x-4">
            <IoMdSunny className="text-xl text-primaryMediumGrey" />
            {/* Toggle Swithc */}
            <IoMdMoon className="text-xl text-primaryMediumGrey" />
          </div>
        </div>
        <button
          className="mb-8 mt-8 flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-4 font-bold text-primaryMediumGrey duration-200 hover:bg-primaryVeryDarkGrey hover:text-primaryWhite"
          onClick={() => setIsActive(false)}
        >
          <IoMdEyeOff className="text-xl" />
          <p className="ml-3">Hide Sidebar</p>
        </button>
      </section>

      {!isActive && (
        <button
          className="fixed bottom-8 left-0 z-30 flex h-14 w-16 items-center justify-center rounded-r-[100px] bg-primaryPurple duration-200 hover:bg-primaryPurpleHover"
          onClick={() => setIsActive(true)}
        >
          <IoMdEye className="text-xl text-primaryWhite" />
        </button>
      )}
    </aside>
  );
};

export default DesktopSidebar;