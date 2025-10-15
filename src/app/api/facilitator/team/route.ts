import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/facilitator/team - Get team members (facilitators) for the same labs
export async function GET(request: NextRequest) {
  try {
    // Get the current facilitator email from query parameters
    const { searchParams } = new URL(request.url);
    const facilitatorEmail = searchParams.get('email');
    
    if (!facilitatorEmail) {
      return NextResponse.json(
        { error: 'Facilitator email is required' },
        { status: 400 }
      );
    }

    // Get the current facilitator
    const { data: currentFacilitator, error: facilitatorError } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('email', facilitatorEmail)
      .in('role', ['facilitator', 'facility-manager'])
      .single();

    if (facilitatorError || !currentFacilitator) {
      console.error('Error fetching current facilitator:', facilitatorError);
      return NextResponse.json(
        { error: 'Current facilitator not found' },
        { status: 404 }
      );
    }

    // Get current facilitator's labs
    const { data: facilitatorLabs, error: labsError } = await supabase
      .from('facilitator_lab')
      .select('lab_id')
      .eq('facilitator_id', currentFacilitator.id);

    if (labsError) {
      console.error('Error fetching facilitator labs:', labsError);
      return NextResponse.json(
        { error: 'Failed to fetch facilitator labs' },
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

    // Get facilitators who are assigned to the same labs
    const { data: facilitators, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        role,
        department,
        experience,
        specialization,
        thumbnail,
        created_at,
        facilitator_lab (
          lab_id,
          labs (name, category)
        )
      `)
      .in('role', ['facilitator', 'facility-manager'])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching facilitators:', error);
      return NextResponse.json(
        { error: 'Failed to fetch facilitators' },
        { status: 500 }
      );
    }

    // Filter facilitators to only include those who share at least one lab with the current facilitator
    const filteredFacilitators = facilitators?.filter(facilitator => {
      const facilitatorLabIds = facilitator.facilitator_lab?.map(fl => fl.lab_id) || [];
      return facilitatorLabIds.some(labId => labIds.includes(labId));
    }) || [];

    return NextResponse.json({
      success: true,
      data: filteredFacilitators
    });

  } catch (error) {
    console.error('Error in facilitator team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/facilitator/team - Create new facilitator
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, department, experience, specialization, lab_ids } = body;

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new facilitator
    const { data: facilitator, error: createError } = await supabase
      .from('users')
      .insert({
        email,
        name,
        role: 'facilitator',
        department,
        experience,
        specialization
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating facilitator:', createError);
      return NextResponse.json(
        { error: 'Failed to create facilitator' },
        { status: 500 }
      );
    }

    // Assign facilitator to labs if lab_ids provided
    if (lab_ids && lab_ids.length > 0) {
      const facilitatorLabInserts = lab_ids.map((labId: string) => ({
        facilitator_id: facilitator.id,
        lab_id: labId
      }));

      const { error: assignError } = await supabase
        .from('facilitator_lab')
        .insert(facilitatorLabInserts);

      if (assignError) {
        console.error('Error assigning facilitator to labs:', assignError);
        // Don't fail the request, just log the error
      }
    }

    return NextResponse.json({
      success: true,
      data: facilitator
    });

  } catch (error) {
    console.error('Error creating facilitator:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
