export type ContentType = 'blog' | 'social' | 'ad' | 'email' | 'product' | 'seo'

export interface ContentRequest {
  type: ContentType
  topic: string
  tone: string
  audience: string
  length: string
  keywords?: string
}

export interface GeneratedContent {
  id: string
  type: ContentType
  title: string
  prompt: string
  result: string
  tokens: number
  createdAt: string
}
