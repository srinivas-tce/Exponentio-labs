import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

// PUT /api/facilitator/equipment-requests/[id] - Update specific equipment request
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const requestId = params.id;
    const body = await request.json();
    const { status, approval_comments } = body;
    
    // Get facilitator ID from request headers or body
    const facilitatorId = request.headers.get('x-facilitator-id') || 
                         body.facilitator_id || 
                         '8fd4f4fc-e119-44e1-a621-a29a296bfafc'; // fallback for testing

    // Verify request belongs to facilitator
    const { data: requestData, error: checkError } = await supabase
      .from('equipment_request')
      .select(`
        id,
        equipment_id,
        student_id,
        status
      `)
      .eq('id', requestId)
      .eq('facilitator_id', facilitatorId)
      .single();

    if (checkError || !requestData) {
      return NextResponse.json(
        { error: 'Request not found or unauthorized' },
        { status: 404 }
      );
    }

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (approval_comments) {
      updateData.approval_comments = approval_comments;
    }

    if (status === 'approved' || status === 'rejected') {
      updateData.approved_at = new Date().toISOString();
    }

    const { data: updatedRequest, error } = await supabase
      .from('equipment_request')
      .update(updateData)
      .eq('id', requestId)
      .select(`
        *,
        equipment (name, serial_number),
        users!equipment_request_student_id_fkey (name, email)
      `)
      .single();

    if (error) {
      console.error('Error updating equipment request:', error);
      return NextResponse.json(
        { error: 'Failed to update equipment request' },
        { status: 500 }
      );
    }

    // Update equipment status if approved
    if (status === 'approved') {
      await supabase
        .from('equipment')
        .update({ 
          status: 'allocated',
          assigned_to: requestData.student_id
        })
        .eq('id', requestData.equipment_id);
    } else if (status === 'rejected') {
      await supabase
        .from('equipment')
        .update({ status: 'available' })
        .eq('id', requestData.equipment_id);
    }

    // Create notification for student
    await supabase
      .from('notifications')
      .insert({
        user_id: requestData.student_id,
        type: 'equipment_update',
        title: `Equipment Request ${status}`,
        message: `Your equipment request has been ${status}. ${approval_comments ? 'Comments: ' + approval_comments : ''}`,
        status: 'unread'
      });

    return NextResponse.json({
      success: true,
      data: updatedRequest
    });

  } catch (error) {
    console.error('Error updating equipment request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
