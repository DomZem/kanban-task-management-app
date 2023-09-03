import Button from '@/components/atoms/Button/Button';
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
  <div className="flex min-h-full items-center justify-center p-4">
    <Dialog.Panel
      as="div"
      className="flex w-full max-w-lg flex-col gap-y-6 rounded-md bg-primaryWhite p-6 dark:bg-primaryDarkGrey"
    >
      <Dialog.Title className="heading-l text-primaryRed">{title}</Dialog.Title>

      <Dialog.Description className="body-l text-primaryMediumGrey">
        {description}
      </Dialog.Description>

      <section className="flex gap-x-4">
        <Button className="flex-1" color="red" onClick={onDelete}>
          Delete
        </Button>
        <Button className="flex-1" color="lightPurple" onClick={onCancel}>
          Cancel
        </Button>
      </section>
    </Dialog.Panel>
  </div>
);

export default DeleteModal;
