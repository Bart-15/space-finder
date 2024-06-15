import { Amplify } from 'aws-amplify';

// eslint-disable-next-line import/extensions
import Output from '../../../space-finder-backend-service/outputs.json';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: Output.AuthStack.SpaceUserPoolClientId,
      userPoolId: Output.AuthStack.SpaceUserPoolId,
      identityPoolId: Output.AuthStack.SpaceIdentityPoolId,
    },
  },
});
