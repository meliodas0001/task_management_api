import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

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

    console.log(folder);

    if (!folder) {
      throw new UnauthorizedException('Folder not found');
    }

    await this.folderRepository.deleteFolder(folderId, transaction);
  }
}
