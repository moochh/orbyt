import { Bucket as BucketSchema } from '@prisma/client';

export interface CreateBucketParams {
  userId: number;
  data: Pick<BucketSchema, 'spaceId' | 'name' | 'orderNumber'>;
}

export interface UpdateBucketParams {
  userId: number;
  data: Pick<BucketSchema, 'id' | 'name' | 'orderNumber'>;
}

export interface ScopedBucketParams {
  userId: number;
  bucketId: number;
}

export interface ScopedBucketNameParams {
  userId: number;
  name: string;
}
