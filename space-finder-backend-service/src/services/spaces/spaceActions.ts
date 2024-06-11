import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { successResponse } from '../middleware/apiGatewayResponse';
import { HttpError } from '../middleware/errorHandler';
import validateResource from '../middleware/validateResource';
import { generateUUID, hasAdminGroup } from '../shared/utils';
import { createLocationPayload, createSpaceValidationSchema } from '../validation/space.validation';
import { ddbClient } from './../../config/dynamoDb';

export async function createSpace(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const reqBody = JSON.parse(event.body as string) as createLocationPayload;

  validateResource(createSpaceValidationSchema, reqBody);

  const payload = {
    id: generateUUID(),
    location: reqBody.location,
  };

  const createSpaceCommand = new PutItemCommand({
    TableName: process.env.TABLE_NAME,
    Item: marshall(payload),
  });

  await ddbClient.send(createSpaceCommand);

  return successResponse(200, 'Space successfully created');
}

export async function getSpaces(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if ('id' in event.queryStringParameters) {
      const spaceId = event.queryStringParameters['id'];
      const space = await ddbClient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: marshall({ id: spaceId }),
        })
      );

      if (space.Item) {
        const unmarshalledItem = unmarshall(space.Item);
        return successResponse(200, {
          space: unmarshalledItem,
        });
      } else {
        throw new HttpError(404, {
          message: 'Space not found',
        });
      }
    }
  }

  // Get all items

  const spaceScanCommand = new ScanCommand({
    TableName: process.env.TABLE_NAME,
  });

  const result = await ddbClient.send(spaceScanCommand);

  const unmarshalledItems = result.Items?.map(item => unmarshall(item));
  return successResponse(200, {
    spaces: unmarshalledItems,
  });
}

export async function updateSpace(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters && 'id' in event.queryStringParameters && event.body) {
    const parsedBody = JSON.parse(event.body as string);

    validateResource(createSpaceValidationSchema, parsedBody);

    const spaceId = event.queryStringParameters['id'] as string;
    const requestBodyKey = Object.keys(parsedBody)[0];
    const requestBodyValue = parsedBody[requestBodyKey];

    const updateResult = await ddbClient.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: spaceId },
        },
        UpdateExpression: 'set #key = :new',
        ExpressionAttributeValues: {
          ':new': {
            S: requestBodyValue,
          },
        },
        ExpressionAttributeNames: {
          '#key': requestBodyKey,
        },
        ReturnValues: 'UPDATED_NEW',
      })
    );

    return successResponse(200, 'Space updated successfully!');
  }

  throw new HttpError(400, {
    message: 'Please provide the right args!',
  });
}

export async function deleteSpace(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (!hasAdminGroup(event)) {
    throw new HttpError(401, {
      message: 'Not Authorized!',
    });
  }

  if (event.queryStringParameters && 'id' in event.queryStringParameters) {
    const spaceId = event.queryStringParameters['id'] as string;

    await ddbClient.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: spaceId },
        },
      })
    );

    return successResponse(200, 'Space deleted successfully');
  }

  throw new HttpError(400, {
    message: 'Please provide the right args!',
  });
}
