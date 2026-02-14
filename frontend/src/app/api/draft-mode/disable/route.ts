import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  
  // Check the secret to prevent unauthorized access
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  // Disable draft mode
  ;(await draftMode()).disable()
  
  // Redirect to the homepage or the page that was being previewed
  const redirectUrl = searchParams.get('redirect') || '/'
  
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}