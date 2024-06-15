'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  loginPayload,
  loginValidationSchema,
} from '@/validation/auth.validation';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { InputPassword } from './ui/input-password';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<loginPayload>({
    mode: 'onChange',
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function handleLogin(values: loginPayload) {
    const payload = { ...values };
    console.log(payload);
  }

  return (
    <div className='flex justify-center'>
      <Card className='flex w-[500px] flex-col items-center justify-center'>
        <CardHeader className='text-center'>
          <CardTitle>Space App - Login</CardTitle>
        </CardHeader>
        <CardContent className='w-full'>
          <form
            id='login-form'
            onSubmit={handleSubmit(handleLogin)}
            className='flex flex-col gap-2'
          >
            <Input
              type='text'
              placeholder='Username'
              {...register('username')}
              error={errors.username?.message}
            />
            <InputPassword
              placeholder='Password'
              {...register('password')}
              error={errors.password?.message}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button type='submit' form='login-form'>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
