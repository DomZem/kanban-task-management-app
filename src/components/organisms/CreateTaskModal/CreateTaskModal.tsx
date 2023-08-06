import Input from '@/components/atoms/Input/Input';
import PrimaryButton from '@/components/atoms/PrimaryButton/PrimaryButton';
import Select from '@/components/atoms/Select/Select';
import Textarea from '@/components/atoms/Textarea/Textarea';
import InputRemoveField from '@/components/molecules/InputRemoveField/InputRemoveField';
import { useAppSelector } from '@/hooks/storeHook';
import { transformToPascalCase } from '@/utility';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

interface NewBoardFormValues {
  title: string;
  description: string;
  subtasks: Array<{ title: string }>;
  status: string;
}

const CreateTaskModal = () => {
  const { pathname } = useLocation();
  const options = useAppSelector(
    (state) =>
      state.boards.find(
        (board) => board.name === transformToPascalCase(pathname)
      )?.columns
  );

  const [selected, setSelected] = useState(options[0]);

  const { register, control, handleSubmit } = useForm<NewBoardFormValues>({
    defaultValues: {
      title: '',
      description: '',
      subtasks: [{ title: '' }, { title: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'subtasks',
    control,
  });

  // Send data to store
  const onSubmit = (data: NewBoardFormValues) => {
    console.log(data);
  };

  return (
    <Dialog.Panel
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6"
    >
      <Dialog.Title className="text-lg font-bold">Add New Task</Dialog.Title>

      <section className="flex flex-col gap-y-2">
        <label className="label" htmlFor="title">
          Title
        </label>
        <Input placeholder="e.g Web Design" {...register('title')} />
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
                onRemove={() => remove(index)}
                {...register(`subtasks.${index}.title`)}
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
          options={options ?? ['Todo']}
          selected={selected}
          onChange={setSelected}
        />
      </section>

      <PrimaryButton type="submit">Create Task</PrimaryButton>
    </Dialog.Panel>
  );
};

export default CreateTaskModal;
