import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    // Read the PNG file
    const filePath = join(process.cwd(), 'public', 'images', 'arqam-blue.png')
    const fileBuffer = await readFile(filePath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'ETag': '"arqam-favicon-v2"', // Cache busting
      },
    })
  } catch (error) {
    console.error('Error serving favicon:', error)
    return new NextResponse('Not Found', { status: 404 })
  }
}