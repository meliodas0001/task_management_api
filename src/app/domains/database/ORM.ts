import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { PrismaClient } from '@prisma/client';

export type ORMTransactionInstance = Omit<PrismaClient, ITXClientDenyList>;
