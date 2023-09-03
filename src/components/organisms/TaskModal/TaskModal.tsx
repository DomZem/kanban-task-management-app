import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Select from '@/components/atoms/Select/Select';
import Textarea from '@/components/atoms/Textarea/Textarea';
import InputRemoveField from '@/components/molecules/InputRemoveField/InputRemoveField';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import {
  selectSubtasksByTaskID,
  subtaskAdded,
  subtaskDeleted,
  subtaskEdited,
} from '@/store/slices/subtasksSlice';
import { taskAdded, taskEdited } from '@/store/slices/tasksSlice';
import { type ISubtask, type ITask } from '@/types';
import { Dialog } from '@headlessui/react';
import { nanoid } from '@reduxjs/toolkit';
import { useState, type FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface TaskAddModalProps {
  title: string;
  type: 'add';
}

interface TaskEditModalProps {
  title: string;
  type: 'edit';
  task: ITask;
}

type TaskModalProps = TaskAddModalProps | TaskEditModalProps;

interface TaskFormValues {
  title: string;
  description: string;
  subtasks: ISubtask[];
}

const TaskModal: FC<TaskModalProps> = (props) => {
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find(({ isActive }) => isActive)
  );

  if (!board) {
    return <div>Something went wrong. Board not found!</div>;
  }

  const statuses = board.statuses;

  let initialSelectedStatus = statuses[0];

  if (props.type === 'edit') {
    initialSelectedStatus =
      board.statuses.find(
        (status) => status.statusID === props.task.statusID
      ) ?? statuses[0];
  }
  const [selectedStatus, setSelectedStatus] = useState(initialSelectedStatus);

  let initialSubtasks: ISubtask[] = [
    { subtaskID: nanoid(), title: '', isComplete: false, taskID: '' },
  ];

  if (props.type === 'edit') {
    initialSubtasks = useAppSelector((state) =>
      selectSubtasksByTaskID(state, props.task.taskID)
    );
  }

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: `${props.type === 'edit' ? props.task.title : ''}`,
      description: `${props.type === 'edit' ? props.task.description : ''}`,
      subtasks: initialSubtasks,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'subtasks',
    control,
  });

  const onSubmit = ({ title, description, subtasks }: TaskFormValues) => {
    if (props.type === 'add') {
      // We need to create taskID there, because next we will be use it to create subtask. That's why we don't create taskID inside reducer.
      const taskID = nanoid();

      // Send task to store
      dispatch(
        taskAdded({
          taskID,
          title,
          description,
          statusID: selectedStatus.statusID,
          boardID: board.boardID,
        })
      );

      // Send subtasks to store
      subtasks.forEach((subtask) => {
        dispatch(subtaskAdded({ ...subtask, taskID }));
      });

      // Clear form fields
      reset();
    } else if (props.type === 'edit') {
      // Send edited task data to store
      dispatch(
        taskEdited({
          ...props.task,
          title,
          description,
          statusID: selectedStatus.statusID,
        })
      );

      // Subtasks to add which are different than initial
      const subtasksToAdd = subtasks.filter(
        ({ subtaskID: id1 }) =>
          !initialSubtasks.some(({ subtaskID: id2 }) => id2 === id1)
      );

      subtasksToAdd.forEach((subtask) =>
        dispatch(subtaskAdded({ ...subtask, taskID: props.task.taskID }))
      );

      // Subtasks to delete which are different than initial
      const subtasksToDelete = initialSubtasks.filter(
        ({ subtaskID: id1 }) =>
          !subtasks.some(({ subtaskID: id2 }) => id2 === id1)
      );

      subtasksToDelete.forEach((subtask) => dispatch(subtaskDeleted(subtask)));

      // The rest of subtasks to update
      const subtasksToEdit = subtasks.filter(
        ({ subtaskID: id1 }) =>
          !subtasksToDelete.some(({ subtaskID: id2 }) => id2 === id1)
      );

      subtasksToEdit.forEach((subtask) => dispatch(subtaskEdited(subtask)));
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6 dark:bg-primaryDarkGrey"
      >
        <Dialog.Title className="heading-l dark:text-primaryWhite">
          {props.title}
        </Dialog.Title>

        <section className="flex flex-col gap-y-2">
          <label className="label" htmlFor="title">
            Title
          </label>
          <Input
            placeholder="e.g Web Design"
            error={errors.title}
            {...register('title', { required: "Can't be empty" })}
          />
        </section>

        <section className="flex flex-col gap-y-2">
          <label className="label" htmlFor="description">
            Description
          </label>
          <Textarea
            className="w-full"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
            {...register('description')}
          />
        </section>

        <section>
          <p className="label mb-2">Subtasks</p>
          <ul className="flex flex-col gap-y-3">
            {fields.map((field, index) => (
              <li key={field.id}>
                <InputRemoveField
                  placeholder="e.g Make coffee"
                  error={errors.subtasks?.[index]?.title}
                  onRemove={() => remove(index)}
                  {...register(`subtasks.${index}.title`, {
                    required: "Can't be empty",
                  })}
                />
              </li>
            ))}
          </ul>
        </section>

        <Button
          type="button"
          color="lightPurple"
          onClick={() =>
            append({
              subtaskID: nanoid(),
              title: '',
              isComplete: false,
              taskID: '',
            })
          }
        >
          + Add New Subtask
        </Button>

        <section>
          <label className="label" htmlFor="status">
            Status
          </label>
          <Select
            options={statuses}
            selected={selectedStatus}
            onChange={setSelectedStatus}
          />
        </section>

        <Button type="submit">
          {props.type === 'add' ? 'Create Task' : 'Save Changes'}
        </Button>
      </Dialog.Panel>
    </div>
  );
};

export default TaskModal;
