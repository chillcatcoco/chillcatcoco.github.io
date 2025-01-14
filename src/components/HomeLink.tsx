'use client'

import Link from 'c4/components/Link'
import { SITE_SHORT_NAME } from 'c4/config'
import { cn } from 'c4/helpers/cn'
import { sans } from 'c4/helpers/fonts'
import { usePathname } from 'next/navigation'

export default function HomeLink() {
  const pathname = usePathname()
  const isActive = pathname === '/'
  return (
    <Link
      href='/'
      className={cn(
        sans.className,
        'inline-block text-2xl font-black',
        isActive ? '' : 'hover:scale-[1.02]'
      )}>
      <span
        style={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ['--myColor1' as any]: isActive ? 'var(--text)' : 'var(--pink)',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ['--myColor2' as any]: isActive ? 'var(--text)' : 'var(--purple)',
          backgroundImage:
            'linear-gradient(45deg, var(--myColor1), var(--myColor2))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          transition: '--myColor1 0.2s ease-out, --myColor2 0.2s ease-in-out'
        }}>
        {SITE_SHORT_NAME}
      </span>
    </Link>
  )
}
