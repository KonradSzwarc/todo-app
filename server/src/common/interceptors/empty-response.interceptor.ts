import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EmptyResponseInterceptor<T> implements NestInterceptor<T, T extends undefined ? null : T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T extends undefined ? null : T> {
    return next.handle().pipe(map((value) => (typeof value === 'undefined' ? null : value)));
  }
}
