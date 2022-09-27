import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Serialize<T>(dto: ClassConstructor<T>) {
    return UseInterceptors(new GenericClassSerializerInterceptor(dto));
}

@Injectable()
export class GenericClassSerializerInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) {}
    intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(map((data: any) => plainToInstance(this.dto, data, { excludeExtraneousValues: true })));
    }
}
