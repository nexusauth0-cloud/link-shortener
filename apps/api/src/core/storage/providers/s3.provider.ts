import type { StorageObject, StorageProvider, StoragePutOptions } from '../storage.provider.js'

/**
 * S3 storage provider.
 *
 * Placeholder for the future AWS S3 / Cloudflare R2 integration.
 * The interface contract is defined so the rest of the application
 * never depends on a concrete provider. When S3 support is added,
 * implement `put`/`get`/`delete`/`exists` using the official AWS SDK
 * and swap it in at the composition root (see storage.module).
 */
export class S3StorageProvider implements StorageProvider {
  readonly name = 's3'

  constructor() {
    throw new Error(
      'S3 storage provider is not implemented yet. Use STORAGE_DRIVER=local until S3 support lands.',
    )
  }

  async put(_key: string, _data: Buffer, _options?: StoragePutOptions): Promise<void> {
    throw new Error('S3 provider not implemented')
  }

  async get(_key: string): Promise<StorageObject | null> {
    throw new Error('S3 provider not implemented')
  }

  async delete(_key: string): Promise<void> {
    throw new Error('S3 provider not implemented')
  }

  async exists(_key: string): Promise<boolean> {
    throw new Error('S3 provider not implemented')
  }
}
