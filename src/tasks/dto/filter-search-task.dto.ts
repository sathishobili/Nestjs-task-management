import { TaskStatus } from '../tasks.model';

export class FilterSearchDto {
  search: string;
  status: TaskStatus;
}
