import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/facilitator/dashboard - Get facilitator dashboard data
export async function GET(request: NextRequest) {
  try {
    // Get the current user from the request headers or session
    // For now, we'll extract from the Authorization header or use a session-based approach
    const authHeader = request.headers.get('authorization');
    
    // In a real implementation, you would validate the JWT token here
    // For now, we'll use a query parameter to identify the facilitator
    const { searchParams } = new URL(request.url);
    const facilitatorEmail = searchParams.get('email');
    
    if (!facilitatorEmail) {
      return NextResponse.json(
        { error: 'Facilitator email is required' },
        { status: 400 }
      );
    }

    // Get the facilitator user
    const { data: facilitator, error: facilitatorError } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('email', facilitatorEmail)
      .in('role', ['facilitator', 'facility-manager'])
      .single();

    if (facilitatorError || !facilitator) {
      console.error('Error fetching facilitator:', facilitatorError);
      return NextResponse.json(
        { error: 'Facilitator not found' },
        { status: 404 }
      );
    }

    const facilitatorId = facilitator.id;

    // Get facilitator's labs
    const { data: facilitatorLabs, error: labsError } = await supabase
      .from('facilitator_lab')
      .select(`
        lab_id,
        labs (
          id,
          name,
          description,
          category,
          location,
          capacity,
          thumbnail_url
        )
      `)
      .eq('facilitator_id', facilitatorId);

    if (labsError) {
      console.error('Error fetching facilitator labs:', labsError);
      return NextResponse.json(
        { error: 'Failed to fetch labs' },
        { status: 500 }
      );
    }

    const labIds = facilitatorLabs?.map(fl => fl.lab_id) || [];

    // Get facilitator's gigs (only for their labs)
    const { data: gigs, error: gigsError } = await supabase
      .from('gigs')
      .select(`
        *,
        labs (name, category),
        proposals (id, status, student_id, title)
      `)
      .eq('created_by', facilitatorId)
      .in('lab_id', labIds)
      .order('created_at', { ascending: false });

    if (gigsError) {
      console.error('Error fetching gigs:', gigsError);
      return NextResponse.json(
        { error: 'Failed to fetch gigs' },
        { status: 500 }
      );
    }

    // Get equipment requests for facilitator's labs only
    const { data: equipmentRequests, error: requestsError } = await supabase
      .from('equipment_request')
      .select(`
        *,
        equipment (name, serial_number, category, lab_id),
        proposals (title),
        users!equipment_request_student_id_fkey (name, email)
      `)
      .eq('facilitator_id', facilitatorId)
      .order('created_at', { ascending: false });

    if (requestsError) {
      console.error('Error fetching equipment requests:', requestsError);
      return NextResponse.json(
        { error: 'Failed to fetch equipment requests' },
        { status: 500 }
      );
    }

    // Get equipment for facilitator's labs only
    const { data: equipment, error: equipmentError } = await supabase
      .from('equipment')
      .select(`
        *,
        labs (name, category)
      `)
      .in('lab_id', labIds)
      .order('created_at', { ascending: false });

    if (equipmentError) {
      console.error('Error fetching equipment:', equipmentError);
      return NextResponse.json(
        { error: 'Failed to fetch equipment' },
        { status: 500 }
      );
    }

    // Calculate statistics
    const stats = {
      totalLabs: facilitatorLabs?.length || 0,
      totalGigs: gigs?.length || 0,
      openGigs: gigs?.filter(g => g.status === 'open').length || 0,
      totalProposals: gigs?.reduce((sum, g) => sum + (g.proposals?.length || 0), 0) || 0,
      approvedProposals: gigs?.reduce((sum, g) => 
        sum + (g.proposals?.filter((p: any) => p.status === 'approved').length || 0), 0) || 0,
      totalEquipment: equipment?.length || 0,
      availableEquipment: equipment?.filter(e => e.status === 'available').length || 0,
      pendingRequests: equipmentRequests?.filter(r => r.status === 'requested').length || 0
    };

    return NextResponse.json({
      success: true,
      data: {
        facilitator: {
          id: facilitatorId,
          name: facilitator.name,
          email: facilitator.email,
          role: facilitator.role
        },
        labs: facilitatorLabs?.map(fl => fl.labs) || [],
        gigs: gigs || [],
        equipment: equipment || [],
        equipmentRequests: equipmentRequests || [],
        stats
      }
    });

  } catch (error) {
    console.error('Error in facilitator dashboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
