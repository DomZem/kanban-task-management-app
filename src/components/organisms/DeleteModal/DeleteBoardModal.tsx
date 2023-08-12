import PrimaryButton from '@/components/atoms/PrimaryButton/PrimaryButton';
import { Dialog } from '@headlessui/react';
import { type FC } from 'react';

interface DeleteModalProps {
  title: string;
  description: string;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  title,
  description,
  onDelete,
  onCancel,
}) => (
  <Dialog.Panel
    as="div"
    className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6 dark:bg-primaryDarkGrey"
  >
    <Dialog.Title className="text-lg font-bold text-primaryRed">
      {title}
    </Dialog.Title>

    <Dialog.Description className="text-sm font-medium leading-6 text-primaryMediumGrey">
      {description}
    </Dialog.Description>

    <section className="flex gap-x-4">
      <PrimaryButton className="flex-1" version="Red" onClick={onDelete}>
        Delete
      </PrimaryButton>
      <PrimaryButton
        version="LightPurple"
        className="flex-1"
        onClick={onCancel}
      >
        Cancel
      </PrimaryButton>
    </section>
  </Dialog.Panel>
);

export default DeleteModal;
