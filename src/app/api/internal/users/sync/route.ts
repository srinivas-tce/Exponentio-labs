import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

// POST /api/internal/users/sync - Create/update user profile (manual sync; Inpulse disabled)
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

    // Respect existing schema: users.id is PK; many tables reference users(id) ON DELETE CASCADE.
    // Never delete/recreate a user row — that would cascade-delete proposals, gigs, etc.
    // Flow:
    // - Row exists by email → update that row in place (keep existing id).
    // - Row exists by id only → update by id.
    // - No row → create; for first-time Supabase Auth sign-up, userData.id may be auth.users.id.
    const existingByEmail = await supabaseService.getUserByEmail(userData.email);
    const existingById =
      userData.id && (await supabaseService.getUserById(userData.id));

    let user;
    let isNew = false;

    if (existingByEmail) {
      // Always update the existing profile row; primary key stays as in schema.sql
      user = await supabaseService.updateUser(existingByEmail.id, {
        name: userData.name,
        gender: userData.gender,
        thumbnail: userData.thumbnail,
        email_verified_at: userData.email_verified_at,
      });
    } else if (existingById) {
      user = await supabaseService.updateUser(userData.id, {
        name: userData.name,
        gender: userData.gender,
        thumbnail: userData.thumbnail,
        email_verified_at: userData.email_verified_at,
      });
    } else {
      // New user: use provided id (e.g. auth.users.id) or DB default uuid_generate_v4() via createUser
      user = await supabaseService.createUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role,
        gender: userData.gender,
        thumbnail: userData.thumbnail,
        email_verified_at: userData.email_verified_at,
      });
      isNew = true;
    }

    const { password_hash, password_salt, ...safeUser } = user || {};

    return NextResponse.json({
      status: 'success',
      message: 'User profile synced successfully',
      data: {
        user: safeUser,
        isNew,
        role,
      },
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

    const { password_hash, password_salt, ...safeUser } = user;

    return NextResponse.json({
      status: 'success',
      message: 'User found',
      data: { user: safeUser }
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

    const safeUpdates = { ...updates };
    delete safeUpdates.password_hash;
    delete safeUpdates.password_salt;

    const updatedUser = await supabaseService.updateUser(userId, safeUpdates);
    const { password_hash, password_salt, ...safeUser } = updatedUser || {};

    return NextResponse.json({
      status: 'success',
      message: 'User profile updated successfully',
      data: { user: safeUser }
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
