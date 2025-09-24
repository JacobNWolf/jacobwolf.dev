enum Theme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeType = (typeof Theme)[keyof typeof Theme];

export { Theme, type ThemeType };
