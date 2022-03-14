import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { FilterSearchDto } from './dto/filter-search-task.dto';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  create(createTaskDto: CreateTaskDto): Tasks {
    const { title, description } = createTaskDto;
    const createTask: Tasks = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(createTask);
    return createTask;
  }

  findAll() {
    return this.tasks;
  }

  getFilter(filterSearchDto: FilterSearchDto) {
    let getTasks: Tasks[] = this.findAll();
    const { search, status } = filterSearchDto;
    if (status) {
      getTasks = this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      getTasks = this.tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }

    return getTasks;
  }

  findOne(id: string): Tasks {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const { title, description, status } = updateTaskDto;
    const updateTask = this.findOne(id);
    updateTask.description = description;
    updateTask.status = status;
    updateTask.title = title;
    return updateTask;
  }

  remove(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }
}
