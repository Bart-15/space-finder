import { APIGatewayProxyResult } from 'aws-lambda';

export const successResponse = (
  code: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: Record<string, any> | string
): APIGatewayProxyResult => {
  return {
    statusCode: code,
    body: JSON.stringify(message),
  };
};
