import { useCallback } from 'react';

import { Select } from '@base-ui-components/react/select';
import { useStore } from '@nanostores/react';
import { RiComputerLine, RiMoonLine, RiSunLine } from '@remixicon/react';

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

  return (
    <Select.Root items={themeItems} value={theme} onValueChange={handleThemeChange}>
      <Select.Trigger
        aria-label="Theme select"
        className={`flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-1 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-800 ${className || ''}`}
      >
        {themeIcons[theme]}
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={8}>
          <Select.Popup className="rounded-md border border-gray-200 bg-gray-50 py-1">
            {themeItems.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="flex items-center justify-center p-2 hover:bg-gray-100"
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
