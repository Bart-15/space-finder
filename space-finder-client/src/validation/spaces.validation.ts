import { object, string, z } from 'zod';

export const MAX_FILE_SIZE = 2000000;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const CreateSpaceValidaton = object({
  name: string().min(1, { message: 'Name is required' }),
  location: string().min(1, { message: 'Location is required' }),
  photo: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 2MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
});

export type CreateSpacePayload = z.infer<typeof CreateSpaceValidaton>;
