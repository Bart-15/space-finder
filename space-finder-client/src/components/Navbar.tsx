// components/Navbar.js
import Link from 'next/link';
import { useContext } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { AuthCognitoContext } from '@/Provider/CognitoProvider';

import { Button } from './ui/button';

const Navbar = () => {
  const { handleSignout } = useAuth();
  const cognito = useContext(AuthCognitoContext);
  if (!cognito) throw new Error('Cognito context is undefined');

  const { user } = cognito;

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex space-x-4'>
          <Link href='/' className='text-white'>
            Home{' '}
          </Link>
          <Link href='/profile' className='text-white'>
            Profile{' '}
          </Link>
          <Link href='/spaces' className='text-white'>
            Spaces{' '}
          </Link>
        </div>
        <div>
          <Button variant='outline' onClick={user ? handleSignout : () => {}}>
            {user ? <p> Logout </p> : <Link href='/login'> Login </Link>}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
