import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteFolderService {
  constructor(private readonly folderRepository: IFoldersRepository) {}

  async execute(
    folderId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const folder = await this.folderRepository.findFolder(
      folderId,
      transaction,
    );

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    // TODO: Verify if user has permission to delete the folder

    await this.folderRepository.deleteFolder(folderId, transaction);
  }
}
