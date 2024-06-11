#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { ApiStack } from './stacks/ApiStack';
import { AuthStack } from './stacks/AuthStack';
import { DataStack } from './stacks/DataStack';
import { LambdaStack } from './stacks/LambdaStack';

const app = new cdk.App();

const dataStack = new DataStack(app, 'DataStack');
const lamdbdaStack = new LambdaStack(app, 'LambdaStack', {
  spacesTable: dataStack.spacesTable,
});
const authStack = new AuthStack(app, 'AuthStack');

new ApiStack(app, 'ApiStack', {
  spacesLambdaIntegration: lamdbdaStack.spacesLambdaIntegration,
  userPool: authStack.userPool,
});
