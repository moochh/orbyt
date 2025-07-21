export interface CreateSpaceParams {
  userId: number;
  name: string;
  colorId: string;
  iconId?: string;
  illustrationId?: string;
}

export interface UpdateSpaceParams extends Omit<CreateSpaceParams, 'userId'> {
  spaceId: number;
}
