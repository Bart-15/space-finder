/* eslint-disable no-case-declarations */
import { APIGatewayProxyResult } from 'aws-lambda';

import { ProxyHandler } from '../../types/lambdaHandler.types';
import { handleError } from '../middleware/errorHandler';
import { addCorsHeader } from '../shared/utils';
import { createSpace, deleteSpace, getSpaces, updateSpace } from './spaceActions';

const handler: ProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    let result: APIGatewayProxyResult;

    switch (event.httpMethod) {
      case 'GET':
        result = await getSpaces(event);
        break;
      case 'POST':
        result = await createSpace(event);
        break;
      case 'PATCH':
        result = await updateSpace(event);
        break;
      case 'DELETE':
        result = await deleteSpace(event);
        break;
      default:
        result = {
          statusCode: 405,
          body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    return addCorsHeader(result);
  } catch (error) {
    return handleError(error);
  }
};

export { handler };
