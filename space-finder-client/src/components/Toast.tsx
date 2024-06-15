import { toast } from 'sonner';

import { Icons } from '@/components/Icons';

type TToast = {
  message: string;
  description?: string;
  duration?: number;
};

export function successToast({
  message,
  description,
  duration = 5000,
}: TToast) {
  return toast(message, {
    description,
    duration: duration,
    icon: <Icons.success className='mr-1 h-5 w-5 text-green-600' />,
  });
}

export function errorToast({ message, description, duration = 5000 }: TToast) {
  return toast(message, {
    description,
    duration: duration,
    icon: <Icons.error className='mr-1 h-5 w-5 text-destructive' />,
  });
}

export function warningToast({
  message,
  description,
  duration = 5000,
}: TToast) {
  return toast(message, {
    description,
    duration: duration,
    icon: <Icons.warning className='mr-1 h-5 w-5 text-orange-600' />,
  });
}
export function infoToast({ message, description, duration = 5000 }: TToast) {
  return toast(message, {
    description,
    duration: duration,
    icon: <Icons.info className='mr-1 h-5 w-5 text-blue-600' />,
  });
}
