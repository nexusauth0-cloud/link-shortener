export const healthResponseSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        service: { type: 'string' },
        version: { type: 'string' },
        environment: { type: 'string' },
        uptime: { type: 'number' },
        timestamp: { type: 'string' },
      },
      required: ['status', 'service', 'version', 'environment', 'uptime', 'timestamp'],
    },
  },
}
