import { useAppDispatch } from '@/hooks/storeHook';
import { subtaskEdited } from '@/store/slices/subtasksSlice';
import { type ISubtask } from '@/types';
import { type FC } from 'react';

interface SubtaskListItemProps {
  subtask: ISubtask;
}

const SubtaskListItem: FC<SubtaskListItemProps> = ({
  subtask: { subtaskID, title, isComplete, taskID },
}) => {
  const dispatch = useAppDispatch();

  return (
    <li className="flex items-center gap-x-4 rounded bg-primaryLightGrey p-3 duration-200 hover:bg-[#635FC7]/25 dark:bg-primaryVeryDarkGrey hover:dark:bg-[#635FC7]/25">
      <input
        type="checkbox"
        className="cursor-pointer text-primaryPurple checked:accent-current"
        id={subtaskID}
        checked={isComplete}
        onChange={() => {
          dispatch(
            subtaskEdited({
              subtaskID,
              title,
              isComplete: !isComplete,
              taskID,
            })
          );
        }}
      />
      <label
        htmlFor={subtaskID}
        className={`relative cursor-pointer text-xs font-bold text-primaryBlack duration-200 dark:text-primaryWhite ${
          isComplete && 'text-[#000112] line-through opacity-50'
        }`}
      >
        {title}
      </label>
    </li>
  );
};

export default SubtaskListItem;
