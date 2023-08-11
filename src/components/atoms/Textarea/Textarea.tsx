import React, { type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`resize-none rounded border border-primaryBorder px-4 py-2 pb-9 font-medium outline-none dark:bg-primaryDarkGrey dark:text-primaryWhite ${className}`}
        {...props}
      />
    );
  }
);
export default Textarea;
