import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

// eslint-disable-next-line import/extensions
import Output from '../../../space-finder-backend-service/outputs.json';

const awsRegion = 'ap-southeast-1';
export async function generateTemporaryCredentials(jwtToken: string) {
  const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${Output.AuthStack.SpaceUserPoolId}`;
  const cognitoIdentity = new CognitoIdentityClient({
    credentials: fromCognitoIdentityPool({
      clientConfig: {
        region: awsRegion,
      },
      identityPoolId: Output.AuthStack.SpaceIdentityPoolId,
      logins: {
        [cognitoIdentityPool]: jwtToken,
      },
    }),
  });
  const credentials = await cognitoIdentity.config.credentials();
  return credentials;
}
