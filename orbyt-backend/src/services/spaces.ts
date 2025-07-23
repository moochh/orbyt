import { prisma } from '../lib';
import { CreateSpaceParams, ScopedSpaceParams, UpdateSpaceParams } from '../types/spaces';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';

export const createSpace = async ({
  userId,
  name,
  colorId,
  iconId,
  illustrationId,
  orderNumber,
}: CreateSpaceParams) => {
  const existingSpace = await prisma.space.findUnique({
    where: { userId_name: { userId, name } },
  });

  if (existingSpace) throw new BadRequestError('SPACE_ALREADY_EXISTS');

  return await prisma.space.create({
    data: {
      userId,
      name,
      colorId,
      iconId,
      illustrationId,
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

export const updateSpace = async ({
  userId,
  spaceId,
  name,
  colorId,
  iconId,
  illustrationId,
  orderNumber,
}: UpdateSpaceParams) => {
  await findSpace({ spaceId, userId });

  return await prisma.space.update({
    where: { id: spaceId },
    data: {
      name,
      colorId,
      iconId,
      illustrationId,
      orderNumber,
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

  return await prisma.task.findMany({
    where: {
      spaceId,
    },
  });
};
