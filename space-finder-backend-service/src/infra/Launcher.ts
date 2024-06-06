#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { ApiStack } from './stacks/ApiStack';
import { DataStack } from './stacks/DataStack';
import { LambdaStack } from './stacks/LambdaStack';

const app = new cdk.App();

const dataStack = new DataStack(app, 'DataStack');
const lamdbdaStack = new LambdaStack(app, 'LambdaStack', {
  spacesTable: dataStack.spacesTable,
});
new ApiStack(app, 'ApiStack', {
  helloLambdaIntegration: lamdbdaStack.helloLambdaIntegration,
});
