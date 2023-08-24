/* eslint-disable react/display-name */
import React, { type InputHTMLAttributes } from 'react';
import { type FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: FieldError | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div
        className={`flex w-full rounded border ${
          error && 'border-primaryRed'
        } border-primaryBorder px-4 py-2 duration-200`}
      >
        <input
          {...props}
          ref={ref}
          className={`flex-1 font-medium outline-none dark:bg-primaryDarkGrey dark:text-primaryWhite ${className}`}
        />
        {error && <p className="min-w-fit text-primaryRed">{error.message}</p>}
      </div>
    );
  }
);

export default Input;
