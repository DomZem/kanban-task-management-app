import { type FC } from 'react';
import { TbLayoutBoardSplit } from 'react-icons/tb';

interface MenusListItemProps {
  value: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MenusListItem: FC<MenusListItemProps> = ({
  value,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex w-full cursor-pointer items-center rounded-r-[100px] bg-opacity-10 px-6 py-3.5 font-bold text-primaryMediumGrey outline-none duration-200 ${
      isActive
        ? 'bg-primaryPurple text-primaryWhite'
        : 'hover:bg-[#635FC7]/10 hover:text-primaryPurple hover:dark:bg-primaryWhite'
    }`}
  >
    <TbLayoutBoardSplit className="text-xl" />
    <p className="heading-m ml-3">{value}</p>
  </button>
);

export default MenusListItem;
