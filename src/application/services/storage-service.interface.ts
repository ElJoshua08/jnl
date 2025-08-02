export interface IStorageService {
  upload(bucket: string, file: File): Promise<string>;
  getUrl(bucket: string, path: string): Promise<string>;
  delete(bucket: string, path: string): Promise<void>;
}
