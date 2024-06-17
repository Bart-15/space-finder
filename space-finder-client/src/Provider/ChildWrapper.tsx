import { useContext } from 'react';

import { AuthCognitoContext } from './CognitoProvider';

const ChildWrapper = ({ children }: { children: React.ReactNode }) => {
  const cognito = useContext(AuthCognitoContext);
  if (!cognito) throw new Error('Cognito context is undefined');

  // Return blank while fetching if the user is already authenticated
  if (cognito.loading) {
    return '';
  }

  return <>{children}</>;
};

export default ChildWrapper;
