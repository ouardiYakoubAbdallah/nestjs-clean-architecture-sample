import { TodoModel } from '../../../../domain/model/todo';

export class TodoPresenter {
    id: number;
    content: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(todo: TodoModel) {
        this.id = todo.id;
        this.content = todo.content;
        this.isDone = todo.isDone;
        this.createdAt = todo.createdAt;
        this.updatedAt = todo.updatedAt;
    }
}
