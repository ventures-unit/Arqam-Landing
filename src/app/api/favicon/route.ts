import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    // Read the PNG file
    const filePath = join(process.cwd(), 'public', 'images', 'newblue0.svg')
    const fileBuffer = await readFile(filePath)
    
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': 'image/svg+xml',
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