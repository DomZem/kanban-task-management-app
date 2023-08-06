import { type ButtonHTMLAttributes, type FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  version?: 'primary' | 'secondary' | 'destructive';
}

const Button: FC<ButtonProps> = ({
  version = 'primary',
  children,
  ...props
}) => (
  <button
    className={`${
      version === 'primary'
        ? 'bg-primaryPurple hover:bg-primaryPurpleHover'
        : 'bg-primaryRed hover:bg-primaryRedHover'
    } flex items-center gap-x-1 rounded-3xl px-5 py-3 font-medium text-primaryWhite duration-200`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
