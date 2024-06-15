/* eslint-disable */

'use client';
import { Toaster } from '@/components/ui/sonner';
import '@/lib/Amplify';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Navbar from '@/components/Navbar';
import { queryClient } from '@/config/queryClient';
import AuthCognitoProvider from './CognitoProvider';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCognitoProvider>
        {' '}
        <Navbar />
        {children}
      </AuthCognitoProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Provider;
