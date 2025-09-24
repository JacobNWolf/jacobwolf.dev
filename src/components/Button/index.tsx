import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-50',
          'hover:bg-primary-800',
          'dark:bg-primary-100 dark:text-primary-900',
          'dark:hover:bg-primary-200',
        ],
        secondary: [
          'bg-secondary-200 text-secondary-900',
          'hover:bg-secondary-300',
          'dark:bg-secondary-800 dark:text-secondary-100',
          'dark:hover:bg-secondary-700',
        ],
        flush: [
          'bg-transparent text-primary-800',
          'hover:text-white hover:bg-accent',
          'dark:text-primary-200',
          'dark:hover:text-primary-900 dark:hover:bg-accent',
        ],
        outline: [
          'bg-transparent border border-primary-300 text-primary',
          'hover:bg-accent hover:border-accent hover:text-white',
          'dark:border-primary-700 dark:text-primary-200',
          'dark:hover:bg-accent dark:hover:border-accent dark:hover:text-white',
        ],
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never;
}

interface ButtonAsAnchor extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  href: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const classes = clsx(buttonVariants({ variant, size, className }));

    if ('href' in props && props.href) {
      return (
        <a
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
