'use client'
import { useState } from 'react'

interface Content {
  id: string
  type: string
  title: string
  result: string
  tokens: number
  createdAt: Date | string
}

const typeIcons: Record<string, string> = { blog: '📝', social: '📱', ad: '📢', email: '✉️', product: '🛍️', seo: '🔍' }

export function ContentHistoryCard({ content }: { content: Content }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(content.result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{typeIcons[content.type] || '📄'}</span>
          <div>
            <p className="font-medium text-gray-900 text-sm">{content.title}</p>
            <p className="text-xs text-gray-400">{new Date(content.createdAt).toLocaleDateString()} • {content.tokens} tokens</p>
          </div>
        </div>
        <span className="text-gray-400 text-sm">{expanded ? '↑' : '↓'}</span>
      </div>
      {expanded && (
        <div className="border-t px-4 pb-4">
          <div className="bg-gray-50 rounded-lg p-3 mt-3 text-sm text-gray-700 whitespace-pre-wrap max-h-64 overflow-y-auto">
            {content.result}
          </div>
          <button onClick={handleCopy} className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
            {copied ? '✓ Copied' : 'Copy Content'}
          </button>
        </div>
      )}
    </div>
  )
}
