import { TodoModel } from '../model/todo';

export interface TodoRepository {
    insert(todo: TodoModel): Promise<TodoModel>;
    findAll(): Promise<TodoModel[]>;
    findOneById(id: number): Promise<TodoModel>;
    update(id: number, isDone: boolean): Promise<void>;
    delete(id: number): Promise<void>;
}
