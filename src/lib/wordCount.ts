// Content statistics helpers used by the studio editor.
//
// `estimateReadingTime` assumes ~200 words per minute, which is a common
// average for silent reading of web copy, and always rounds up to at least one
// minute so short snippets never display "0 min read".

/** Count whitespace-delimited words, treating empty/whitespace input as zero. */
export function countWords(text: string): number {
  if (!text.trim()) return 0
  return text.trim().split(/\s+/).length
}

export function countCharacters(text: string): number {
  return text.length
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = countWords(text)
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export function getContentStats(text: string) {
  return {
    words: countWords(text),
    characters: countCharacters(text),
    readingTime: estimateReadingTime(text),
    paragraphs: text.split(/\n\n+/).filter((p) => p.trim()).length,
    sentences: text.split(/[.!?]+/).filter((s) => s.trim()).length,
  }
}
