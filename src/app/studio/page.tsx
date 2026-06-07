'use client'
import { useState, useCallback } from 'react'
import { ContentForm } from '@/components/studio/ContentForm'
import { ContentOutput } from '@/components/studio/ContentOutput'
import { ContentType } from '@/types'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function StudioInner() {
  const searchParams = useSearchParams()
  const defaultType = (searchParams.get('type') as ContentType) || 'blog'
  const [content, setContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [title, setTitle] = useState('')

  const handleGenerate = useCallback(async (data: any) => {
    setIsGenerating(true)
    setContent('')
    setTitle('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Generation failed')
      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const json = line.slice(6)
            if (json === '[DONE]') break
            try {
              const parsed = JSON.parse(json)
              if (parsed.text) {
                fullText += parsed.text
                setContent(fullText)
              }
              if (parsed.title) setTitle(parsed.title)
            } catch {}
          }
        }
      }
    } catch (err) {
      setContent('Error generating content. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Content Studio</h1>
        <p className="text-gray-500 mt-1">Generate any type of content in seconds</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContentForm defaultType={defaultType} onGenerate={handleGenerate} isGenerating={isGenerating} />
        <ContentOutput content={content} title={title} isGenerating={isGenerating} />
      </div>
    </div>
  )
}

export default function StudioPage() {
  return (
    <Suspense>
      <StudioInner />
    </Suspense>
  )
}
