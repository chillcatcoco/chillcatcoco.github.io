import Link from 'c4/components/Link'
import { SITE_BASE_URL, SITE_DESCRIPTION, SITE_TITLE } from 'c4/config'
import { getPosts } from 'c4/helpers/api'
import { cn } from 'c4/helpers/cn'
import { sans } from 'c4/helpers/fonts'
import { PostType } from 'c4/types'
import Color from 'colorjs.io'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    types: {
      'application/atom+xml': `${SITE_BASE_URL}/atom.xml`,
      'application/rss+xml': `${SITE_BASE_URL}/rss.xml`
    }
  }
}

export default async function Home() {
  const posts = await getPosts()
  return (
    <div className='relative top-[-10px] flex flex-col gap-8'>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className='block py-4 hover:scale-[1.005]'
          href={'/posts/' + post.slug + '/'}>
          <article>
            <PostTitle post={post} />
            <PostMeta post={post} />
            <PostSubtitle post={post} />
          </article>
        </Link>
      ))}
    </div>
  )
}

type Props = {
  post: PostType
}

const lightStart = new Color('lab(63 59.32 -1.47)')
const lightEnd = new Color('lab(33 42.09 -43.19)')
const lightRange = lightStart.range(lightEnd)
const darkStart = new Color('lab(81 32.36 -7.02)')
const darkEnd = new Color('lab(78 19.97 -36.75)')
const darkRange = darkStart.range(darkEnd)
const today = new Date().getTime()
const timeSinceFirstPost = today - new Date(2018, 10, 30).getTime()

function PostTitle({ post }: Props) {
  const timeSinceThisPost = today - new Date(post.date).getTime()
  const staleness = timeSinceThisPost / timeSinceFirstPost

  return (
    <h2
      className={cn(
        sans.className,
        'text-3xl font-black',
        'text-(--lightLink) dark:text-(--darkLink)'
      )}
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--lightLink' as any]: lightRange(staleness).toString(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--darkLink' as any]: darkRange(staleness).toString()
      }}>
      {post.title}
    </h2>
  )
}

function PostMeta({ post }: Props) {
  return (
    <p className='text-sm text-gray-700 dark:text-gray-300'>
      {new Date(post.date).toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}
    </p>
  )
}

function PostSubtitle({ post }: Props) {
  return <p className='mt-1'>{post.description}</p>
}
