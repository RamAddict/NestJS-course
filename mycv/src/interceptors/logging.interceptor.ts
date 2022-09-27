import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { PATH_METADATA } from '@nestjs/common/constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const path = this.reflector.get<String[]>(PATH_METADATA, context.getHandler());
        const method = (context.switchToHttp().getRequest() as Request).method;
        console.log(`Received ${method} at ${path}`);
        return next
            .handle()
            .pipe(
                tap(() =>
                    console.log(
                        `Finished ${method} at ${path} with code ${
                            context.switchToHttp().getResponse().statusCode
                        } after ${Date.now() - now}ms`,
                    ),
                ),
            );
    }
}
