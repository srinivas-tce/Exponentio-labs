import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/facilitator/external-inquiries - Get external inquiries for facility managers
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const status = url.searchParams.get('status');
    const assignedToMe = url.searchParams.get('assigned_to_me') === 'true';

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Get the facility manager user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, role')
      .eq('email', email)
      .in('role', ['facility-manager', 'facilitator', 'admin'])
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Only facility managers, facilitators, and admins can access this.' },
        { status: 403 }
      );
    }

    // Build query
    let query = supabase
      .from('external_inquiries')
      .select(`
        *,
        preferred_lab:labs(id, name, category),
        assigned_user:users!external_inquiries_assigned_to_fkey(id, name, email)
      `)
      .order('created_at', { ascending: false });

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by assigned to me if requested
    if (assignedToMe) {
      query = query.eq('assigned_to', user.id);
    }

    const { data: inquiries, error } = await query;

    if (error) {
      console.error('Error fetching external inquiries:', error);
      return NextResponse.json(
        { error: 'Failed to fetch inquiries' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiries || [],
    });

  } catch (error) {
    console.error('Error in external inquiries GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

