import { type FC } from 'react';

interface ToggleProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: FC<ToggleProps> = ({ onChange }) => (
  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      onChange={onChange}
      value=""
      className="peer sr-only"
    />
    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
  </label>
);

export default Toggle;
