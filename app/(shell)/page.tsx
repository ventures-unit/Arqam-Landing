import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect to Economy module as the default landing page
  redirect('/economy')
}
