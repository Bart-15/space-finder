// components/Navbar.js
import Link from 'next/link';

import { Button } from './ui/button';

type NavbarProps = {
  userName: string | undefined;
};

const Navbar = ({ userName }: NavbarProps) => {
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
          <Button variant='outline'>
            {userName ? (
              <Link href='/logout'> Logout </Link>
            ) : (
              <Link href='/login'> Login </Link>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
