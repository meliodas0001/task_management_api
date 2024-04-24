import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersEntity } from '@domains/database/entities/Folders/FoldersEntity';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { ICreateFolder } from '@domains/requests/folders/createFolder';

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
}
