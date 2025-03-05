import { IsDate, IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsNotEmpty()
  @MaxLength(15, {message: 'Max length is 15 characters.'})
  @ApiProperty({ example: 'Learn NestJS', description: 'Title of the todo' })
  title: string;

  @ApiProperty({ example: 'Study NestJS framework', description: 'Todo description' })
  @IsNotEmpty()
  description: string;
}