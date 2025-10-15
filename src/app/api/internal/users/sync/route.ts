import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

// POST /api/internal/users/sync - Sync user profile from Inpulse
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userData } = body;

    // Validate required fields
    if (!userData?.id || !userData?.email || !userData?.name) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Missing required user data fields (id, email, name)',
          error: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Determine user role based on email domain
    let role: 'student' | 'facilitator' | 'facility-manager' | 'admin' = 'student';
    if (userData.email.endsWith('@technicalcareer.education')) {
      role = 'facilitator';
    }

    // Check if user already exists
    const existingUser = await supabaseService.getUserByEmail(userData.email);
    
    let user;
    if (existingUser) {
      // Update existing user
      user = await supabaseService.updateUser(userData.id, {
        name: userData.name,
        gender: userData.gender,
        thumbnail: userData.thumbnail,
        email_verified_at: userData.email_verified_at,
      });
    } else {
      // Create new user
      user = await supabaseService.createUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: role,
        gender: userData.gender,
        thumbnail: userData.thumbnail,
        email_verified_at: userData.email_verified_at,
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'User profile synced successfully',
      data: {
        user: user,
        isNew: !existingUser,
        role: role
      }
    });

  } catch (error) {
    console.error('Error syncing user profile:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to sync user profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET /api/internal/users/sync - Get user by ID or email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');

    if (!userId && !email) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Either userId or email is required',
          error: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    let user;
    if (userId) {
      user = await supabaseService.getUserById(userId);
    } else if (email) {
      user = await supabaseService.getUserByEmail(email);
    }

    if (!user) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'User not found',
          error: 'USER_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'User found',
      data: { user }
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to fetch user',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT /api/internal/users/sync - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'User ID is required',
          error: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Update user profile
    const updatedUser = await supabaseService.updateUser(userId, updates);

    return NextResponse.json({
      status: 'success',
      message: 'User profile updated successfully',
      data: { user: updatedUser }
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to update user profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
