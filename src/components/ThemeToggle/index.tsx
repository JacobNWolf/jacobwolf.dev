import { useCallback } from 'react';

import { Select } from '@base-ui-components/react/select';
import { useStore } from '@nanostores/react';
import { RiComputerLine, RiMoonLine, RiSunLine } from '@remixicon/react';
import clsx from 'clsx';

import { $theme } from '~/stores/themeStore';
import { Theme, type ThemeType } from '~/types/theme';

interface ThemeToggleProps {
  className?: string;
}

const themeItems = [
  { label: 'Light mode', value: Theme.LIGHT },
  { label: 'Dark mode', value: Theme.DARK },
  { label: 'System mode', value: Theme.SYSTEM },
];

const themeIcons: Record<ThemeType, React.JSX.Element> = {
  [Theme.LIGHT]: <RiSunLine className="w-4 h-4" />,
  [Theme.DARK]: <RiMoonLine className="w-4 h-4" />,
  [Theme.SYSTEM]: <RiComputerLine className="w-4 h-4" />,
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const theme = useStore($theme);

  const handleThemeChange = useCallback((value: ThemeType) => {
    $theme.set(value);
  }, []);

  const currentThemeLabel = themeItems.find((item) => item.value === theme)?.label || 'Unknown';
  const popupId = 'theme-toggle-popup';

  return (
    <Select.Root items={themeItems} value={theme} onValueChange={handleThemeChange}>
      <Select.Trigger
        aria-label={`Select theme, currently ${currentThemeLabel}`}
        aria-haspopup="listbox"
        aria-expanded={false}
        aria-controls={popupId}
        className={clsx(
          'inline-flex items-center justify-center h-9 w-9 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'bg-transparent text-primary-800',
          'hover:text-white hover:bg-accent',
          'dark:text-primary-200',
          'dark:hover:text-primary-900 dark:hover:bg-accent',
          className,
        )}
      >
        {themeIcons[theme]}
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={8}>
          <Select.Popup
            id={popupId}
            className="rounded-md border border-primary-300 bg-background py-1 shadow-lg dark:border-primary-700 dark:bg-background"
            role="listbox"
            aria-label="Theme options"
          >
            {themeItems.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="flex items-center justify-center h-10 w-10 mx-1 my-0.5 rounded-md transition-colors bg-transparent text-primary-800 hover:text-white hover:bg-accent dark:text-primary-200 dark:hover:text-primary-900 dark:hover:bg-accent cursor-pointer"
                role="option"
                aria-label={item.label}
                aria-selected={item.value === theme}
              >
                {themeIcons[item.value]}
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
};

export default ThemeToggle;
