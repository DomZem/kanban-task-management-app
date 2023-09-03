import { useDraggable } from '@dnd-kit/core';
import { type FC } from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { useMediaQuery } from 'usehooks-ts';

interface TaskListItemProps {
  taskID: string;
  title: string;
  description: string;
  onClick: () => void;
}

const TaskListItem: FC<TaskListItemProps> = ({
  taskID,
  title,
  description,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: taskID,
  });

  const desktopMatches = useMediaQuery('(min-width: 1024px)');

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
      }
    : undefined;

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      className="relative cursor-pointer rounded-lg bg-primaryWhite px-4 py-[23px] shadow-task outline-none transition-shadow duration-200 hover:shadow-taskHover dark:bg-primaryDarkGrey"
      style={style}
      onClick={onClick}
    >
      {desktopMatches && (
        <button
          className={`absolute right-0 top-0 -translate-x-1/2 translate-y-1/2 p-0.5 ${
            transform ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          {...listeners}
        >
          <MdDragIndicator className="text-base" />
        </button>
      )}

      <h4 className="heading-m mb-2 break-words text-primaryBlack dark:text-primaryWhite">
        {title}
      </h4>
      <p className="body-m text-primaryMediumGrey">{description}</p>
    </li>
  );
};

export default TaskListItem;
