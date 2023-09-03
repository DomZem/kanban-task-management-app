/* eslint-disable react/display-name */
import React, { useState, type InputHTMLAttributes } from 'react';
import { type FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: FieldError | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div
        className={`body-l flex w-full rounded border ${
          isActive && !error ? 'border-primaryPurple' : 'border-primaryBorder'
        } ${
          error ? 'border-primaryRed' : 'hover:border-primaryPurple'
        } cursor-pointer px-4 py-2 duration-200`}
      >
        <input
          {...props}
          ref={ref}
          onBlur={() => setIsActive(false)}
          onFocus={() => setIsActive(true)}
          className={`flex-1 cursor-pointer outline-none dark:bg-primaryDarkGrey dark:text-primaryWhite ${className}`}
        />
        {error && <p className="min-w-fit text-primaryRed">{error.message}</p>}
      </div>
    );
  }
);

export default Input;
