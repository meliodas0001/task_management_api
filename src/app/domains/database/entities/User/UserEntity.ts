export interface UserEntity {
  id?: string;
  username: string;
  email: string;
  password: string;
  role?: UserRoles;
}

export enum UserRoles {
  Admin,
  Moderator,
  User,
}
