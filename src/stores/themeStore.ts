import { persistentAtom } from '@nanostores/persistent';

import { Theme, type ThemeType } from '~/types/theme';

const $theme = persistentAtom<ThemeType>('theme', Theme.SYSTEM, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export { $theme };
