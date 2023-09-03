import { type FC } from 'react';

interface ToggleProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSidebarActive?: boolean;
}

const Toggle: FC<ToggleProps> = ({ isChecked, onChange, isSidebarActive }) => (
  <label
    className={`${
      isSidebarActive ? 'visible' : 'hidden'
    } relative cursor-pointer items-center`}
  >
    <input
      type="checkbox"
      className="peer sr-only"
      checked={isChecked}
      onChange={onChange}
    />
    <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primaryPurple peer-checked:after:translate-x-full  dark:bg-gray-700 "></div>
  </label>
);

export default Toggle;
