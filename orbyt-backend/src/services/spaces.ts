import { prisma } from '../lib';
import { CreateSpaceParams, UpdateSpaceParams } from '../types/spaces';
import { BadRequestError } from '../errors';

export const createSpace = async ({
  userId,
  name,
  colorId,
  iconId,
  illustrationId,
}: CreateSpaceParams) => {
  const existingSpace = await prisma.space.findUnique({
    where: { userId, name },
  });

  if (existingSpace) throw new BadRequestError('SPACE_ALREADY_EXISTS');

  return await prisma.space.create({
    data: {
      userId,
      name,
      colorId,
      iconId,
      illustrationId,
    },
  });
};

export const getAllSpaces = async (userId: number) => {
  return await prisma.space.findMany({
    where: { userId },
  });
};

export const findSpace = async (id: number) => {
  const space = await prisma.space.findUnique({
    where: { id },
  });

  if (!space) throw new BadRequestError('SPACE_NOT_FOUND');

  return space;
};

export const updateSpace = async ({
  spaceId,
  name,
  colorId,
  iconId,
  illustrationId,
}: UpdateSpaceParams) => {
  await findSpace(spaceId);

  return await prisma.space.update({
    where: { id: spaceId },
    data: {
      name,
      colorId,
      iconId,
      illustrationId,
    },
  });
};

export const deleteSpace = async (id: number) => {
  await findSpace(id);

  return await prisma.space.delete({
    where: { id },
  });
};
