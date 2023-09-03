import Toggle from '@/components/atoms/Toggle/Toggle';
import useDarkMode from '@/hooks/useDarkMode';
import { type FC } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

interface ThemeSwitcherProps {
  isSidebarActive?: boolean;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ isSidebarActive = true }) => {
  const { toggleMode, colorTheme } = useDarkMode();

  return (
    <div className="flex items-center justify-center rounded-md bg-primaryLightGrey py-3 dark:bg-primaryVeryDarkGrey">
      <div className="flex items-center gap-x-4">
        <IoMdSunny className="text-xl text-primaryMediumGrey" />

        <Toggle
          isSidebarActive={isSidebarActive}
          isChecked={colorTheme === 'light'}
          onChange={toggleMode}
        />

        <IoMdMoon className="text-xl text-primaryMediumGrey" />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
