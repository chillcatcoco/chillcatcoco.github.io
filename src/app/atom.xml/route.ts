export const dynamic = 'force-static'

import { getPosts } from 'c4/helpers/api'
import { generateFeed } from 'c4/helpers/feed'

export async function GET() {
  const posts = await getPosts()
  const feed = generateFeed(posts)
  return new Response(feed.atom1())
}
