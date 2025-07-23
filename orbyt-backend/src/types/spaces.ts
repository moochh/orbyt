import { Space as SpaceSchema } from '@prisma/client';

export interface CreateSpaceParams
  extends Pick<
    SpaceSchema,
    'userId' | 'name' | 'colorId' | 'iconId' | 'illustrationId' | 'orderNumber'
  > {}

export interface ScopedSpaceParams {
  userId: number;
  spaceId: number;
}

export interface UpdateSpaceParams extends Omit<CreateSpaceParams, 'userId'>, ScopedSpaceParams {}
