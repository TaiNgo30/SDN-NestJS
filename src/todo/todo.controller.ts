import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "../DTO/create-todo.dto";
import { TodoStatus } from "../Entity/todo.entity";
import { TodoStatusValidationPipe } from "../pipe/TodoStatusValidation.pipe";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/user.decorator";
import { UserEntity } from "../Entity/user.entity";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// http://localhost:3000/api/todos
@ApiTags('Todos')
@Controller("todos")
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {
  }

  // http GET verb
  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos' })
  getAllTodos(
    @User() user: UserEntity
  ) {
    // console.log(this.todoService.getAllTodos());

    return this.todoService.getAllTodos(user);
  }

  // http POST verb
  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created successfully' })
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto,
                @User() user: UserEntity
  ) {

    return this.todoService.createTodo(data, user);
  }

  @Patch(":id")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['OPEN', 'WIP', 'COMPLETED'],
          example: 'WIP'
        }
      }
    }
  })
  @ApiOperation({ summary: 'Update status todo' })
  @ApiResponse({ status: 200, description: 'Updated status successfully' })
  updateTodo(
    @Body("status", TodoStatusValidationPipe) status: TodoStatus,
    @Param("id") id: number,
    @User() user: UserEntity
  ) {
    return this.todoService.update(id, status, user);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 201, description: 'Deleted todo successfully' })
  deleteTodo(@Param("id") id: number,
             @User() user: UserEntity) {
    return this.todoService.delete(id, user);
  }

}