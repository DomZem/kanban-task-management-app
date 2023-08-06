import React, { type ButtonHTMLAttributes, type FC } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  version?: 'Purple' | 'LightPurple';
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  version = 'Purple',
  children,
  ...props
}) => (
  <button
    className={` ${
      version === 'Purple'
        ? 'bg-primaryPurple text-primaryWhite hover:bg-primaryPurpleHover'
        : 'hover:bg-primaryLightPurpleHover bg-primaryLightPurple text-primaryPurple'
    } rounded-[20px]  p-2 text-sm font-bold leading-6 duration-200`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;