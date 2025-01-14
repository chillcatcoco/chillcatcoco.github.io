import HomeLink from 'c4/components/HomeLink'
import { ReactComponentProps } from 'c4/types'

export default function Layout({ children }: ReactComponentProps) {
  return (
    <>
      {children}
      <footer className='mt-12'>
        <HomeLink />
      </footer>
    </>
  )
}
