import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindManyFoldersService {
  constructor(private readonly foldersRepository: IFoldersRepository) {}

  async execute(folderId: string, transaction: ORMTransactionInstance) {
    return await this.foldersRepository.findManyFolders(folderId, transaction);
  }
}
