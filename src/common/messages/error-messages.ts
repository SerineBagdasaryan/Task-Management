import { USER_MESSAGES } from './user-errors';
import { TASK_MESSAGES } from './task-errors';

export const ERROR_MESSAGES = {
  ...USER_MESSAGES,
  ...TASK_MESSAGES
};
