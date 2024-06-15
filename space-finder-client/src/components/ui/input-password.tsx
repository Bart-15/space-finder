'use client';

import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'password', error = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <>
        <div
          className={cn(
            `flex h-10 items-center rounded-md border border-input bg-white pl-1 pr-4 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 ${
              error ? 'border-red-500' : ''
            }`,
            className,
          )}
        >
          <input
            {...props}
            type={showPassword ? 'text' : type}
            ref={ref}
            className='w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          />
          {type === 'password' && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <Label
              className='cursor-pointer'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <Eye className='h-[16px] w-[16px]' />
              ) : (
                <EyeOff className='h-[ß16px] w-[16px]' />
              )}
            </Label>
          )}
        </div>
        {error && <p className='text-xs text-red-500'>{error}</p>}{' '}
      </>
    );
  },
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
