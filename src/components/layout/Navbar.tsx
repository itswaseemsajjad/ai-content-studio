'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-purple-600">✨ ContentAI</Link>
        <div className="flex items-center gap-6">
          <Link href="/studio" className="text-gray-600 hover:text-purple-600 text-sm font-medium">Studio</Link>
          {session && <Link href="/history" className="text-gray-600 hover:text-purple-600 text-sm font-medium">History</Link>}
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{session.user.name}</span>
              <button onClick={() => signOut()} className="text-sm text-gray-500 hover:text-red-500">Sign Out</button>
            </div>
          ) : (
            <Link href="/auth/signin" className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
