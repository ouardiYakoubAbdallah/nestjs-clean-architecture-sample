import { TodoModel } from 'src/domain/model/todo';
import { TodoRepository } from 'src/domain/repositories/todoRepository.interface';

export class GetTodosUseCases {
    constructor(private readonly todoRepository: TodoRepository) {}

    async execute(): Promise<TodoModel[]> {
        return await this.todoRepository.findAll();
    }
}
