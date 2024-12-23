
import { QueryFailedError } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  // این قسمت طراحی شده است تا خطاهای رایج MySQL را مدیریت کند
  @Catch(QueryFailedError)
  export class MysqlExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      // بررسی نوع خطا و انتخاب وضعیت مناسب HTTP
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : this.getStatusFromMysqlError(exception);
  
      const message =
          exception.message || 'Internal server error';
  
      return{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
    }
    }
  
    private getStatusFromMysqlError(exception: any): number {
      if (exception.code) {
        switch (exception.code) {
          case 'ER_DUP_ENTRY':
            // کد خطای ورودی تکراری
            return HttpStatus.CONFLICT;
          case 'ER_BAD_FIELD_ERROR':
            // کد خطای فیلد اشتباه
            return HttpStatus.BAD_REQUEST;
          default:
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
      }
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }