/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-case-declarations */
import Input from '@/components/atoms/Input/Input';
import PrimaryButton from '@/components/atoms/PrimaryButton/PrimaryButton';
import InputRemoveField from '@/components/molecules/InputRemoveField/InputRemoveField';
import { useAppDispatch } from '@/hooks/storeHook';
import { boardAdded } from '@/store/slices/boardsSlice';
import { type IBoard } from '@/types';
import { Dialog } from '@headlessui/react';
import { type FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface CreateBoardModalProps {
  title: string;
  type: 'create';
}

interface EditBoardModalProps {
  title: string;
  type: 'edit';
  board: IBoard;
}

type BoardModalProps = CreateBoardModalProps | EditBoardModalProps;

interface BoardFormValues {
  title: string;
  columns: Array<{ title: string }>;
}

const BoardModal: FC<BoardModalProps> = (props) => {
  const dispatch = useAppDispatch();

  let initialColumns: Array<{ title: string }> = [{ title: '' }];

  if (props.type === 'edit') {
    const editProps = props as EditBoardModalProps;
    initialColumns = editProps.board.columns.map((columnTitle) => ({
      title: columnTitle,
    }));
  }

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<BoardFormValues>({
    defaultValues: {
      title: `${props.type === 'edit' ? props.board.name : ''}`,
      columns: initialColumns,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'columns',
    control,
  });

  // Send data to store
  const onSubmit = ({ columns, title }: BoardFormValues) => {
    const formColumns: string[] = [];
    columns.forEach(({ title }) => formColumns.push(title));

    switch (props.type) {
      case 'create':
        dispatch(boardAdded(title, formColumns));
        break;
      case 'edit':
        // Send edited data to store
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
          {props.title}
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
                  error={errors.columns?.[index]?.title}
                  onRemove={() => remove(index)}
                  {...register(`columns.${index}.title`, {
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
          + Add New Column
        </PrimaryButton>

        <PrimaryButton type="submit">
          {props.type === 'create' ? 'Create New Board' : 'Save changes'}
        </PrimaryButton>
      </Dialog.Panel>
    </div>
  );
};

export default BoardModal;
