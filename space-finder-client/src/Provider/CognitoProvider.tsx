import { AuthUser, fetchAuthSession } from 'aws-amplify/auth';
import { createContext, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { setHeaderToken } from '@/lib/axios';

interface IAuthCognitoProviderProps {
  children: React.ReactNode;
}

interface AuthCognitoContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export const AuthCognitoContext = createContext<
  AuthCognitoContextProps | undefined
>(undefined);

const AuthCognitoProvider = ({ children }: IAuthCognitoProviderProps) => {
  const { getAuthUser } = useAuth();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function init() {
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      console.log(tokens);
      const accessToken = tokens?.idToken?.toString();

      if (accessToken) {
        const user = await getAuthUser();
        setHeaderToken(accessToken!);
        setUser(user);
      }

      setLoading(false);
    }

    init();
  }, []);

  // return values
  const authValues = {
    loading,
    setLoading,
    user,
    setUser,
  };

  return (
    <AuthCognitoContext.Provider value={authValues}>
      {children}
    </AuthCognitoContext.Provider>
  );
};

export default AuthCognitoProvider;
