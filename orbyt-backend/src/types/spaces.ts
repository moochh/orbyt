import { Space as SpaceSchema } from '@prisma/client';
import { ScopedParams } from './globals';

export interface ScopedSpaceParams {
  userId: number;
  spaceId: number;
}

// Create
export type CreateSpaceParams = ScopedParams<CreateSpaceData>;
export interface CreateSpaceData
  extends Pick<SpaceSchema, 'name' | 'colorId' | 'iconId' | 'illustrationId'> {}

// Update
export type UpdateSpaceParams = ScopedParams<UpdateSpaceData>;
export interface UpdateSpaceData
  extends Pick<
    SpaceSchema,
    'id' | 'name' | 'colorId' | 'iconId' | 'illustrationId' | 'orderNumber'
  > {}
