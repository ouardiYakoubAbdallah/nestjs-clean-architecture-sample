import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class ResponseFormat<T> {
    isArray: boolean;
    path: string;
    duration: string;
    method: string;

    data: T;
}

@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, ResponseFormat<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ResponseFormat<T>> {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        return next.handle().pipe(
            map((data) => ({
                isArray: Array.isArray(data),
                path: request.path,
                duration: `${Date.now() - now}ms`,
                method: request.method,
                data,
            })),
        );
    }
}
