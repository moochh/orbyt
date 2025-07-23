import { Tag as TagSchema } from '@prisma/client';

export interface ScopedTagParams {
  userId: number;
  tagId: number;
}

export interface ScopedTagNameParams {
  userId: number;
  name: string;
}

export interface CreateTagParams {
  userId: number;
  data: Pick<TagSchema, 'name' | 'colorId'>;
}

export interface UpdateTagParams {
  userId: number;
  data: Pick<TagSchema, 'id' | 'name' | 'colorId'>;
}
