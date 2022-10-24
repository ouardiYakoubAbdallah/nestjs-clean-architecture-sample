import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTodoDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly isDone: boolean;
}
