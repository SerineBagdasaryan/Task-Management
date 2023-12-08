import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckTasksStatusService } from '@crons/check-tasks-status/check-tasks-status.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CheckTasksStatusService],
})
export class CronModule {}
