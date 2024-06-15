import { object, string, TypeOf } from 'zod';

export const loginValidationSchema = object({
  username: string().min(1, { message: 'Username is required' }),
  password: string().min(1, { message: 'Password is required' }),
});

export type loginPayload = TypeOf<typeof loginValidationSchema>;
