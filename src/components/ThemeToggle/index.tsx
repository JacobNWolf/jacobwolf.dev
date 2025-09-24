import { useCallback } from 'react';

import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup } from '@base-ui-components/react/toggle-group';
import { useStore } from '@nanostores/react';
import { RiComputerLine, RiMoonLine, RiSunLine } from '@remixicon/react';

import { $theme } from '~/stores/themeStore';
import { Theme, type ThemeType } from '~/types/theme';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const theme = useStore($theme);

  const handleThemeChange = useCallback((value: ThemeType) => {
    $theme.set(value);
  }, []);

  return (
    <ToggleGroup
      typeof="single"
      value={[theme]}
      onValueChange={(values) => handleThemeChange(values[0] as ThemeType)}
      className={`flex gap-px rounded-md border border-gray-200 bg-gray-50 p-0.5 ${className ?? ''}`}
    >
      <Toggle
        aria-label="Light mode"
        value={Theme.LIGHT}
        disabled={theme === Theme.LIGHT}
        className="flex w-8 h-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <RiSunLine className="w-4 h-4" />
      </Toggle>
      <Toggle
        aria-label="Dark mode"
        value={Theme.DARK}
        disabled={theme === Theme.DARK}
        className="flex w-8 h-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <RiMoonLine className="w-4 h-4" />
      </Toggle>
      <Toggle
        aria-label="System mode"
        value={Theme.SYSTEM}
        disabled={theme === Theme.SYSTEM}
        className="flex w-8 h-8 items-center justify-center rounded-sm text-gray-600 dark:text-white dark:bg-gray-600 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <RiComputerLine className="w-4 h-4" />
      </Toggle>
    </ToggleGroup>
  );
};

export default ThemeToggle;
