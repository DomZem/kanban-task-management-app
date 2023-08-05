/* eslint-disable react/display-name */
import Input from '@/components/atoms/Input/Input';
import React, { type InputHTMLAttributes } from 'react';
import { MdClose } from 'react-icons/md';

interface InputRemoveFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const InputRemoveField = React.forwardRef<
  HTMLInputElement,
  InputRemoveFieldProps
>(({ onRemove, ...props }, ref) => {
  return (
    <div className="flex">
      <Input ref={ref} className="flex-1" {...props} />

      <button className="p-2 pr-0" type="button" onClick={onRemove}>
        <MdClose className="text-2xl text-primaryMediumGrey" />
      </button>
    </div>
  );
});

export default InputRemoveField;
