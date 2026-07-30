export interface LinkData {
  id: string
  url: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface HealthResponse {
  status: 'ok'
}

export type CreateLinkInput = {
  url: string
  slug?: string
}
