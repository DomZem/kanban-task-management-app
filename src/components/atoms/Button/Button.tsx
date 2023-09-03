import React, { type ButtonHTMLAttributes, type FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  version?: 'primary' | 'secondary';
  color?: 'purple' | 'lightPurple' | 'red';
  className?: string;
}

const Button: FC<ButtonProps> = ({
  color = 'purple',
  version = 'primary',
  disabled,
  children,
  className,
  ...props
}) => (
  <button
    {...props}
    disabled={disabled}
    className={`
    ${
      version === 'primary'
        ? 'rounded-[20px] p-2 text-[13px] font-bold leading-[176.923%]'
        : 'heading-m flex items-center rounded-3xl px-6 py-[14px]'
    }
    ${
      color === 'purple'
        ? 'bg-primaryPurple text-primaryWhite hover:bg-primaryPurpleHover'
        : color === 'lightPurple'
        ? 'bg-primaryLightPurple text-primaryPurple hover:bg-primaryLightPurpleHover dark:bg-primaryWhite'
        : 'bg-primaryRed text-primaryWhite hover:bg-primaryRedHover'
    } outline-none duration-200 ${disabled && 'opacity-50'} ${className}`}
  >
    {children}
  </button>
);

export default Button;
