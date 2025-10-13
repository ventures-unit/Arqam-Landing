'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ArrowLeft, Shield, Smartphone } from 'lucide-react'

export default function MFAPage() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'setup' | 'verify'>('setup')

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // In a real app, this would call the MFA setup API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStep('verify')
    } catch (err) {
      setError('Failed to setup MFA. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // In a real app, this would verify the MFA code
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Redirect to dashboard or next step
    } catch (err) {
      setError('Invalid verification code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'setup') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <Shield className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Enable Two-Factor Authentication
          </h1>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Setup MFA</CardTitle>
            <CardDescription>
              We'll help you set up two-factor authentication using an authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-medium">Download an authenticator app</h3>
                  <p className="text-sm text-muted-foreground">
                    We recommend Google Authenticator, Authy, or 1Password
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Scan the QR code</h3>
                <div className="flex justify-center p-4 bg-white rounded-lg border">
                  <div className="w-32 h-32 bg-muted flex items-center justify-center rounded">
                    <span className="text-xs text-muted-foreground">QR Code</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Scan this QR code with your authenticator app
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Or enter the secret key manually</h3>
                <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                  ABCD EFGH IJKL MNOP QRST UVWX YZ12 3456
                </div>
              </div>

              <form onSubmit={handleSetup} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="code">Enter verification code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify and Enable MFA
                </Button>
              </form>
            </div>

            <div className="mt-6 text-center text-sm">
              <Link href="/auth/login" className="text-primary hover:underline">
                <ArrowLeft className="inline mr-1 h-3 w-3" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <Shield className="h-12 w-12 text-success-500 mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify MFA Setup
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the verification code to complete setup
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify Setup</CardTitle>
          <CardDescription>
            Enter the code from your authenticator app to complete MFA setup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
                disabled={isLoading}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-muted-foreground text-center">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete Setup
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Button
              variant="ghost"
              onClick={() => setStep('setup')}
              className="text-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
