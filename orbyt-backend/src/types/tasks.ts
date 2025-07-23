import { Task as TaskSchema, Tag as TagSchema, Subtask as SubtaskSchema } from '@prisma/client';

export interface CreateTaskParams {
  userId: number;
  data: Omit<Task, 'id' | 'isDone'>;
}

export interface UpdateTaskParams {
  userId: number;
  data: Omit<Task, 'spaceId'>;
}

export interface ScopedTaskParams {
  userId: number;
  taskId: number;
}

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

export type Tag = Pick<TagSchema, 'userId' | 'id' | 'name' | 'colorId'>;
export type Subtask = Pick<SubtaskSchema, 'taskId' | 'id' | 'title' | 'isDone' | 'orderNumber'>;
