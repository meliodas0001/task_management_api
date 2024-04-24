import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersEntity } from '@domains/database/entities/Folders/FoldersEntity';
import { ICreateFolder } from '@domains/requests/folders/createFolder';

export abstract class IFoldersRepository {
  public abstract createFolder(
    folder: ICreateFolder,
    transaction: ORMTransactionInstance,
  ): Promise<void>;

  public abstract findFolder(
    folderId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IFoldersEntity>;

  public abstract deleteFolder(
    folderId: string,
    transaction: ORMTransactionInstance,
  );
}
