import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch(QueryFailedError, EntityNotFoundError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = exception;

    switch(exception.constructor) {
      case QueryFailedError:
        const { driverError: { detail, table } } = exception as QueryFailedError;
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        const messageStart = table.split('_').join(' ') + ' with';
        errorMessage = `${detail}`.replace('Key', messageStart);
        break;
      case EntityNotFoundError:
        const { message } = exception as EntityNotFoundError;
        statusCode = HttpStatus.NOT_FOUND;
        errorMessage = message
        break
    }

    const errorResponse = {
      statusCode: statusCode,
      message: errorMessage,
    };

    response.status(statusCode).json(errorResponse);
  }
}