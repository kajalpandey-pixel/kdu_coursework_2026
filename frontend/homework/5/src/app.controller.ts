import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoDto, TodoDto } from './userEntitydto';


@Controller('todos')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }  
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodos(): TodoDto[] {
    return this.appService.getAllTodos();
  }

  @Get(':id')
  getWithId(@Param('id') id: string): TodoDto {
    return this.appService.getWithId(id);
  }

  @Post() 
  createNewTodo(@Body() user: CreateTodoDto): TodoDto {
    return this.appService.createNewTodo(user);
  }
    
  @Delete(':id')
  deleteTodo(@Param('id') id: string): { message: string } {
    return this.appService.deleteTodo(id);
  }



}
