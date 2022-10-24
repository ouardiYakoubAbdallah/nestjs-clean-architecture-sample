import { DynamicModule, Module } from '@nestjs/common';
import {
    GetTodoUseCases,
    GetTodosUseCases,
    UpdateTodoUseCases,
    AddTodoUseCases,
    DeleteTodoUseCases,
} from '../../usecases/todo';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DBTodoRepository } from '../repositories/todo.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
    imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
    static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
    static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
    static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
    static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            providers: [
                {
                    inject: [DBTodoRepository],
                    provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
                    useFactory: (todoRepository: DBTodoRepository) =>
                        new UseCaseProxy(new GetTodoUseCases(todoRepository)),
                },
                {
                    inject: [DBTodoRepository],
                    provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
                    useFactory: (todoRepository: DBTodoRepository) =>
                        new UseCaseProxy(new GetTodosUseCases(todoRepository)),
                },
                {
                    inject: [LoggerService, DBTodoRepository],
                    provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        todoRepository: DBTodoRepository,
                    ) =>
                        new UseCaseProxy(
                            new AddTodoUseCases(logger, todoRepository),
                        ),
                },
                {
                    inject: [LoggerService, DBTodoRepository],
                    provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        todoRepository: DBTodoRepository,
                    ) =>
                        new UseCaseProxy(
                            new UpdateTodoUseCases(logger, todoRepository),
                        ),
                },
                {
                    inject: [LoggerService, DBTodoRepository],
                    provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        todoRepository: DBTodoRepository,
                    ) =>
                        new UseCaseProxy(
                            new DeleteTodoUseCases(logger, todoRepository),
                        ),
                },
            ],
            exports: [
                UsecasesProxyModule.GET_TODO_USECASES_PROXY,
                UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
                UsecasesProxyModule.POST_TODO_USECASES_PROXY,
                UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
                UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
            ],
        };
    }
}
