import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoModel } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class DBTodoRepository implements TodoRepository {
    constructor(
        @InjectRepository(Todo)
        private readonly todoEntityRepository: Repository<Todo>,
    ) {}

    private toTodoEntity(todo: TodoModel): Todo {
        const todoEntity: Todo = new Todo();

        todoEntity.id = todo.id;
        todoEntity.content = todo.content;
        todoEntity.isDone = todo.isDone;

        return todoEntity;
    }

    private toTodo(todoEntity: Todo): TodoModel {
        const todo: TodoModel = new TodoModel();

        todo.id = todoEntity.id;
        todo.content = todoEntity.content;
        todo.isDone = todoEntity.isDone;
        todo.createdAt = todoEntity.createdAt;
        todo.updatedAt = todoEntity.updatedAt;

        return todo;
    }

    async insert(todo: TodoModel): Promise<TodoModel> {
        const todoEntity = this.toTodoEntity(todo);
        return await this.todoEntityRepository.save(todoEntity);
    }

    async findAll(): Promise<TodoModel[]> {
        const todosEntity = await this.todoEntityRepository.find();
        return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
    }

    async findOneById(id: number): Promise<TodoModel> {
        const todoEntity = await this.todoEntityRepository.findOneOrFail({
            where: { id },
        });
        return this.toTodo(todoEntity);
    }

    async update(id: number, isDone: boolean): Promise<void> {
        await this.todoEntityRepository.update({ id: id }, { isDone: isDone });
    }

    async delete(id: number): Promise<void> {
        await this.todoEntityRepository.delete({ id: id });
    }
}
