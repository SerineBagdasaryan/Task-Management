import {FindManyOptions} from "typeorm";
import {Task} from "@/modules/tasks/entities/task.entity";

export interface TaskFindAllOptions extends FindManyOptions<Task> {
    where?: {
        user?: {
            id: number;
        };
    };
    relations?: string[];
}