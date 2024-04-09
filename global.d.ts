import { Request } from 'express';
import { Roles } from '@prisma/client';

interface User {
  id: string;
  email: string;
  username: string;
  roles: Roles[];
}

declare module 'express' {
  interface Request {
    user?: User;
  }
}
