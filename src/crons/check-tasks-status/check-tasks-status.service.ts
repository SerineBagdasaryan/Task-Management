import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection, In, LessThan } from 'typeorm';
import { Task } from '@modules/tasks/entities/task.entity';
import { TaskStatus } from '@modules/tasks/enum/task-status.enum';

@Injectable()
export class CheckTasksStatusService {
  constructor(private readonly _connection: Connection) {}
  @Cron(CronExpression.EVERY_3_HOURS)
  async updateTasksStatus() {
    console.log('Executing cron job...');
    const repository = await this._connection.getRepository(Task);
    await repository.update(
      {
        status: In([TaskStatus.TODO, TaskStatus.IN_PROGRESS]),
        dueDate: LessThan(new Date()),
      },
      { status: TaskStatus.FAILED },
    );
  }
}
