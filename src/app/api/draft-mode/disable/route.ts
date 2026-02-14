import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Draft mode is disabled in static mode' }, { status: 200 })
}