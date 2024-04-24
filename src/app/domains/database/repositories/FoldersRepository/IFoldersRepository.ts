export abstract class IFoldersRepository {
  public abstract createFolder(): Promise<void>;
}
