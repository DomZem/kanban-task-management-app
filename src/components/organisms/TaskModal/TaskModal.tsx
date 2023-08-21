import Input from '@/components/atoms/Input/Input';
import PrimaryButton from '@/components/atoms/PrimaryButton/PrimaryButton';
import Select from '@/components/atoms/Select/Select';
import Textarea from '@/components/atoms/Textarea/Textarea';
import InputRemoveField from '@/components/molecules/InputRemoveField/InputRemoveField';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { subtaskAdded } from '@/store/slices/subtasksSlice';
import { taskAdded } from '@/store/slices/tasksSlice';
import { type ITask } from '@/types';
import { Dialog } from '@headlessui/react';
import { nanoid } from '@reduxjs/toolkit';
import { useState, type FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface CreateTaskModalProps {
  title: string;
  type: 'create';
}

interface EditTaskModalProps {
  title: string;
  type: 'edit';
  task: ITask;
}

type TaskModalProps = CreateTaskModalProps | EditTaskModalProps;

interface TaskFormValues {
  title: string;
  description: string;
  subtasks: Array<{ title: string }>;
}

const TaskModal: FC<TaskModalProps> = (props) => {
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find(({ isActive }) => isActive)
  );

  if (!board) {
    return null;
  }

  const columns = board.columns;

  const initialselectedStatus =
    props.type === 'edit'
      ? columns.find((column) => column === props.task.status) ?? columns[0]
      : columns[0];

  const [selectedStatus, setSelectedStatus] = useState(initialselectedStatus);

  let initialSubtasks: Array<{ title: string }> = [{ title: '' }];

  if (props.type === 'edit') {
    const { task } = props;
    initialSubtasks = useAppSelector((state) =>
      state.subtasks.filter((subtask) => subtask.taskID === task.taskID)
    );
  }

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
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
    // We need to create taskID there, because next we will be use it to create subtask. That's why we don't create taskID inside reducer.
    const taskID = nanoid();

    // Send task to store
    dispatch(
      taskAdded(taskID, title, description, selectedStatus, board.boardID)
    );

    // Send subtasks to store
    subtasks.forEach(({ title }) => {
      dispatch(subtaskAdded(title, taskID));
    });
  };

  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6 dark:bg-primaryDarkGrey"
      >
        <Dialog.Title className="text-lg font-bold dark:text-primaryWhite">
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

        <PrimaryButton
          type="button"
          version="LightPurple"
          onClick={() => append({ title: '' })}
        >
          + Add New Subtask
        </PrimaryButton>

        <section>
          <label className="label" htmlFor="status">
            Status
          </label>
          <Select
            options={columns}
            selected={selectedStatus}
            onChange={setSelectedStatus}
          />
        </section>

        <PrimaryButton type="submit">
          {props.type === 'create' ? 'Create Task' : 'Save Changes'}
        </PrimaryButton>
      </Dialog.Panel>
    </div>
  );
};

export default TaskModal;
