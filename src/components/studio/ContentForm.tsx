'use client'
import { useState } from 'react'
import { ContentType } from '@/types'
import clsx from 'clsx'

const contentTypes: { value: ContentType; label: string; icon: string }[] = [
  { value: 'blog', label: 'Blog Post', icon: '📝' },
  { value: 'social', label: 'Social Media', icon: '📱' },
  { value: 'ad', label: 'Ad Copy', icon: '📢' },
  { value: 'email', label: 'Email', icon: '✉️' },
  { value: 'product', label: 'Product Desc', icon: '🛍️' },
  { value: 'seo', label: 'SEO Content', icon: '🔍' },
]

const tones = ['Professional', 'Casual', 'Humorous', 'Formal', 'Inspirational', 'Urgent']
const audiences = ['General', 'Business professionals', 'Millennials', 'Gen Z', 'Executives', 'Consumers']
const lengths = ['Short (150-300 words)', 'Medium (300-600 words)', 'Long (600-1200 words)', 'Detailed (1200+ words)']

interface Props {
  defaultType: ContentType
  onGenerate: (data: any) => void
  isGenerating: boolean
}

export function ContentForm({ defaultType, onGenerate, isGenerating }: Props) {
  const [type, setType] = useState<ContentType>(defaultType)
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Professional')
  const [audience, setAudience] = useState('General')
  const [length, setLength] = useState('Medium (300-600 words)')
  const [keywords, setKeywords] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onGenerate({ type, topic, tone, audience, length, keywords })
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
          <div className="grid grid-cols-3 gap-2">
            {contentTypes.map((ct) => (
              <button
                key={ct.value}
                type="button"
                onClick={() => setType(ct.value)}
                className={clsx('p-2 rounded-xl text-sm font-medium transition-colors border', type === ct.value ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300')}
              >
                {ct.icon} {ct.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Subject</label>
          <textarea value={topic} onChange={(e) => setTopic(e.target.value)} required rows={3} placeholder="Describe what you want to write about..." className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              {tones.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
            <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              {audiences.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
          <select value={length} onChange={(e) => setLength(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
            {lengths.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (optional)</label>
          <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="AI, machine learning, automation..." className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>

        <button type="submit" disabled={isGenerating || !topic.trim()} className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors">
          {isGenerating ? '✨ Generating...' : '✨ Generate Content'}
        </button>
      </form>
    </div>
  )
}
