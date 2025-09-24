import type * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { defaultTo, last } from 'es-toolkit/compat';

export type FontSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';
export type FontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type Token = `font-${FontWeight}/text/${FontSize}`;

export enum TailwindColor {
  red = 'red',
  orange = 'orange',
  amber = 'amber',
  yellow = 'yellow',
  lime = 'lime',
  green = 'green',
  emerald = 'emerald',
  teal = 'teal',
  cyan = 'cyan',
  sky = 'sky',
  blue = 'blue',
  indigo = 'indigo',
  violet = 'violet',
  purple = 'purple',
  fuchsia = 'fuchsia',
  pink = 'pink',
  rose = 'rose',
  slate = 'slate',
  gray = 'gray',
  zinc = 'zinc',
  neutral = 'neutral',
  stone = 'stone',
}

const colorAlias = new Map<string, TailwindColor>([
  ['primary', TailwindColor.zinc],
  ['secondary', TailwindColor.neutral],
]);

export type TailwindColorType = keyof typeof TailwindColor;

export const FONT_SIZE_MAP: Record<FontSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

export const WEIGHT_MAP: Record<FontWeight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

const typography = cva('', {
  variants: {
    size: FONT_SIZE_MAP,
    weight: WEIGHT_MAP,
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
  },
});

/**
 * Extracts font size and weight from a token string.
 *
 * Expected token format: "font-normal/text/xs"
 *   - The first segment is "font-<weight>" (e.g., "font-normal")
 *   - The last segment is the font size (e.g., "xs")
 *
 * @param token - A token string defining font weight and size.
 * @returns An object containing the extracted size and weight.
 */
const propsByToken = (token: string): { size: FontSize; weight: FontWeight } => {
  const segments = token.split('/');
  const weightParts = segments[0].split('-');
  const weightSegment = weightParts[1] || 'normal';
  const sizeSegment = defaultTo(last(segments), 'base') as FontSize;
  return { size: sizeSegment, weight: weightSegment as FontWeight };
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typography> {
  as?: React.ElementType;
  /**
   * Light mode Tailwind color. If an alias is provided,
   * use "primary" (maps to zinc) or "secondary" (maps to neutral).
   */
  color?: TailwindColorType | 'primary' | 'secondary';
  colorWeight?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  token?: Token;
  /**
   * Optional dark mode Tailwind color.
   */
  darkColor?: TailwindColorType | 'primary' | 'secondary';
  /**
   * Optional dark mode color weight. Defaults to the regular color weight.
   */
  darkColorWeight?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

/**
 * Typography component renders text elements with dynamic styling based on tokens or explicit props.
 *
 * Supports separate settings for light and dark modes.
 *
 * @param {TypographyProps} props - The props for the Typography component.
 * @param {React.ElementType} [props.as="p"] - The HTML element type to render.
 * @param {FontSize} [props.size="base"] - The font size.
 * @param {FontWeight} [props.weight="normal"] - The font weight.
 * @param {Token} [props.token] - A token string in the format "font-normal/text/xs" that sets size and weight.
 * @param {TailwindColor | "primary" | "secondary"} [props.color] - Tailwind color name for light mode.
 * @param {number|string} [props.colorWeight=900] - Tailwind color weight for light mode.
 * @param {TailwindColor} [props.darkColor] - Optional Tailwind color name for dark mode.
 * @param {number|string} [props.darkColorWeight] - Optional Tailwind color weight for dark mode.
 * @param {string} [props.className] - Additional class names.
 * @returns A JSX element displaying styled text.
 */
export const Typography: React.FC<TypographyProps> = ({
  as,
  size,
  weight,
  token,
  color,
  colorWeight = 900,
  darkColor,
  darkColorWeight,
  className,
  children,
  ...props
}) => {
  const Component = as || 'p';

  let tokenProps: { size: FontSize; weight: FontWeight };
  if (token) {
    tokenProps = propsByToken(token);
  } else {
    tokenProps = { size: size || 'base', weight: weight || 'normal' };
  }

  let resolvedColor = '';
  if (color) {
    if (colorAlias.has(color)) {
      resolvedColor = colorAlias.get(color) ?? color;
    } else {
      resolvedColor = color;
    }
  }

  let resolvedDarkColor = '';
  if (darkColor) {
    if (colorAlias.has(darkColor)) {
      resolvedDarkColor = colorAlias.get(darkColor) ?? darkColor;
    } else {
      resolvedDarkColor = darkColor;
    }
  }

  let mainColorClass = '';
  if (resolvedColor) {
    mainColorClass = `text-${resolvedColor}-${colorWeight}`;
  }

  let darkModeClass = '';
  if (resolvedColor) {
    if (resolvedDarkColor) {
      darkModeClass = `dark:text-${resolvedDarkColor}-${darkColorWeight || colorWeight}`;
    } else {
      darkModeClass = `dark:text-[var(--color-background)]`;
    }
  }

  return (
    <Component
      className={clsx(
        typography({ size: tokenProps.size, weight: tokenProps.weight }),
        mainColorClass,
        darkModeClass,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
