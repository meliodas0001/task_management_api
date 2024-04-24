import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { IUpdateFolder } from '@domains/requests/folders/updateFolder';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateFolderService {
  constructor(private readonly folderRepository: IFoldersRepository) {}

  async execute(
    folder: IUpdateFolder,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const findFolder = await this.folderRepository.findFolder(
      folder.id,
      transaction,
    );

    if (!findFolder) {
      throw new NotFoundException('Folder not found');
    }

    // Verify if user has permissions to update

    await this.folderRepository.updateFolder(folder, transaction);
  }
}
