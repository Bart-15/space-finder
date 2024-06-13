import { z } from 'zod';

import { headers } from '../shared/utils';
export class HttpError extends Error {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public statusCode: number,
    body: Record<string, unknown> = {}
  ) {
    super(JSON.stringify(body));
  }
}

export function handleError(error: unknown) {
  if (error instanceof z.ZodError) {
    const errMessages = error.issues.map(issue => ({
      field: issue.path[0],
      message: issue.message,
    }));
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        errors: errMessages,
      }),
    };
  }

  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      headers,
      body: error.message,
    };
  }

  throw error;
}
