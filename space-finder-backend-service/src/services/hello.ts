import { APIGatewayProxyResult } from 'aws-lambda';

import { listAllBuckets } from '../config/s3';
import { ProxyHandler } from '../types/lambdaHandler.types';

const handler: ProxyHandler = async event => {
  try {
    const allBuckets = await listAllBuckets();

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(`Hello World, here are your buckets', ${JSON.stringify(allBuckets)}`),
    };

    console.log('This is the event', event);
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Oops, something went wrong'),
    };
  }
};

export { handler };
