import Link from 'c4/components/Link'
import { SITE_AUTHOR_EMAIL } from 'c4/config'
import { sans } from 'c4/helpers/fonts'
import './posts/[slug]/markdown.css'

export default function NotFound() {
  return (
    <article className='markdown'>
      <h1
        className={[
          sans.className,
          'text-[40px] font-black leading-[44px] text-[--title]'
        ].join(' ')}>
        Not found
      </h1>
      <div className='markdown mt-10'>
        <p>This page doesn&apos;t exist (yet?)</p>
        <p>
          I recently rewrote the site so maybe something broke. Please{' '}
          <Link href={`mailto:${SITE_AUTHOR_EMAIL}`}>complain here.</Link>
        </p>
      </div>
    </article>
  )
}
