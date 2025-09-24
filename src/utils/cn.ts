import { clsx } from 'clsx';

export const cn = (...args: Parameters<typeof clsx>): string => clsx(...args);
