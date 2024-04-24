import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { ICreateFolder } from '@domains/requests/folders/createFolder';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateFolderService {
  constructor(private readonly foldersRepository: IFoldersRepository) {}

  async execute(
    folder: ICreateFolder,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    await this.foldersRepository.createFolder(folder, transaction);
  }
}
