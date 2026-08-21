import * as React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaTrack, ScrollAreaHandle } from './ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Icon, IconUser, IconMail, IconCheck, IconAlert } from '../lib/icons'
import { motion, useAnimation } from 'framer-motion'
import { fadeIn } from '../lib/animations'
import { createSupabaseClient } from '../lib/supabase-client'

// DigitallyDefined Supabase UI Components for Marketing Site
// Auth components, data tables, realtime indicators

// Note: These UI components are lightweight versions designed for marketing site integration
// Full auth flows are handled in the Dashboard app via direct Supabase connection

export const EmailSignup = ({ source = 'homepage' }) => {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // This would connect to your email marketing service (Brevo/SendPulse/etc.)
      // For demo purposes, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch (err) {
      setError('Failed to sign up. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>✓ Thanks!</CardTitle>
          <CardDescription>You're all set. Check your inbox for welcome emails.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>No fluff. Just systems.</CardTitle>
        <CardDescription>Get weekly insights on building faceless digital assets</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Join Free'}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
        <p className="text-xs text-foreground/50 mt-4 text-center">No spam. Unsubscribe anytime.</p>
      </CardContent>
    </Card>
  )
}

export const LiveIndicator = ({ status }) => {
  return (
    <div className={`flex items-center text-sm ${status === 'live' ? 'text-green-600' : 'text-gray-500'}`}>
      <motion.div
        animate={{ scale: status === 'live' ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0 }}
        className={`w-2 h-2 rounded-full mr-2 ${status === 'live' ? 'bg-green-500' : 'bg-gray-300'}`}
      />
      <span>{status === 'live' ? 'Live' : 'Offline'}</span>
    </div>
  )
}

export default {
  EmailSignup,
  LiveIndicator,
}
