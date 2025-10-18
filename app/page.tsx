'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PasswordProtection } from '@/components/auth/PasswordProtection'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication states
    const userLoggedIn = sessionStorage.getItem('user_logged_in') === 'true'
    const prototypeAuth = sessionStorage.getItem('prototype_authenticated') === 'true'

    // If not logged in at all, redirect to landing
    if (!userLoggedIn) {
      router.push('/landing')
      return
    }

    // If logged in but already has password auth, go to user selection
    if (prototypeAuth) {
      router.push('/select-user-type')
      return
    }

    // Otherwise show password protection (logged in, needs password)
  }, [router])

  return <PasswordProtection />
}
