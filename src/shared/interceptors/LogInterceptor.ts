import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { body, files } = request;
  
      console.log('Dados do corpo da requisição:', body);
      console.log('Arquivos recebidos:', files);
  
      return next.handle();
    }
  }
  