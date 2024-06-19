import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useS3ImageUpload } from '@/hooks/useS3ImageUpload';
import { AuthCognitoContext } from '@/Provider/CognitoProvider';
import {
  CreateSpacePayload,
  CreateSpaceValidaton,
} from '@/validation/spaces.validation';

import { Input } from '../ui/input';
import UploadPhoto from './UploadPhoto';

interface AddSpaceDialogProps {}

const AddSpaceDialog = ({}: AddSpaceDialogProps) => {
  const cognito = useContext(AuthCognitoContext);
  if (!cognito) throw new Error('Cognito context is undefined');

  const { token } = cognito;

  const { uploadFile } = useS3ImageUpload();
  const [openDialog, setDialog] = useState(false);
  const [imgLink, setImgLink] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateSpacePayload>({
    mode: 'onChange',
    resolver: zodResolver(CreateSpaceValidaton),
    defaultValues: {
      name: '',
      location: '',
      photo: null,
    },
  });

  useEffect(() => reset(), [openDialog, reset]);

  async function handleAddSpace(values: CreateSpacePayload) {
    const result = await uploadFile(token, values.photo);

    console.log('Heress the result', result);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Space</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add Space</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAddSpace)} id='add-space-form'>
          <div className='flex flex-col gap-2'>
            <Input
              type='text'
              placeholder='Name'
              className='w-full'
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              type='text'
              placeholder='Location'
              {...register('location')}
              error={errors.location?.message}
            />
            <UploadPhoto
              register={register}
              setImgLink={setImgLink}
              setValue={setValue}
              isError={errors}
            />
          </div>
        </form>
        <DialogFooter className='sm:justify-end'>
          <Button type='submit' form='add-space-form'>
            Submit
          </Button>
          <DialogClose asChild>
            <Button type='button' variant='secondary' onClick={() => reset()}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSpaceDialog;
