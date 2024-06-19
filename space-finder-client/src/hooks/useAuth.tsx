import {
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
} from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

import { errorToast, successToast } from '@/components/Toast';
import { generateTemporaryCredentials } from '@/helpers/generateCredentials';
import { setHeaderToken } from '@/lib/axios';
import { AuthCognitoContext } from '@/Provider/CognitoProvider';
import { loginPayload } from '@/validation/auth.validation';

const awsRegion = 'ap-southeast-1';

export function useAuth() {
  const [tempCreds, setTempCreds] = useState<object | null>(null);

  const router = useRouter();
  const cognito = useContext(AuthCognitoContext);

  async function getAuthUser() {
    const authUser = await getCurrentUser();
    return authUser;
  }

  async function getTemporaryCreds(jwtToken: string) {
    if (tempCreds) {
      return;
    }

    const result = await generateTemporaryCredentials(jwtToken);
    console.log('Hello', result);
    setTempCreds(result);
  }

  async function handleLogin(payload: loginPayload) {
    try {
      const { nextStep } = await signIn(payload);
      const checkStep = nextStep.signInStep;

      if (checkStep === 'DONE') {
        const user = await getAuthUser();
        const { tokens } = await fetchAuthSession({ forceRefresh: true });
        const accessToken = tokens?.idToken?.toString();
        await getTemporaryCreds(accessToken!);

        cognito?.setUser(user);
        setHeaderToken(accessToken!);
        cognito?.setToken(accessToken!);
        router.push('/spaces');
      }
    } catch (error) {
      if (error instanceof Error) {
        errorToast({
          message: error.message,
        });
      }
    }
  }

  async function handleSignout() {
    await signOut();
    successToast({
      message: 'User Successfully Logout',
    });
    cognito?.setUser(null);

    router.push('/login');
  }

  return {
    handleLogin,
    getAuthUser,
    handleSignout,
  };
}
