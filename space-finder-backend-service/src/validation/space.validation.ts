import { object, string, TypeOf } from 'zod';

export const createSpaceValidationSchema = object({
  location: string().min(1, { message: 'Location is required' }),
});

export type createLocationPayload = TypeOf<typeof createSpaceValidationSchema>;
