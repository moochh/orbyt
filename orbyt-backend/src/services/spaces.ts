import { prisma } from '../lib';
import { CreateSpaceParams, ScopedSpaceParams, UpdateSpaceParams } from '../types/spaces';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';
import { validateUpdateData } from '../utils/helpers';

export const createSpace = async ({ userId, data }: CreateSpaceParams) => {
  const existingSpace = await prisma.space.findUnique({
    where: { userId_name: { userId, name: data.name } },
  });

  if (existingSpace) throw new BadRequestError('SPACE_ALREADY_EXISTS');

  const orderNumber = await prisma.space.count({
    where: { userId },
  });

  return await prisma.space.create({
    data: {
      userId,
      ...data,
      orderNumber,
    },
  });
};

export const getAllSpaces = async (userId: number) => {
  return await prisma.space.findMany({
    where: { userId },
  });
};

export const findSpace = async ({ userId, spaceId }: ScopedSpaceParams) => {
  const space = await prisma.space.findUnique({
    where: { id: spaceId },
    select: {
      userId: true,
      id: true,
      name: true,
      colorId: true,
      iconId: true,
      illustrationId: true,
      orderNumber: true,
    },
  });

  if (!space) throw new NotFoundError('SPACE_NOT_FOUND');
  if (space.userId !== userId) throw new ForbiddenError('ACCESS_DENIED');

  return space;
};

export const updateSpace = async ({ userId, data }: UpdateSpaceParams) => {
  await findSpace({ spaceId: data.id, userId });

  const { id, ...updateData } = data;

  validateUpdateData(updateData);

  return await prisma.space.update({
    where: { id: data.id },
    data: {
      ...updateData,
    },
  });
};

export const deleteSpace = async ({ userId, spaceId }: ScopedSpaceParams) => {
  await findSpace({ spaceId, userId });

  return await prisma.space.delete({
    where: { id: spaceId },
  });
};

export const getTasksInSpace = async ({ userId, spaceId }: ScopedSpaceParams) => {
  await findSpace({ userId, spaceId });

  const [buckets, tasks] = await Promise.all([
    prisma.bucket.findMany({
      where: { spaceId },
      select: { id: true, name: true, orderNumber: true },
      orderBy: { orderNumber: 'asc' },
    }),
    prisma.task.findMany({
      where: { spaceId },
      orderBy: { orderNumber: 'asc' },
    }),
  ]);

  const bucketMap: Record<number, (typeof buckets)[number] & { tasks: typeof tasks }> = {};

  for (const bucket of buckets) {
    bucketMap[bucket.id] = { ...bucket, tasks: [] };
  }

  const ungroupedTasks: typeof tasks = [];

  for (const task of tasks) {
    if (task.bucketId && bucketMap[task.bucketId]) {
      bucketMap[task.bucketId].tasks.push(task);
    } else {
      ungroupedTasks.push(task);
    }
  }

  const groupedBuckets = Object.values(bucketMap);

  if (ungroupedTasks.length > 0) {
    groupedBuckets.unshift({
      id: 0,
      name: 'Ungrouped',
      orderNumber: -1,
      tasks: ungroupedTasks,
    });
  }

  return groupedBuckets;
};
