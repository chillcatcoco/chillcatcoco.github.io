import {
  SITE_AUTHOR_EMAIL,
  SITE_AUTHOR_NAME,
  SITE_BASE_URL,
  SITE_DESCRIPTION,
  SITE_SHORT_NAME,
  SITE_TITLE
} from 'c4/config'
import { PostType } from 'c4/types'
import { Feed, FeedOptions } from 'feed'

export function generateFeed(posts: PostType[]) {
  const site_url = SITE_BASE_URL

  const feedOptions: FeedOptions = {
    author: {
      name: SITE_AUTHOR_NAME,
      email: SITE_AUTHOR_EMAIL,
      link: site_url
    },
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    favicon: `${site_url}/favicon.ico`,
    feedLinks: { atom: `${site_url}/atom.xml`, rss: `${site_url}/rss.xml` },
    generator: SITE_SHORT_NAME,
    id: site_url,
    image: `${site_url}/static/images/avatar.png`,
    link: site_url,
    copyright: SITE_AUTHOR_NAME
  }

  const feed = new Feed(feedOptions)

  for (const post of posts) {
    feed.addItem({
      date: new Date(post.date),
      description: post.description,
      id: `${site_url}${post.slug}/`,
      link: `${site_url}${post.slug}/`,
      title: post.title
    })
  }

  return feed
}
