import { Queue, Worker, type Job, type JobsOptions, type ConnectionOptions } from 'bullmq'
import { env } from '../../config/env.js'
import { createLogger } from '../logger/logger.service.js'

const logger = createLogger()

export interface JobHandlers {
  [jobName: string]: (job: Job) => Promise<void>
}

export interface QueueServiceOptions {
  connection: ConnectionOptions
  queueName: string
  handlers: JobHandlers
}

export class QueueService {
  private readonly queue: Queue
  private readonly worker: Worker | null
  private readonly queueName: string

  constructor(options: QueueServiceOptions) {
    this.queueName = options.queueName
    this.queue = new Queue(options.queueName, {
      connection: options.connection,
    })

    this.worker = new Worker(
      options.queueName,
      async (job) => {
        const handler = options.handlers[job.name]
        if (!handler) {
          logger.error({ jobName: job.name }, 'No handler registered for job')
          return
        }
        await handler(job)
      },
      {
        connection: options.connection,
        concurrency: 5,
      },
    )

    this.worker.on('completed', (job) => {
      logger.info({ jobId: job.id, jobName: job.name }, 'Job completed')
    })

    this.worker.on('failed', (job, error) => {
      logger.error({ jobId: job?.id, jobName: job?.name, err: error }, 'Job failed')
    })
  }

  async enqueue<T>(jobName: string, data: T, options?: JobsOptions): Promise<string> {
    const job = await this.queue.add(jobName, data, options)
    logger.debug({ jobId: job.id, jobName }, 'Job enqueued')
    return job.id ?? ''
  }

  async close(): Promise<void> {
    await this.worker?.close()
    await this.queue.close()
  }

  getQueueName(): string {
    return this.queueName
  }
}

export function createQueueConnection(): ConnectionOptions {
  const url = new URL(env.REDIS_URL)
  return {
    host: url.hostname,
    port: Number(url.port || 6379),
    username: url.username || undefined,
    password: url.password || undefined,
    db: Number(url.pathname.replace('/', '') || 0),
    maxRetriesPerRequest: null,
  }
}
