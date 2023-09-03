import SubtaskListItem from '@/components/molecules/SubtaskListItem/SubtaskListItem';
import { type ISubtask } from '@/types';
import { type FC } from 'react';

interface SubtasksListProps {
  subtasks: ISubtask[];
}

const SubtasksList: FC<SubtasksListProps> = ({ subtasks }) => {
  const subtasksCount = subtasks.length;
  const completedSubtasksCount = subtasks.filter(
    (subtask: ISubtask) => subtask.isComplete
  ).length;

  return (
    <section>
      <p className="label">
        Subtasks ({completedSubtasksCount} of {subtasksCount})
      </p>
      <ul className="mt-4 flex flex-col gap-y-2">
        {subtasks.map((subtask: ISubtask) => (
          <SubtaskListItem subtask={subtask} key={subtask.subtaskID} />
        ))}
      </ul>
    </section>
  );
};

export default SubtasksList;
