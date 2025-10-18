import { MobileBlocker } from '@/components/auth/MobileBlocker'

export default function SuiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MobileBlocker>
      {children}
    </MobileBlocker>
  )
}
