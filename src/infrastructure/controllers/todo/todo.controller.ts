import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import {
    AddTodoUseCases,
    DeleteTodoUseCases,
    GetTodosUseCases,
    GetTodoUseCases,
    UpdateTodoUseCases,
} from '../../../usecases/todo';
import { AddTodoDto, UpdateTodoDto } from './dto';
import { TodoPresenter } from './presenter/todo.persenter';

@Controller('todo')
export class TodoController {
    constructor(
        @Inject(UsecasesProxyModule.GET_TODOS_USECASES_PROXY)
        private readonly getAllTodosUsecaseProxy: UseCaseProxy<GetTodosUseCases>,

        @Inject(UsecasesProxyModule.GET_TODO_USECASES_PROXY)
        private readonly getTodoUsecaseProxy: UseCaseProxy<GetTodoUseCases>,

        @Inject(UsecasesProxyModule.POST_TODO_USECASES_PROXY)
        private readonly addTodoUsecaseProxy: UseCaseProxy<AddTodoUseCases>,

        @Inject(UsecasesProxyModule.PUT_TODO_USECASES_PROXY)
        private readonly updateTodoUsecaseProxy: UseCaseProxy<UpdateTodoUseCases>,

        @Inject(UsecasesProxyModule.DELETE_TODO_USECASES_PROXY)
        private readonly deleteTodoUsecaseProxy: UseCaseProxy<DeleteTodoUseCases>,
    ) {}

    @Get(':id')
    async getTodo(@Param('id', ParseIntPipe) id: number) {
        const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
        return new TodoPresenter(todo);
    }

    @Get()
    async getTodos() {
        const todos = await this.getAllTodosUsecaseProxy
            .getInstance()
            .execute();
        return todos.map((todo: TodoPresenter) => new TodoPresenter(todo));
    }

    @Post()
    async addTodo(@Body() addTodoDto: AddTodoDto) {
        const content = addTodoDto.content;
        const todo = await this.addTodoUsecaseProxy
            .getInstance()
            .execute(content);

        return new TodoPresenter(todo);
    }

    @Patch(':id')
    async updateTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdateTodoDto,
    ) {
        const isDone = updateTodoDto.isDone;
        await this.updateTodoUsecaseProxy.getInstance().execute(id, isDone);
        return 'success';
    }

    @Delete(':id')
    async deleteTodo(@Param('id', ParseIntPipe) id: number) {
        await this.deleteTodoUsecaseProxy.getInstance().execute(id);
        return 'success';
    }
}
