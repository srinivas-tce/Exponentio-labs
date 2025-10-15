import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test 1: Basic connection test
    console.log('\n1. Testing Supabase connection...');
    const connectionTest = await supabaseService.testConnection();
    
    if (!connectionTest.success) {
      throw new Error(connectionTest.message);
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('Connection test result:', connectionTest.message);

    // Test 2: Select all users
    console.log('\n2. Testing SELECT * FROM users...');
    const users = await supabaseService.query('SELECT * FROM users');
    console.log('✅ Users query successful!');
    console.log('Number of users:', users.length);
    console.log('Users data:', users);

    return NextResponse.json({
      status: 'success',
      message: 'Supabase connection test completed successfully!',
      data: {
        connection: '✅ Connected to Supabase',
        usersCount: users.length,
        users: users,
        connectionTest: connectionTest.message
      }
    });

  } catch (error) {
    console.error('❌ Supabase connection test failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Supabase connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      data: {
        connection: '❌ Failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 });
  }
}
