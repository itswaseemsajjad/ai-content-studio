# AI Content Studio

Generate professional content powered by Claude AI — blog posts, social media, ad copy, emails, and more.

## Features

- 6 content types: Blog, Social Media, Ad Copy, Email, Product Description, SEO
- Real-time streaming output
- Customizable tone, audience, length, and keywords
- Content history for logged-in users
- Authentication with NextAuth.js

## Tech Stack

- **Framework**: Next.js 14 App Router
- **AI**: Anthropic Claude API (streaming)
- **Auth**: NextAuth.js credentials
- **Database**: Prisma + SQLite
- **Styling**: Tailwind CSS

## Setup

```bash
git clone https://github.com/itswaseemsajjad/ai-content-studio
cd ai-content-studio
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npx prisma db push
npm run dev
```

Open http://localhost:3000
