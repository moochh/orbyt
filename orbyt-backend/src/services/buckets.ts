import { prisma } from '../lib';
import {
  CreateBucketParams,
  ScopedBucketNameParams,
  ScopedBucketParams,
  UpdateBucketParams,
} from '../types/buckets';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';
import { findSpace } from './spaces';

export const createBucket = async ({ userId, data }: CreateBucketParams) => {
  await findSpace({ spaceId: data.spaceId, userId });

  const existingBucket = await prisma.bucket.findUnique({
    where: { spaceId_name: { spaceId: data.spaceId, name: data.name } },
  });

  if (existingBucket) throw new BadRequestError('BUCKET_ALREADY_EXISTS');

  const orderNumber = await prisma.bucket.count({
    where: { spaceId: data.spaceId },
  });

  return await prisma.bucket.create({
    data: {
      userId,
      ...data,
      orderNumber,
    },
  });
};

export const updateBucket = async ({ userId, data }: UpdateBucketParams) => {
  await findBucketByName({ userId, name: data.name });

  return await prisma.bucket.update({
    where: { id: data.id },
    data: {
      ...data,
    },
  });
};

export const deleteBucket = async ({ userId, bucketId }: ScopedBucketParams) => {
  await findBucket({ userId, bucketId });

  return await prisma.bucket.delete({
    where: { id: bucketId },
  });
};

// Helpers
const findBucket = async ({ userId, bucketId }: ScopedBucketParams) => {
  const bucket = await prisma.bucket.findUnique({
    where: { id: bucketId },
  });

  if (!bucket) throw new NotFoundError('BUCKET_NOT_FOUND');
  if (bucket.userId !== userId) throw new ForbiddenError('ACCESS_DENIED');

  return bucket;
};

const findBucketByName = async ({ userId, name }: ScopedBucketNameParams) => {
  const bucket = await prisma.bucket.findUnique({
    where: { spaceId_name: { spaceId: userId, name } },
  });

  if (!bucket) throw new NotFoundError('BUCKET_NOT_FOUND');
  if (bucket.userId !== userId) throw new ForbiddenError('ACCESS_DENIED');

  return bucket;
};
