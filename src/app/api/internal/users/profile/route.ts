import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Custom profile API (no Inpulse).
 * GET  - same as GET /api/internal/users/sync?userId= / ?email=
 * PUT  - same as PUT /api/internal/users/sync (userId + updates)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');

    if (!userId && !email) {
      return NextResponse.json(
        { status: 'error', message: 'Either userId or email is required' },
        { status: 400 }
      );
    }

    let user;
    if (userId) {
      user = await supabaseService.getUserById(userId);
    } else {
      user = await supabaseService.getUserByEmail(email!);
    }

    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'User not found' },
        { status: 404 }
      );
    }

    // Never expose password fields to client
    const { password_hash, password_salt, ...safeUser } = user;

    return NextResponse.json({
      status: 'success',
      message: 'User found',
      data: { user: safeUser },
    });
  } catch (error) {
    console.error('profile GET error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId) {
      return NextResponse.json(
        { status: 'error', message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Block updating password through this endpoint
    const safeUpdates = { ...updates };
    delete safeUpdates.password_hash;
    delete safeUpdates.password_salt;

    const updatedUser = await supabaseService.updateUser(userId, safeUpdates);
    const { password_hash, password_salt, ...safeUser } = updatedUser || {};

    return NextResponse.json({
      status: 'success',
      message: 'Profile updated',
      data: { user: safeUser },
    });
  } catch (error) {
    console.error('profile PUT error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
