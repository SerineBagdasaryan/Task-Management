import { Test, TestingModule } from '@nestjs/testing';
import { CheckTasksStatusService } from './check-tasks-status.service';

describe('CheckTasksStatusService', () => {
  let service: CheckTasksStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckTasksStatusService],
    }).compile();

    service = module.get<CheckTasksStatusService>(CheckTasksStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
