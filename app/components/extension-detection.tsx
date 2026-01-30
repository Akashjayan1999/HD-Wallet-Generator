'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ExtensionDetection({children}: {children: React.ReactNode}) {
  const router = useRouter()

  useEffect(() => {
    
    const isExtension = !!(
      typeof chrome !== 'undefined' && 
      chrome.runtime && 
      chrome.runtime.id
    )
    console.log(chrome)

    if (isExtension) {
      router.push('/extension')
    } else {
      router.push('/browser')
    }
  }, [router])

  return (
   <>{children}</>
  )
}