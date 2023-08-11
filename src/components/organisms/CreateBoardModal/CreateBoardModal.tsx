import Input from '@/components/atoms/Input/Input';
import PrimaryButton from '@/components/atoms/PrimaryButton/PrimaryButton';
import InputRemoveField from '@/components/molecules/InputRemoveField/InputRemoveField';
import { useAppDispatch } from '@/hooks/storeHook';
import { boardAdded } from '@/store/slices/boardsSlice';
import { Dialog } from '@headlessui/react';
import { useFieldArray, useForm } from 'react-hook-form';

interface NewBoardFormValues {
  title: string;
  columns: Array<{ title: string }>;
}

const CreateBoardModal = () => {
  const dispatch = useAppDispatch();

  const { register, control, handleSubmit } = useForm<NewBoardFormValues>({
    defaultValues: {
      title: '',
      columns: [{ title: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'columns',
    control,
  });

  // Send data to store
  const onSubmit = (data: NewBoardFormValues) => {
    const columns: string[] = [];
    data.columns.forEach((column) => columns.push(column.title));
    dispatch(boardAdded(data.title, columns));
  };

  return (
    <Dialog.Panel
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6 dark:bg-primaryDarkGrey"
    >
      <Dialog.Title className="text-lg font-bold dark:text-primaryWhite">
        Add New Board
      </Dialog.Title>

      <section>
        <div className="flex flex-col gap-y-2">
          <label className="text-xs font-bold text-primaryMediumGrey">
            Board Name
          </label>
          <Input placeholder="e.g Web Design" {...register('title')} />
        </div>
      </section>

      <section>
        <p className="label mb-2">Board Columns</p>
        <ul className="flex flex-col gap-y-3">
          {fields.map((field, index) => (
            <li key={field.id}>
              <InputRemoveField
                placeholder="e.g Todo"
                onRemove={() => remove(index)}
                {...register(`columns.${index}.title`)}
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

      <PrimaryButton type="submit">Create New Board</PrimaryButton>
    </Dialog.Panel>
  );
};

export default CreateBoardModal;
