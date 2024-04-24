import { ORMTransactionInstance } from '@domains/database/ORM';
import { ICreateFolder } from '@domains/requests/folders/createFolder';

export abstract class IFoldersRepository {
  public abstract createFolder(
    folder: ICreateFolder,
    transaction: ORMTransactionInstance,
  ): Promise<void>;
}
