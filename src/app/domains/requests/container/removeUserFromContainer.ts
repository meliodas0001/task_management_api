export interface IUsersRemoveDTO {
  id: string;
  username: string;
  email: string;
}

export interface IRemoveUserFromContainer {
  ownerId: string;
  users: IUsersRemoveDTO[];
}
