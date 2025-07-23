import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { CreateBucketParams, UpdateBucketParams } from '../types/buckets';
import { createBucket, deleteBucket, updateBucket } from '../services/buckets';

export const create = async (
  req: Request<{}, {}, Omit<CreateBucketParams, 'userId'>>,
  res: Response
) => {
  const createParams = req.body;
  const userId = (req as AuthenticatedRequest).userId;

  const bucket = await createBucket({
    userId,
    ...createParams,
  });

  res.status(201).json(bucket);
};

export const update = async (
  req: Request<{}, {}, Omit<UpdateBucketParams, 'userId'>>,
  res: Response
) => {
  const updateParams = req.body;
  const userId = (req as AuthenticatedRequest).userId;

  const bucket = await updateBucket({
    userId,
    ...updateParams,
  });

  res.status(200).json(bucket);
};

export const remove = async (req: Request, res: Response) => {
  const bucketId = parseInt(req.params.bucketId);
  const userId = (req as AuthenticatedRequest).userId;

  await deleteBucket({ userId, bucketId });

  res.status(204).json();
};
