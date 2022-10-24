import { IsNotEmpty, IsString } from 'class-validator';

export class AddTodoDto {
    @IsNotEmpty()
    @IsString()
    readonly content: string;
}
