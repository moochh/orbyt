import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { createBucket, deleteBucket, updateBucket } from '../services/buckets';
import { CreateBucketData, UpdateBucketData } from '../types/buckets';

export const create = async (req: Request<{}, {}, CreateBucketData>, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const data = req.body;

  const bucket = await createBucket({
    userId,
    data,
  });

  res.status(201).json(bucket);
};

export const update = async (req: Request<{}, {}, UpdateBucketData>, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const data = req.body;

  const bucket = await updateBucket({
    userId,
    data,
  });

  res.status(200).json(bucket);
};

export const remove = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const bucketId = parseInt(req.params.bucketId);

  await deleteBucket({ userId, bucketId });

  res.status(204).json();
};
