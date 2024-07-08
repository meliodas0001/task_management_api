interface Roles {
  id: string;
  name: string;
  containerId: string;
  userId: string;
}

export interface IGetAllContainers {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  roles: Roles[];
}
