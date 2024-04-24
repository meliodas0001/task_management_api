import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersEntity } from '@domains/database/entities/Folders/FoldersEntity';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { ICreateFolder } from '@domains/requests/folders/createFolder';
import { IUpdateFolder } from '@domains/requests/folders/updateFolder';

export class FoldersRepository implements IFoldersRepository {
  public async createFolder(
    folder: ICreateFolder,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { name, description, containerId, author } = folder;

    await transaction.folders.create({
      data: {
        name,
        description: description ? description : '',
        containerId,
        author,
      },
    });
  }

  public async findFolder(
    folderId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IFoldersEntity> {
    return await transaction.folders.findUnique({
      where: {
        id: folderId,
      },
    });
  }

  public async deleteFolder(
    folderId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    await transaction.folders.delete({
      where: {
        id: folderId,
      },
    });
  }

  public findManyFolders(
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IFoldersEntity[]> {
    return transaction.folders.findMany({
      where: {
        containerId,
      },
    });
  }

  public async updateFolder(
    folder: IUpdateFolder,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { name, description, id } = folder;

    await transaction.folders.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
  }
}
