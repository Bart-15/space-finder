#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { ApiStack } from './stacks/ApiStack';
import { AuthStack } from './stacks/AuthStack';
import { DataStack } from './stacks/DataStack';
import { LambdaStack } from './stacks/LambdaStack';
import { UiDeploymentStack } from './stacks/UiDeploymentStack';

const app = new cdk.App();

const dataStack = new DataStack(app, 'DataStack');
const lamdbdaStack = new LambdaStack(app, 'LambdaStack', {
  spacesTable: dataStack.spacesTable,
});
const authStack = new AuthStack(app, 'AuthStack', {
  photosBucket: dataStack.photosBucket,
});

new ApiStack(app, 'ApiStack', {
  spacesLambdaIntegration: lamdbdaStack.spacesLambdaIntegration,
  userPool: authStack.userPool,
});

new UiDeploymentStack(app, 'UiDeploymentStack', {
  deploymentBucket: dataStack.deploymentBucket,
});
