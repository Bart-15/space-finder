import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = '', ...props }, ref) => (
    <>
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? 'border-red-500' : ''
          }`,
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <p className='text-xs text-red-500'>{error}</p>}{' '}
    </>
  ),
);
Input.displayName = 'Input';

export { Input };
