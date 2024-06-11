/* eslint-disable no-case-declarations */
import { APIGatewayProxyResult } from 'aws-lambda';

import { ProxyHandler } from '../../types/lambdaHandler.types';
import { handleError } from '../middleware/errorHandler';
import { createSpace, deleteSpace, getSpaces, updateSpace } from './spaceActions';

const handler: ProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return await getSpaces(event);
      case 'POST':
        return await createSpace(event);
      case 'PATCH':
        return await updateSpace(event);
      case 'DELETE':
        return await deleteSpace(event);
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }
  } catch (error) {
    return handleError(error);
  }
};

export { handler };
