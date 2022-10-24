import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';

@Module({
    controllers: [TodoController],
})
export class ControllersModule {}
