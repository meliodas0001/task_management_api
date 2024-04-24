import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersEntity } from '@domains/database/entities/Folders/FoldersEntity';

import { ICreateFolder } from '@domains/requests/folders/createFolder';
import { IUpdateFolder } from '@domains/requests/folders/updateFolder';

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

  public abstract findManyFolders(
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IFoldersEntity[]>;

  public abstract updateFolder(
    folder: IUpdateFolder,
    transaction: ORMTransactionInstance,
  ): Promise<void>;
}
