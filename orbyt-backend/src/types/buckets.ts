import { Bucket as BucketSchema } from '@prisma/client';
import { ScopedParams } from './globals';

export interface ScopedBucketParams {
  userId: number;
  bucketId: number;
}

export interface ScopedBucketNameParams {
  userId: number;
  name: string;
}

// Create
export type CreateBucketParams = ScopedParams<CreateBucketData>;
export interface CreateBucketData extends Pick<BucketSchema, 'spaceId' | 'name'> {}

// Update
export type UpdateBucketParams = ScopedParams<UpdateBucketData>;
export interface UpdateBucketData extends Pick<BucketSchema, 'id' | 'name' | 'orderNumber'> {}
