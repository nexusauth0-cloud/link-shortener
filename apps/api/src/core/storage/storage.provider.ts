export interface StoragePutOptions {
  contentType?: string
}

export interface StorageObject {
  key: string
  data: Buffer
  contentType?: string
  size: number
}

export interface StorageProvider {
  readonly name: string
  put(key: string, data: Buffer, options?: StoragePutOptions): Promise<void>
  get(key: string): Promise<StorageObject | null>
  delete(key: string): Promise<void>
  exists(key: string): Promise<boolean>
}
