/* eslint-disable react/display-name */
import Input from '@/components/atoms/Input/Input';
import React, { type InputHTMLAttributes } from 'react';
import { type FieldError } from 'react-hook-form';
import { MdClose } from 'react-icons/md';

interface InputRemoveFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  error?: FieldError | undefined;
}

const InputRemoveField = React.forwardRef<
  HTMLInputElement,
  InputRemoveFieldProps
>(({ onRemove, error, ...props }, ref) => {
  return (
    <div className="flex">
      <Input ref={ref} error={error} className="flex-1" {...props} />

      <button className="p-2 pr-0" type="button" onClick={onRemove}>
        <MdClose className="text-2xl text-primaryMediumGrey duration-200 hover:text-primaryRed" />
      </button>
    </div>
  );
});

export default InputRemoveField;
