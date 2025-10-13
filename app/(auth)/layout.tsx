import { ReactNode } from 'react'
import { AuthProvider } from '@/lib/auth/useAuth'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mr-3">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              Arqam
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  "Arqam provides the most comprehensive analytics platform for 
                  enterprise decision-making. The insights we've gained have 
                  transformed our business strategy."
                </p>
                <footer className="text-sm">
                  Sarah Johnson, CEO at GrowthCorp
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
