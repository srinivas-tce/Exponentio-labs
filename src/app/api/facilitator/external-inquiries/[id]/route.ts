import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/facilitator/external-inquiries/[id] - Get single inquiry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Verify user is authorized
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

    const { data: inquiry, error } = await supabase
      .from('external_inquiries')
      .select(`
        *,
        preferred_lab:labs(id, name, category, description),
        assigned_user:users!external_inquiries_assigned_to_fkey(id, name, email)
      `)
      .eq('id', id)
      .single();

    if (error || !inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry,
    });

  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/facilitator/external-inquiries/[id] - Update inquiry status/assignment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, assigned_to, response_notes } = body;

    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Verify user is authorized
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, role')
      .eq('email', email)
      .in('role', ['facility-manager', 'facilitator', 'admin'])
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get current inquiry
    const { data: currentInquiry, error: fetchError } = await supabase
      .from('external_inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !currentInquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    // Build update object
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updateData.status = status;
      if (status === 'responded' || status === 'approved' || status === 'rejected') {
        updateData.responded_at = new Date().toISOString();
      }
    }

    if (assigned_to !== undefined) {
      updateData.assigned_to = assigned_to || null;
    }

    if (response_notes !== undefined) {
      updateData.response_notes = response_notes || null;
    }

    // Update inquiry
    const { data: updatedInquiry, error: updateError } = await supabase
      .from('external_inquiries')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        preferred_lab:labs(id, name, category),
        assigned_user:users!external_inquiries_assigned_to_fkey(id, name, email)
      `)
      .single();

    if (updateError) {
      console.error('Error updating inquiry:', updateError);
      return NextResponse.json(
        { error: 'Failed to update inquiry' },
        { status: 500 }
      );
    }

    // Create notification for the company contact if status changed
    if (status && status !== currentInquiry.status) {
      // Note: We can't directly notify external companies, but we could send an email
      // For now, we'll just log it or handle it separately
      console.log(`Inquiry ${id} status changed from ${currentInquiry.status} to ${status}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: updatedInquiry,
    });

  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


