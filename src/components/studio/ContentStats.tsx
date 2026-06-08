import { getContentStats } from '@/lib/wordCount'

interface Props {
  content: string
}

export function ContentStats({ content }: Props) {
  if (!content) return null

  const stats = getContentStats(content)

  return (
    <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t">
      <span>{stats.words} words</span>
      <span>·</span>
      <span>{stats.characters} chars</span>
      <span>·</span>
      <span>{stats.sentences} sentences</span>
      <span>·</span>
      <span>{stats.readingTime} min read</span>
    </div>
  )
}
