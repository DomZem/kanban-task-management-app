import { useRef, type FC } from 'react';
import { useHover } from 'usehooks-ts';

interface TaskProps {
  title: string;
  description: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const Task: FC<TaskProps> = ({ title, description, onClick }) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <li
      ref={hoverRef}
      className="cursor-pointer rounded-lg bg-primaryWhite px-4 py-6 shadow-task dark:bg-primaryDarkGrey"
      onClick={onClick}
    >
      <h4
        className={`mb-2 break-words ${
          isHover
            ? 'text-primaryPurple'
            : 'text-primaryBlack dark:text-primaryWhite'
        } text-base font-bold`}
      >
        {title}
      </h4>
      <p className="text-xs font-bold text-primaryMediumGrey">{description}</p>
    </li>
  );
};

export default Task;
