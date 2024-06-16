import {
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
} from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { errorToast, successToast } from '@/components/Toast';
import { setHeaderToken } from '@/lib/axios';
import { loginPayload } from '@/validation/auth.validation';

interface IAuthCognitoProviderProps {
  children: React.ReactNode;
}

interface AuthCognitoContextProps {
  isAuth: boolean;
  loading: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  handleSignout: () => void;
  handleLogin: (payload: loginPayload) => void;
}

export const AuthCognitoContext = createContext<
  AuthCognitoContextProps | undefined
>(undefined);

const AuthCognitoProvider = ({ children }: IAuthCognitoProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function getAuthUser() {
    try {
      if (!user) {
        const authUser = await getCurrentUser();
        const { tokens } = await fetchAuthSession({ forceRefresh: true });
        const hasToken = tokens?.idToken?.toString();

        setHeaderToken(hasToken!);

        setIsAuth(hasToken ? true : false);
        setUser(authUser);
      }
    } catch (error) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      getAuthUser();
    }
  }, []);

  async function handleLogin(payload: loginPayload) {
    try {
      const { nextStep } = await signIn(payload);
      const checkStep = nextStep.signInStep;

      if (checkStep === 'DONE') {
        await getAuthUser();
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
    setIsAuth(false);

    await signOut();
    successToast({
      message: 'User Successfully Logout',
    });
    setUser(null);

    router.push('/login');
  }

  // return values
  const authValues = {
    isAuth,
    setIsAuth,
    user,
    setUser,
    handleSignout,
    getAuthUser,
    handleLogin,
    loading,
  };

  return (
    <AuthCognitoContext.Provider value={authValues}>
      {children}
    </AuthCognitoContext.Provider>
  );
};

export default AuthCognitoProvider;
