import Link from 'next/link'

const contentTypes = [
  { type: 'blog', icon: '📝', title: 'Blog Posts', desc: 'SEO-optimized long-form articles' },
  { type: 'social', icon: '📱', title: 'Social Media', desc: 'Engaging posts for any platform' },
  { type: 'ad', icon: '📢', title: 'Ad Copy', desc: 'High-converting ad campaigns' },
  { type: 'email', icon: '✉️', title: 'Email Campaigns', desc: 'Professional email sequences' },
  { type: 'product', icon: '🛍️', title: 'Product Descriptions', desc: 'Compelling product copy' },
  { type: 'seo', icon: '🔍', title: 'SEO Content', desc: 'Keyword-rich web copy' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full">Powered by Claude AI</span>
          <h1 className="text-5xl font-bold text-gray-900 mt-6 mb-6">Create Content That <span className="text-purple-600">Converts</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">Generate professional-grade blog posts, ad copy, social media content, and more with the power of Claude AI.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/studio" className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition-colors shadow-lg">
              Open Studio
            </Link>
            <Link href="/auth/register" className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors">
              Get Started Free
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((ct) => (
            <Link key={ct.type} href={`/studio?type=${ct.type}`} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="text-4xl mb-4">{ct.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">{ct.title}</h3>
              <p className="text-gray-500 text-sm">{ct.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
