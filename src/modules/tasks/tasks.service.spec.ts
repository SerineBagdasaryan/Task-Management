import {Test, TestingModule} from '@nestjs/testing';
import {TasksService} from './tasks.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {TaskRepository} from "@/modules/tasks/entities/task.repository";
import {CreateTaskDto} from "@/modules/tasks/dto/create-task.dto";
import {Task} from "@/modules/tasks/entities/task.entity";
import {TaskStatus} from "@/modules/tasks/enum/task-status.enum";

describe('TasksService', () => {
  let taskService: TasksService;

    const mockTaskRepository = {
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskRepository),
            useValue: mockTaskRepository,
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    // taskRepository = module.get<TaskRepository>(getRepositoryToken(TaskRepository));
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

    xit('should create a task and return ResponseDataDTO<Task>', async () => {
        const createTaskDto: CreateTaskDto = {
            title: 'Task',
            description: 'Task Description',
            dueDate: new Date(),
        };

        const user = {
            id: 1,
            title: 'Task',
            description: 'Task Description',
            dueDate: new Date(),
            status: TaskStatus.TODO,
            userId: 1,
        } as Task;

        // Modify the mock implementation to return a resolved promise
        const s = jest.spyOn(mockTaskRepository, 'save').mockResolvedValue(user);
        console.log(11111, s);
        // act
        const result = await taskService.createTask(createTaskDto, 1);

        // assert
        expect(mockTaskRepository.save).toBeCalled();
        expect(mockTaskRepository.save).toBeCalledWith(createTaskDto);

        expect(result).toEqual(user);
    });

    // it('should create a task and return ResponseDataDTO<Task>', async () => {
  //     const createTaskDto: CreateTaskDto = {
  //       title: 'Task',
  //       description: 'Task Description',
  //       dueDate: new Date(),
  //     };
  //
  //     const user = {
  //         id: 1,
  //         title: 'Task',
  //         description: 'Task Description',
  //         dueDate: new Date(),
  //         status: TaskStatus.TODO,
  //         userId: 1
  //     } as Task;
  //
  //     jest.spyOn(mockTaskRepository, 'save').mockReturnValue(user);
  //
  //     // act
  //     const result = await taskService.create(createTaskDto);
  //
  //     // assert
  //     expect(mockTaskRepository.save).toBeCalled();
  //     expect(mockTaskRepository.save).toBeCalledWith(createTaskDto);
  //
  //     expect(result).toEqual(user);
  //
  //
  //   });

});
