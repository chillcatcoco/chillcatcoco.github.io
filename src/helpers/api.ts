import { PostType } from 'c4/types'
import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

const POSTS_DIR = './public/posts'

export async function getPostsDirs(): Promise<string[]> {
  const entries = await readdir(POSTS_DIR, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

export async function getPost(dir: string): Promise<{
  filename: string
  content: string
  data: PostType
}> {
  const filename = path.join(POSTS_DIR, dir, 'index.md')
  const file = await readFile(filename, 'utf8')
  const { content, data } = matter(file)

  return { filename, content, data: data as PostType }
}

export async function getPostComponents(
  dir: string
): Promise<Record<string, unknown>> {
  try {
    return await import(`../../public/posts/${dir}/components`)
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'MODULE_NOT_FOUND'
    ) {
      return {}
    }
    throw error
  }
}

export async function getPosts(): Promise<PostType[]> {
  const dirs = await getPostsDirs()
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile(path.join(POSTS_DIR, dir, 'index.md'), 'utf8'))
  )

  const posts: PostType[] = dirs.map((slug, i) => {
    const { data } = matter(fileContents[i])
    return { slug, ...data } as PostType
  })

  return posts.sort((a, b) =>
    Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
  )
}
