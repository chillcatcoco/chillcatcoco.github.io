import AutoRefresh from 'c4/components/AutoRefresh'
import HomeLink from 'c4/components/HomeLink'
import Link from 'c4/components/Link'
import {
  SITE_AUTHOR_AVATAR_URL,
  SITE_AUTHOR_NAME,
  SITE_AUTHOR_URL
} from 'c4/config'
import { serif } from 'c4/helpers/fonts'
import Image from 'next/image'
import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AutoRefresh>
      <html lang='en' className={serif.className}>
        <body className='mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]'>
          <header className='mb-14 flex flex-row place-content-between'>
            <HomeLink />
            <span className='relative top-[4px] italic'>
              by{' '}
              <Link href={SITE_AUTHOR_URL} target='_blank'>
                <Image
                  unoptimized
                  width={24}
                  height={24}
                  alt={SITE_AUTHOR_NAME}
                  src={SITE_AUTHOR_AVATAR_URL}
                  className='relative -top-1 mx-1 inline size-8 rounded-full'
                />
              </Link>
            </span>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </AutoRefresh>
  )
}
