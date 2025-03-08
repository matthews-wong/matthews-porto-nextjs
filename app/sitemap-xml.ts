import { NextRequest, NextResponse } from 'next/server'
import sitemapData from './sitemap'

// This function will generate a custom XML sitemap with image support
export async function GET(_request: NextRequest) {
  const sitemapEntries = sitemapData()

  // Create XML string
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`

  // Add each URL entry
  for (const entry of sitemapEntries) {
    xml += `  <url>\n`
    xml += `    <loc>${entry.url}</loc>\n`
    
    if (entry.lastModified) {
      const formattedDate = entry.lastModified instanceof Date 
        ? entry.lastModified.toISOString().split('T')[0]
        : entry.lastModified
      xml += `    <lastmod>${formattedDate}</lastmod>\n`
    }
    
    if (entry.priority) {
      xml += `    <priority>${entry.priority}</priority>\n`
    }
    
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`
    }
    
    // Add image entries if they exist
    if (entry.images && entry.images.length > 0) {
      for (const image of entry.images) {
        xml += `    <image:image>\n`
        xml += `      <image:loc>${image.loc}</image:loc>\n`
        
        if (image.title) {
          xml += `      <image:title>${escapeXml(image.title)}</image:title>\n`
        }
        
        if (image.caption) {
          xml += `      <image:caption>${escapeXml(image.caption)}</image:caption>\n`
        }
        
        xml += `    </image:image>\n`
      }
    }
    
    xml += `  </url>\n`
  }
  
  xml += `</urlset>`
  
  // Return the XML with proper content type
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}