import { type FC } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'secondary' | 'destructive';
}

const Button: FC<ButtonProps> = ({ children, type = 'primary' }) => (
  <button
    className={`${
      type === 'primary'
        ? 'bg-primaryPurple hover:bg-primaryPurpleHover'
        : 'bg-primaryRed hover:bg-primaryRedHover'
    } flex items-center gap-x-1 rounded-3xl px-5 py-3 font-medium text-primaryWhite duration-200`}
  >
    {children}
  </button>
);

export default Button;
