import { Tag as TagSchema } from '@prisma/client';
import { ScopedParams } from './globals';

export interface ScopedTagParams {
  userId: number;
  tagId: number;
}

export interface ScopedTagNameParams {
  userId: number;
  name: string;
}

// Update
export type UpdateTagParams = ScopedParams<UpdateTagData>;
export interface UpdateTagData extends Pick<TagSchema, 'id' | 'name' | 'colorId'> {}

// Tag
export type Tag = Pick<TagSchema, 'userId' | 'id' | 'name' | 'colorId'>;
