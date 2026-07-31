import { env } from '../../config/env.js'
import type { StorageProvider } from './storage.provider.js'
import { LocalStorageProvider } from './providers/local.provider.js'
import { S3StorageProvider } from './providers/s3.provider.js'

export function createStorageProvider(): StorageProvider {
  switch (env.STORAGE_DRIVER) {
    case 'local':
      return new LocalStorageProvider()
    case 's3':
      return new S3StorageProvider()
    default:
      return new LocalStorageProvider()
  }
}
