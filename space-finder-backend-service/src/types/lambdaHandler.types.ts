import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda';

export type ProxyHandlerV2 = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;
export type ProxyHandler = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;
