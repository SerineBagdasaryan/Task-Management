import { Task } from '@/modules/tasks/entities/task.entity';

import { FindOptionsWhere, FindOperator } from 'typeorm';
import { TaskStatus } from '@/modules/tasks/enum/task-status.enum';

export interface TaskFindAllOptions extends FindOptionsWhere<Task> {
  where?: {
    user?: {
      id: number;
    };
    status?: TaskStatus | FindOperator<TaskStatus>;
    dueDate?: FindOperator<Date>;
  };
  take?: number;
  skip: number;
  relations?: string[];
}
