import { type FC } from 'react';
import { TbLayoutBoardSplit } from 'react-icons/tb';

interface MenulistItemProps {
  value: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MenuListItem: FC<MenulistItemProps> = ({ value, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-60 cursor-pointer items-center rounded-r-[100px] bg-opacity-10 px-6 py-4 font-bold text-primaryMediumGrey duration-200 ${
      isActive
        ? 'bg-primaryPurple text-primaryWhite'
        : 'hover:bg-[#635FC7]/10 hover:text-primaryPurple hover:dark:bg-primaryWhite'
    }`}
  >
    <TbLayoutBoardSplit className="text-xl" />
    <p className="ml-3">{value}</p>
  </button>
);

export default MenuListItem;
