import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTodoDto, TodoDto } from './userEntitydto';

@Injectable()
export class AppService {
  private readonly todos: TodoDto[] = [];

  getAllTodos(): TodoDto[] {
    return this.todos;
  }

  getWithId(id: string): TodoDto {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  createNewTodo(payload: CreateTodoDto): TodoDto {
    const now = new Date();
    const todo: TodoDto = {
      id: randomUUID(),
      title: payload.title,
      description: payload.description,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.push(todo);
    return todo;
  }

  deleteTodo(id: string): { message: string } {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    this.todos.splice(index, 1);
    return { message: 'Todo deleted successfully' };  
  }
}
