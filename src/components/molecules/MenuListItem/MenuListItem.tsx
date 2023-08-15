import { type FC } from 'react';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

interface MenulistItemProps {
  value: string;
  link: string;
  isActive: boolean;
}

const MenuListItem: FC<MenulistItemProps> = ({ value, link, isActive }) => (
  <NavLink
    className={`flex w-60 cursor-pointer items-center rounded-r-[100px] bg-opacity-10 px-6 py-4 font-bold text-primaryMediumGrey duration-200 ${
      isActive
        ? 'bg-primaryPurple text-primaryWhite'
        : 'hover:bg-[#635FC7]/10 hover:text-primaryPurple hover:dark:bg-primaryWhite'
    }`}
    to={link}
    key={value}
  >
    <TbLayoutBoardSplit className="text-xl" />
    <p className="ml-3">{value}</p>
  </NavLink>
);

export default MenuListItem;
