'use client'
import { useState } from 'react'

interface Props {
  content: string
  title: string
  isGenerating: boolean
}

export function ContentOutput({ content, title, isGenerating }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Generated Content</h2>
        {content && (
          <button onClick={handleCopy} className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {title && <p className="text-sm text-purple-600 font-medium mb-3">{title}</p>}

      <div className="flex-1 min-h-64 bg-gray-50 rounded-xl p-4 overflow-y-auto">
        {!content && !isGenerating && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-5xl mb-4">✨</div>
            <p className="text-sm">Your generated content will appear here</p>
          </div>
        )}
        {(content || isGenerating) && (
          <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {content}
            {isGenerating && <span className="inline-block w-2 h-4 bg-purple-600 ml-0.5 animate-pulse" />}
          </div>
        )}
      </div>

      {content && (
        <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
          <span>{content.split(' ').length} words</span>
          <span>{content.length} characters</span>
        </div>
      )}
    </div>
  )
}
