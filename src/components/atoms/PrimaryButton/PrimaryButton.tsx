import React, { type ButtonHTMLAttributes, type FC } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  version?: 'Purple' | 'LightPurple' | 'Red';
  className?: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  version = 'Purple',
  children,
  className,
  ...props
}) => (
  <button
    className={` ${
      version === 'Purple'
        ? 'bg-primaryPurple text-primaryWhite hover:bg-primaryPurpleHover'
        : version === 'LightPurple'
        ? 'bg-primaryLightPurple text-primaryPurple hover:bg-primaryLightPurpleHover dark:bg-primaryWhite'
        : 'bg-primaryRed text-primaryWhite hover:bg-primaryRedHover'
    } rounded-[20px]  p-2 text-sm font-bold leading-6 duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;
