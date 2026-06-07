import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { ContentHistoryCard } from '@/components/studio/ContentHistoryCard'

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  const contents = await prisma.content.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Content History</h1>
      <p className="text-gray-500 mb-8">{contents.length} pieces generated</p>
      {contents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-gray-500">No content generated yet. Head to the Studio to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contents.map((c) => <ContentHistoryCard key={c.id} content={c} />)}
        </div>
      )}
    </div>
  )
}
