import { APIGatewayProxyResult } from 'aws-lambda';

import { ProxyHandler } from '../../types/lambdaHandler.types';

const handler: ProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    let message: string;

    switch (event.httpMethod) {
      case 'GET':
        message = 'Hello from GET!';
        break;
      case 'POST':
        message = 'Hello from POST!';
        break;
      default:
        message = 'Unsupported HTTP method';
        break;
    }

    const response: APIGatewayProxyResult = {
      statusCode: message === 'Unsupported HTTP method' ? 400 : 200,
      body: JSON.stringify(`${message}`),
    };

    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Oops, something went wrong'),
    };
  }
};

export { handler };
