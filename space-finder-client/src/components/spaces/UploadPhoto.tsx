/* eslint-disable no-sequences */
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { base64encode } from '@/helpers/base64encoder';
import {
  ACCEPTED_IMAGE_TYPES,
  CreateSpacePayload,
  MAX_FILE_SIZE,
} from '@/validation/spaces.validation';

import { Icons } from '../Icons';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface IUploadPhoto {
  register: UseFormRegister<CreateSpacePayload>;
  setImgLink: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<CreateSpacePayload>;
  isError: FieldErrors<CreateSpacePayload>;
}

const UploadPhoto = ({ register, setImgLink, setValue }: IUploadPhoto) => {
  let imgPreview;
  // const { mutation, imgPreview, setImgPreview } = useUploadImage();
  const imageRegister = register('photo');

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;

    const file = e.target.files?.[0];
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type) || MAX_FILE_SIZE <= file.size)
      return;

    const base64 = (await base64encode(file)) as string;

    // const response = await mutation.mutateAsync({
    //   file: base64,
    // });

    // setImgLink(response.url.Location);
  }

  return (
    <div className='mb-2 flex justify-center'>
      <div className='w-full rounded-lg'>
        <div className=''>
          <Label htmlFor='image' className='mb-2 inline-block text-gray-500'>
            Image
          </Label>
          <div className='flex w-full items-center justify-center'>
            {imgPreview ? (
              <div className='relative flex h-64 w-full'>
                <Image
                  src={imgPreview}
                  alt='pre-upload-image'
                  width='50'
                  height='50'
                  className='mb-2 aspect-square w-full rounded-sm object-cover'
                />
                <Button
                  type='button'
                  className={buttonVariants({
                    variant: 'destructive',
                    className: 'absolute bottom-0 right-0 top-0 m-1',
                  })}
                  onClick={() => {
                    setValue('photo', '', { shouldValidate: true });
                    // setImgPreview('');
                  }}
                >
                  <Icons.trash className='h-8 w-8 text-white' />{' '}
                </Button>
              </div>
            ) : (
              <Label
                htmlFor='image'
                className='flex h-32 w-full flex-col border-4 border-dashed border-blue-200 hover:border-gray-300 hover:bg-gray-100'
              >
                {/* <div className='flex flex-col items-center justify-center pt-7'>
                  {mutation.isPending ? (
                    <Loader2 className='mt-2 h-12 w-12 animate-spin' />
                  ) : (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-8 w-8 text-gray-400 group-hover:text-gray-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                        />
                      </svg>
                      <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
                        Attach a file
                      </p>
                    </>
                  )}
                </div> */}
                <Input
                  id='image'
                  type='file'
                  className='opacity-0'
                  {...imageRegister}
                  onChange={(e) => {
                    // eslint-disable-next-line no-unused-expressions
                    imageRegister.onChange(e), handleUpload(e);
                  }}
                />
              </Label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
