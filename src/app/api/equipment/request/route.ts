import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// POST /api/equipment/request - Create equipment request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { equipment_id, purpose, start_date, end_date, quantity } = body;

    // Validate required fields
    if (!equipment_id || !purpose || !start_date || !end_date || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate dates
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    if (endDate < startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Check if equipment exists and is available
    const { data: equipment, error: equipmentError } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', equipment_id)
      .single();

    if (equipmentError || !equipment) {
      return NextResponse.json(
        { error: 'Equipment not found' },
        { status: 404 }
      );
    }

    if (equipment.status !== 'available') {
      return NextResponse.json(
        { error: 'Equipment is not available for request' },
        { status: 400 }
      );
    }

    // Get facilitator for the lab (from equipment's lab_id)
    const { data: facilitatorData, error: facilitatorError } = await supabase
      .from('facilitator_lab')
      .select('facilitator_id')
      .eq('lab_id', equipment.lab_id)
      .single();

    if (facilitatorError || !facilitatorData) {
      return NextResponse.json(
        { error: 'No facilitator found for this lab' },
        { status: 400 }
      );
    }

    // For now, we'll use a placeholder student ID since we don't have authentication
    // In a real application, this would come from the authenticated user
    const studentId = 'd27586ec-03ce-4a21-b1f4-7ded1c312d01'; // Placeholder student ID

    // Create a minimal proposal first since proposal_id is required
    const { data: proposalData, error: proposalError } = await supabase
      .from('proposals')
      .insert({
        gig_id: '550e8400-e29b-41d4-a716-446655440003', // Use a default gig ID
        lab_id: equipment.lab_id,
        student_id: studentId,
        title: `Equipment Request: ${equipment.name}`,
        problem_statement: purpose,
        approach: 'Equipment request for project work',
        expected_outcome: 'Successful completion of project with required equipment',
        status: 'draft'
      })
      .select()
      .single();

    if (proposalError) {
      console.error('Error creating proposal for equipment request:', proposalError);
      return NextResponse.json(
        { error: 'Failed to create proposal for equipment request' },
        { status: 500 }
      );
    }

    // Create equipment request with the proposal ID
    const { data: requestData, error: requestError } = await supabase
      .from('equipment_request')
      .insert({
        proposal_id: proposalData.id,
        equipment_id,
        student_id: studentId,
        facilitator_id: facilitatorData.facilitator_id,
        quantity,
        purpose,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        status: 'requested'
      })
      .select()
      .single();

    if (requestError) {
      console.error('Equipment request creation error:', requestError);
      return NextResponse.json(
        { error: 'Failed to create equipment request' },
        { status: 500 }
      );
    }

    // Update equipment status to requested
    await supabase
      .from('equipment')
      .update({ status: 'requested' })
      .eq('id', equipment_id);

    // Create notification for facilitator
    await supabase
      .from('notifications')
      .insert({
        user_id: facilitatorData.facilitator_id,
        type: 'equipment_update',
        title: 'New Equipment Request',
        message: `New equipment request for ${equipment.name} from student. Please review and approve.`,
        status: 'unread'
      });

    return NextResponse.json({
      success: true,
      message: 'Equipment request submitted successfully',
      request_id: requestData.id,
      data: {
        equipment_name: equipment.name,
        start_date,
        end_date,
        quantity,
        status: 'requested'
      }
    });

  } catch (error) {
    console.error('Error creating equipment request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
