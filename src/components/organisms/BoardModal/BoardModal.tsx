import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import InputRemoveField from '@/components/molecules/InputRemoveField/InputRemoveField';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { boardAdded, boardEdited } from '@/store/slices/boardsSlice';
import { type IStatus } from '@/types';
import { Dialog } from '@headlessui/react';
import { nanoid } from '@reduxjs/toolkit';
import { type FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface BoardModalProps {
  title: string;
  type: 'add' | 'edit';
}

interface BoardFormValues {
  title: string;
  statuses: IStatus[];
}

const BoardModal: FC<BoardModalProps> = ({ title, type }) => {
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) =>
    state.boards.find(({ isActive }) => isActive)
  );

  if (!board) {
    return <div>Something went wrong. Board not found!</div>;
  }

  const initialStatuses: IStatus[] =
    type === 'edit' ? board.statuses : [{ statusID: nanoid(), name: '' }];

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<BoardFormValues>({
    defaultValues: {
      title: `${type === 'edit' ? board.name : ''}`,
      statuses: initialStatuses,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'statuses',
    control,
  });

  // Send data to store
  const onSubmit = ({ title, statuses }: BoardFormValues) => {
    switch (type) {
      case 'add':
        dispatch(boardAdded(title, statuses));
        reset();
        break;
      case 'edit':
        dispatch(boardEdited({ name: title, statuses }));
        break;
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6 dark:bg-primaryDarkGrey"
      >
        <Dialog.Title className="text-lg font-bold dark:text-primaryWhite">
          {title}
        </Dialog.Title>

        <section>
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-primaryMediumGrey">
              Board Name
            </label>
            <Input
              placeholder="e.g Web Design"
              error={errors.title}
              {...register('title', { required: "Can't be empty" })}
            />
          </div>
        </section>

        <section>
          <p className="label mb-2">Board Columns</p>
          <ul className="flex flex-col gap-y-3">
            {fields.map((field, index) => (
              <li key={field.id}>
                <InputRemoveField
                  placeholder="e.g Todo"
                  error={errors.statuses?.[index]?.name}
                  onRemove={() => remove(index)}
                  {...register(`statuses.${index}.name`, {
                    required: "Can't be empty",
                  })}
                />
              </li>
            ))}
          </ul>
        </section>

        <Button
          type="button"
          color='lightPurple'
          onClick={() => append({ statusID: nanoid(), name: '' })}
        >
          + Add New Column
        </Button>

        <Button type="submit">
          {type === 'add' ? 'Create New Board' : 'Save changes'}
        </Button>
      </Dialog.Panel>
    </div>
  );
};

export default BoardModal;
