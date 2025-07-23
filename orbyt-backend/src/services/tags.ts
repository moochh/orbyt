import { prisma } from '../lib';
import { ScopedTagNameParams, ScopedTagParams, UpdateTagParams } from '../types/tags';
import { ForbiddenError, NotFoundError } from '../errors';

export const updateTag = async ({ userId, data }: UpdateTagParams) => {
  await findTag({ userId, tagId: data.id });

  return await prisma.tag.update({
    where: { id: data.id },
    data: {
      ...data,
    },
  });
};

export const deleteTag = async ({ userId, tagId }: ScopedTagParams) => {
  await findTag({ userId, tagId });

  return await prisma.tag.delete({
    where: { id: tagId },
  });
};

// Helpers
const findTag = async ({ userId, tagId }: ScopedTagParams) => {
  const tag = await prisma.tag.findUnique({
    where: { id: tagId },
  });

  if (!tag) throw new NotFoundError('TAG_NOT_FOUND');
  if (tag.userId !== userId) throw new ForbiddenError('ACCESS_DENIED');

  return tag;
};

const findTagByName = async ({ userId, name }: ScopedTagNameParams) => {
  const tag = await prisma.tag.findUnique({
    where: { userId_name: { userId, name } },
  });

  if (!tag) throw new NotFoundError('TAG_NOT_FOUND');
  if (tag.userId !== userId) throw new ForbiddenError('ACCESS_DENIED');

  return tag;
};
