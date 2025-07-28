export interface IStorageService {
  upload(file: File): Promise<string>;
  delete(path: string): Promise<void>;
}
