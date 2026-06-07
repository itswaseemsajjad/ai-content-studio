import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { anthropic } from '@/lib/anthropic'
import { prisma } from '@/lib/prisma'
import { ContentType } from '@/types'

const systemPrompts: Record<ContentType, string> = {
  blog: 'You are an expert blog writer. Create SEO-optimized, engaging long-form blog posts. Include a compelling title, introduction, body with subheadings, and conclusion.',
  social: 'You are a social media expert. Create engaging posts optimized for the specified platform. Include hashtags, emojis where appropriate, and a clear call-to-action.',
  ad: 'You are a direct response copywriter. Create high-converting ad copy with a strong headline, benefits-focused body, and clear CTA. Use proven copywriting formulas.',
  email: 'You are an email marketing specialist. Write compelling email campaigns with attention-grabbing subject lines, personalized body copy, and effective CTAs.',
  product: 'You are an e-commerce copywriter. Write compelling product descriptions that highlight benefits, features, and create desire. Include keywords naturally.',
  seo: 'You are an SEO content specialist. Create keyword-rich web copy that ranks well while remaining readable and engaging for humans.',
}

function buildPrompt(data: any): string {
  return `Create ${data.type} content about: "${data.topic}"
Tone: ${data.tone}
Target audience: ${data.audience}
Length: ${data.length}
${data.keywords ? `Keywords to include: ${data.keywords}` : ''}

Generate high-quality, ready-to-use content.`
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const { type, topic, tone, audience, length, keywords } = await req.json()

  const prompt = buildPrompt({ type, topic, tone, audience, length, keywords })

  const encoder = new TextEncoder()
  let fullContent = ''
  let inputTokens = 0
  let outputTokens = 0

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const title = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${topic.slice(0, 50)}`
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ title })}\n\n`))

        const messageStream = await anthropic.messages.stream({
          model: 'claude-opus-4-8-20251101',
          max_tokens: 2048,
          system: systemPrompts[type as ContentType] || systemPrompts.blog,
          messages: [{ role: 'user', content: prompt }],
        })

        for await (const event of messageStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            fullContent += event.delta.text
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
          }
          if (event.type === 'message_delta' && event.usage) {
            outputTokens = event.usage.output_tokens
          }
          if (event.type === 'message_start' && event.message.usage) {
            inputTokens = event.message.usage.input_tokens
          }
        }

        if (session?.user?.id) {
          await prisma.content.create({
            data: {
              userId: session.user.id,
              type,
              title: `${type}: ${topic.slice(0, 50)}`,
              prompt,
              result: fullContent,
              tokens: inputTokens + outputTokens,
            },
          })
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      } catch (err) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Generation failed' })}\n\n`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
