import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== CONTACT FORM API CALLED ===')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format')
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    console.log('✅ Validation passed')
    console.log('Form data:', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'General Inquiry',
      message: message.trim()
    })

    // For now, just return success without database
    // This will help us confirm the API is working
    console.log('✅ Returning success response')

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Contact form error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
