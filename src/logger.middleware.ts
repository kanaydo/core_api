import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on("finish", () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      if (method === 'POST') {
        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} | [body] => ${JSON.stringify(body)}`
        );
      } else {
        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} | [query] => ${JSON.stringify(query)}`
        );
      }
      
    });
    next();
  }
}