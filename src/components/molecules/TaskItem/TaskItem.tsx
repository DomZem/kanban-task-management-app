import { type FC } from 'react';

interface TaskProps {
  title: string;
  description: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const Task: FC<TaskProps> = ({ title, description, onClick }) => (
  <li
    className="cursor-pointer rounded-lg bg-primaryWhite px-4 py-6 shadow-task dark:bg-primaryDarkGrey"
    onClick={onClick}
  >
    <h4 className="mb-2 break-words text-base font-bold text-primaryBlack dark:text-primaryWhite">
      {title}
    </h4>
    <p className="text-xs font-bold text-primaryMediumGrey">{description}</p>
  </li>
);

export default Task;
