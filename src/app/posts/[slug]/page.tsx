import Link from 'c4/components/Link'
import { SITE_BASE_URL, SITE_SHORT_NAME } from 'c4/config'
import { getPost, getPostComponents, getPostsDirs } from 'c4/helpers/api'
import { cn } from 'c4/helpers/cn'
import { sans } from 'c4/helpers/fonts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import overnight from 'overnight/themes/Overnight-Slumber.json'
import { cache } from 'react'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkSmartpants from 'remark-smartypants'
import './markdown.css'
import { remarkMdxEvalCodeBlock } from './mdx'

overnight.colors['editor.background'] = 'var(--code-bg)'

type Props = {
  params: Promise<{ slug: string }>
}

const getData = cache(getPost)

export async function generateStaticParams() {
  const dirs = await getPostsDirs()
  return dirs.map((dir) => ({ slug: dir }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data } = await getData(slug)

  return {
    title: `${data.title} -  ${SITE_SHORT_NAME}`,
    description: data.description
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const { filename, content, data } = await getData(slug)
  const postComponents = await getPostComponents(slug)

  const url = `${SITE_BASE_URL}/posts/${slug}/`
  const urlEncoded = encodeURIComponent(url)
  const shareToBlueSky = `https://bsky.app/intent/compose?text=${urlEncoded}`
  const shareToX = `https://twitter.com/intent/tweet?url=${urlEncoded}`
  const shareToThreads = `https://threads.net/intent/post?text=${urlEncoded}`
  // const editUrl = `https://github.com/${GITHUT_USERNAME}/${GITHUT_REPO_SLUG}/edit/main/public/posts/${urlEncoded}/index.md`

  return (
    <article>
      <h1 className={cn(sans.className, 'text-5xl font-black text-(--title)')}>
        {data.title}
      </h1>
      <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>
        {new Date(data.date).toLocaleDateString('en', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>
      <div className='markdown mt-10'>
        <MDXRemote
          source={content}
          components={{
            a: Link,
            img: (props) => {
              const src = props.src.startsWith('./')
                ? `/posts/${slug}/${props.src.slice(2)}`
                : props.src
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              return <img {...props} src={src} />
            },
            ...postComponents
          }}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [
                remarkSmartpants,
                [remarkMdxEvalCodeBlock, filename]
              ],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: overnight
                  }
                ]
              ]
            }
          }}
        />
        <hr />
        <p>
          <Link href={shareToX}>Share on X (Twitter)</Link>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <Link href={shareToBlueSky}>Share on BlueSky</Link>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <Link href={shareToThreads}>Share on Threads</Link>
        </p>
      </div>
    </article>
  )
}
