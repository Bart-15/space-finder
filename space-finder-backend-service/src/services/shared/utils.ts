/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { randomUUID } from 'crypto';

export const generateUUID = () => randomUUID();

export const generateUpdateQuery = <T extends Record<string, any>>(fields: T) => {
  const exp = {
    UpdateExpression: 'set',
    ExpressionAttributeNames: {} as Record<string, string>,
    ExpressionAttributeValues: {} as Record<string, any>,
  };
  Object.entries(fields).forEach(([key, item]) => {
    exp.UpdateExpression += `#${key} = :${key},`;
    exp.ExpressionAttributeNames[`#${key}`] = key;
    exp.ExpressionAttributeValues[`:${key}`] = item;
  });
  exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
  return exp;
};

export const headers = {
  'content-type': 'application/json',
};

export function hasAdminGroup(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims['cognito:groups'];
  if (groups) {
    return (groups as string).includes('admins');
  }
  return false;
}

export function addCorsHeader(arg: APIGatewayProxyResult): APIGatewayProxyResult {
  arg.headers ??= {};
  arg.headers['Access-Control-Allow-Origin'] = '*';
  arg.headers['Access-Control-Allow-Methods'] = '*';

  return arg;
}
