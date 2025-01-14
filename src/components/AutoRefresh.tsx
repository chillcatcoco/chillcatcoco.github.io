'use client'

import { IS_DEV } from 'c4/config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

let AutoRefresh = ({ children }: { children: React.ReactNode }) => {
  return children
}

if (IS_DEV) {
  AutoRefresh = function AutoRefresh({ children }) {
    const router = useRouter()
    useEffect(() => {
      const ws = new WebSocket('ws://localhost:3001')
      ws.onmessage = (event) => {
        if (event.data === 'refresh') {
          router.refresh()
        }
      }
      return () => {
        ws.close()
      }
    }, [router])
    return children
  }
}

export default AutoRefresh
