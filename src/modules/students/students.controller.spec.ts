import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import {StudentService} from "@/modules/students/students.service";


describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [StudentService],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
