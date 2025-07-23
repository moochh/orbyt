import { prisma } from '../lib';
import { CreateTaskParams, ScopedTaskParams, UpdateTaskParams } from '../types/tasks';
import { findSpace } from './spaces';
import { ForbiddenError, NotFoundError } from '../errors';
import { validateUpdateData } from '../utils/helpers';

export const createTask = async ({ userId, data }: CreateTaskParams) => {
  await findSpace({ spaceId: data.spaceId, userId });

  const { subtasks, tags, ...rest } = data;

  const orderNumber = await prisma.task.count({
    where: { spaceId: data.spaceId },
  });

  return await prisma.task.create({
    data: {
      userId,
      ...rest,
      orderNumber,
      subtasks: {
        create: subtasks?.map(({ title, orderNumber }) => ({
          title,
          orderNumber,
        })),
      },
      tags: {
        connectOrCreate: tags?.map(({ id, name, colorId }) => ({
          where: { id },
          create: { name, colorId, userId },
        })),
      },
    },
  });
};

export const updateTask = async ({ userId, data }: UpdateTaskParams) => {
  await findTask({ userId, taskId: data.id });

  const { subtasks, tags, id, ...updateData } = data;

  validateUpdateData(updateData);

  return await prisma.task.update({
    where: { id: data.id },
    data: {
      ...updateData,
      subtasks: {
        create: subtasks?.map(({ title, orderNumber }) => ({
          title,
          orderNumber,
        })),
      },
      tags: {
        connectOrCreate: tags?.map(({ id, name, colorId }) => ({
          where: { id },
          create: { name, colorId, userId },
        })),
      },
    },
  });
};

export const deleteTask = async ({ userId, taskId }: ScopedTaskParams) => {
  await findTask({ userId, taskId });

  return await prisma.task.delete({
    where: { id: taskId },
  });
};

// Helpers
const findTask = async ({ userId, taskId }: ScopedTaskParams) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) throw new NotFoundError('TASK_NOT_FOUND');
  if (task.userId !== userId) throw new ForbiddenError('ACCESS_DENIED');

  return task;
};
