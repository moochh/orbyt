import { Task as TaskSchema, Tag as TagSchema, Subtask as SubtaskSchema } from '@prisma/client';
import { ScopedParams } from './globals';
import { Tag } from './tags';

export interface ScopedTaskParams {
  userId: number;
  taskId: number;
}

// Create
export type CreateTaskParams = ScopedParams<CreateTaskData>;
export interface CreateTaskData extends Omit<Task, 'id' | 'isDone' | 'orderNumber'> {}

// Update
export type UpdateTaskParams = ScopedParams<UpdateTaskData>;
export interface UpdateTaskData extends Omit<Task, 'spaceId'> {}

// Task
export interface Task
  extends Pick<
    TaskSchema,
    | 'spaceId'
    | 'bucketId'
    | 'id'
    | 'title'
    | 'notes'
    | 'dueDate'
    | 'priorityLevel'
    | 'isDone'
    | 'orderNumber'
  > {
  subtasks?: Subtask[];
  tags?: Tag[];
}

export type Subtask = Pick<SubtaskSchema, 'taskId' | 'id' | 'title' | 'isDone' | 'orderNumber'>;
