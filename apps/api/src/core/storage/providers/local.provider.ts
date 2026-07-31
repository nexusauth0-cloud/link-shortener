import fs from 'node:fs/promises'
import path from 'node:path'
import { env } from '../../../config/env.js'
import type { StorageObject, StorageProvider, StoragePutOptions } from '../storage.provider.js'

export class LocalStorageProvider implements StorageProvider {
  readonly name = 'local'

  private readonly baseDir: string

  constructor() {
    this.baseDir = path.resolve(env.STORAGE_LOCAL_DIR)
  }

  private resolvePath(key: string): string {
    const safeKey = key.replace(/^\/+/, '')
    return path.join(this.baseDir, safeKey)
  }

  async put(key: string, data: Buffer, _options?: StoragePutOptions): Promise<void> {
    const target = this.resolvePath(key)
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.writeFile(target, data)
  }

  async get(key: string): Promise<StorageObject | null> {
    const target = this.resolvePath(key)
    try {
      const data = await fs.readFile(target)
      return { key, data, size: data.byteLength }
    } catch {
      return null
    }
  }

  async delete(key: string): Promise<void> {
    const target = this.resolvePath(key)
    try {
      await fs.unlink(target)
    } catch {
      // no-op: file already absent
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      await fs.access(this.resolvePath(key))
      return true
    } catch {
      return false
    }
  }
}
