import { TodoModel } from '../../domain/model/todo';
import { ILogger } from '../../domain/logger/logger.interface';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';

export class AddTodoUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly todoRepository: TodoRepository,
    ) {}

    async execute(content: string): Promise<TodoModel> {
        const todo = new TodoModel();
        todo.content = content;
        todo.isDone = false;

        const result = await this.todoRepository.insert(todo);
        this.logger.log('addTodoUseCases execute', 'New todo inserted.');
        return result;
    }
}
