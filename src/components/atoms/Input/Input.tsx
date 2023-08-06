/* eslint-disable react/display-name */
import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`rounded border border-primaryBorder px-4 py-2 font-medium outline-none ${className}`}
        {...props}
      />
    );
  }
);

export default Input;
