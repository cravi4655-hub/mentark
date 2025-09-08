import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

const supabaseUrl = 'https://nfclssexacbbjmqhplal.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mY2xzc2V4YWNiYmptcWhwbGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NTExNTgsImV4cCI6MjA3MjQyNzE1OH0.QPVOf1sZm_BmJ0ZwG1Xd1Ek44bTYeU_7b2X-la3Ix3Y'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')
    const { responses, userType, userId } = await request.json()
    console.log('Data received:', { userType, userId, responsesCount: Object.keys(responses).length })
    
    // Generate a proper UUID
    const properUserId = randomUUID()
    console.log('Generated UUID:', properUserId)
    
    // First, create a user record
    console.log('Creating user record...')
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: properUserId,
          email: `user_${Date.now()}@mentark.com`,
          created_at: new Date().toISOString()
        }
      ])

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json({ error: 'Failed to create user', details: userError }, { status: 500 })
    }

    console.log('User created successfully')
    
    // Now save training responses
    console.log('Saving training responses...')
    const { data, error } = await supabase
      .from('training_responses')
      .insert([
        {
          user_id: properUserId,
          user_type: userType,
          responses: responses,
          completed_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Training responses error:', error)
      return NextResponse.json({ error: 'Failed to save responses', details: error }, { status: 500 })
    }

    console.log('Successfully saved to Supabase')
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}