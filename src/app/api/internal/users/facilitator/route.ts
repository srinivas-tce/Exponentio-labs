import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

// POST /api/internal/users/facilitator - Create or update facilitator profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userData } = body;

    // Validate required fields
    if (!userData?.id || !userData?.email || !userData?.name || !userData?.specialization) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Missing required user data fields (id, email, name, specialization)',
          error: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Validate email domain for facilitators/facility-managers
    // Allow both @technicalcareer.education and other domains for facility-managers
    const isValidDomain = userData.email.endsWith('@technicalcareer.education') || 
                         userData.role === 'facility-manager';
    
    if (!isValidDomain) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Invalid email domain for facilitator',
          error: 'INVALID_EMAIL_DOMAIN'
        },
        { status: 400 }
      );
    }

    // Check if facilitator already exists
    const exists = await supabaseService.checkFacilitatorExists(userData.email);
    
    let user;
    let isNew = false;
    
    if (exists) {
      // Update existing facilitator
      user = await supabaseService.updateUser(userData.id, {
        name: userData.name,
        gender: userData.gender,
        thumbnail: userData.thumbnail,
        email_verified_at: userData.email_verified_at,
      });
    } else {
      // Create new facilitator
      user = await supabaseService.createFacilitator({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        gender: userData.gender,
        thumbnail: userData.thumbnail,
        email_verified_at: userData.email_verified_at,
      });
      isNew = true;
    }

    return NextResponse.json({
      status: 'success',
      message: isNew ? 'Facilitator profile created' : 'Facilitator profile updated',
      data: { 
        user, 
        isNew,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error managing facilitator profile:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to manage facilitator profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET /api/internal/users/facilitator - Check if facilitator exists
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Email is required',
          error: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Check if user exists and get their role to validate domain
    const existingUser = await supabaseService.getUserByEmail(email);
    
    // Validate email domain for facilitators/facility-managers
    // Allow both @technicalcareer.education and facility-manager roles
    const isValidDomain = email.endsWith('@technicalcareer.education') || 
                         existingUser?.role === 'facility-manager';
    
    if (!isValidDomain) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Invalid email domain for facilitator',
          error: 'INVALID_EMAIL_DOMAIN'
        },
        { status: 400 }
      );
    }

    // Check if facilitator exists
    const exists = await supabaseService.checkFacilitatorExists(email);
    const user = exists ? await supabaseService.getUserByEmail(email) : null;

    return NextResponse.json({
      status: 'success',
      message: 'Facilitator check completed',
      data: { 
        exists,
        user: user || null,
        email: email
      }
    });

  } catch (error) {
    console.error('Error checking facilitator:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to check facilitator',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
