import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/labs/idea-labs - Get Idea Labs data from Supabase
export async function GET(request: NextRequest) {
  try {
    const labId = '550e8400-e29b-41d4-a716-446655440040';
    
    const { data: lab, error: labError } = await supabase
      .from('labs')
      .select(`
        *,
        facilitator_lab!inner(
          facilitator:users(name, email, thumbnail)
        )
      `)
      .eq('id', labId)
      .single();

    if (labError) {
      return NextResponse.json({ error: 'Lab not found' }, { status: 404 });
    }

    const { data: gigs, error: gigsError } = await supabase
      .from('gigs')
      .select(`
        *,
        created_by_user:users!gigs_created_by_fkey(name, email)
      `)
      .eq('lab_id', labId)
      .order('created_at', { ascending: false });

    if (gigsError) {
      return NextResponse.json({ error: 'Failed to fetch gigs' }, { status: 500 });
    }

    const { data: equipment, error: equipmentError } = await supabase
      .from('equipment')
      .select(`
        *,
        assigned_to_user:users!equipment_assigned_to_fkey(name)
      `)
      .eq('lab_id', labId)
      .order('created_at', { ascending: false });

    if (equipmentError) {
      return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
    }

    const facilitator = lab.facilitator_lab?.[0]?.facilitator;

    return NextResponse.json({
      lab: {
        ...lab,
        facilitator: facilitator ? {
          name: facilitator.name,
          email: facilitator.email,
          thumbnail: facilitator.thumbnail
        } : null
      },
      gigs: gigs.map(gig => ({
        ...gig,
        eligibility_criteria: typeof gig.eligibility_criteria === 'string' 
          ? JSON.parse(gig.eligibility_criteria) 
          : gig.eligibility_criteria,
        created_by_user: {
          name: gig.created_by_user?.name,
          email: gig.created_by_user?.email
        }
      })),
      equipment: equipment.map(item => ({
        ...item,
        assigned_to_user: item.assigned_to_user ? {
          name: item.assigned_to_user.name
        } : null
      }))
    });

  } catch (error) {
    console.error('Error fetching Idea Labs data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
