import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/facilitator/equipment - Get equipment for facilitator's labs
export async function GET(request: NextRequest) {
  try {
    // Get facilitator ID from query parameter or header
    const url = new URL(request.url);
    const facilitatorId = url.searchParams.get('facilitator_id') || 
                         request.headers.get('x-facilitator-id') || 
                         '8fd4f4fc-e119-44e1-a621-a29a296bfafc'; // fallback for testing

    // Get facilitator's labs
    const { data: facilitatorLabs, error: labsError } = await supabase
      .from('facilitator_lab')
      .select('lab_id')
      .eq('facilitator_id', facilitatorId);

    if (labsError) {
      console.error('Error fetching facilitator labs:', labsError);
      return NextResponse.json(
        { error: 'Failed to fetch labs' },
        { status: 500 }
      );
    }

    const labIds = facilitatorLabs?.map(fl => fl.lab_id) || [];

    if (labIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: []
      });
    }

    // Get equipment for facilitator's labs
    const { data: equipment, error } = await supabase
      .from('equipment')
      .select(`
        *,
        labs (name, category, location),
        users!equipment_assigned_to_fkey (name, email)
      `)
      .in('lab_id', labIds)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching equipment:', error);
      return NextResponse.json(
        { error: 'Failed to fetch equipment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: equipment || []
    });

  } catch (error) {
    console.error('Error in facilitator equipment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/facilitator/equipment - Add new equipment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lab_id, name, serial_number, category, condition, purchase_date, cost } = body;
    const facilitatorId = '8fd4f4fc-e119-44e1-a621-a29a296bfafc';

    // Validate required fields
    if (!lab_id || !name || !serial_number || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify facilitator has access to this lab
    const { data: facilitatorLab, error: checkError } = await supabase
      .from('facilitator_lab')
      .select('id')
      .eq('facilitator_id', facilitatorId)
      .eq('lab_id', lab_id)
      .single();

    if (checkError || !facilitatorLab) {
      return NextResponse.json(
        { error: 'Unauthorized to add equipment to this lab' },
        { status: 403 }
      );
    }

    const { data: equipment, error } = await supabase
      .from('equipment')
      .insert({
        lab_id,
        name,
        serial_number,
        category,
        condition,
        purchase_date,
        cost,
        status: 'available'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating equipment:', error);
      return NextResponse.json(
        { error: 'Failed to create equipment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: equipment
    });

  } catch (error) {
    console.error('Error creating equipment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
