export interface ContentTemplate {
  id: string
  name: string
  type: string
  icon: string
  prompt: string
  tone: string
  audience: string
  length: string
}

export const contentTemplates: ContentTemplate[] = [
  {
    id: 'product-launch',
    name: 'Product Launch Blog',
    type: 'blog',
    icon: '🚀',
    prompt: 'Write a comprehensive product launch announcement blog post',
    tone: 'Professional',
    audience: 'Business professionals',
    length: 'Long (600-1200 words)',
  },
  {
    id: 'linkedin-thought',
    name: 'LinkedIn Thought Leadership',
    type: 'social',
    icon: '💼',
    prompt: 'Write a LinkedIn post sharing industry insights and lessons learned',
    tone: 'Professional',
    audience: 'Business professionals',
    length: 'Short (150-300 words)',
  },
  {
    id: 'facebook-ad',
    name: 'Facebook Ad Copy',
    type: 'ad',
    icon: '📢',
    prompt: 'Write a compelling Facebook ad with strong hook, benefits, and CTA',
    tone: 'Casual',
    audience: 'Consumers',
    length: 'Short (150-300 words)',
  },
  {
    id: 'welcome-email',
    name: 'Welcome Email',
    type: 'email',
    icon: '👋',
    prompt: 'Write a warm welcome email for new subscribers/customers',
    tone: 'Casual',
    audience: 'General',
    length: 'Medium (300-600 words)',
  },
  {
    id: 'seo-landing',
    name: 'SEO Landing Page',
    type: 'seo',
    icon: '🔍',
    prompt: 'Write SEO-optimized landing page copy with clear value proposition',
    tone: 'Professional',
    audience: 'General',
    length: 'Medium (300-600 words)',
  },
  {
    id: 'product-desc',
    name: 'E-commerce Product',
    type: 'product',
    icon: '🛍️',
    prompt: 'Write a persuasive product description highlighting features and benefits',
    tone: 'Casual',
    audience: 'Consumers',
    length: 'Short (150-300 words)',
  },
]
