import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/services/ar-vr - Get AR/VR service data from Supabase
export async function GET(request: NextRequest) {
  try {
    const labId = '550e8400-e29b-41d4-a716-446655440020';
    
    // Get lab details
    const { data: lab, error: labError } = await supabase
      .from('labs')
      .select('*')
      .eq('id', labId)
      .single();

    if (labError) {
      console.error('Lab fetch error:', labError);
      return NextResponse.json({ error: 'Lab not found' }, { status: 404 });
    }

    // Get gigs for this lab
    const { data: gigs, error: gigsError } = await supabase
      .from('gigs')
      .select(`
        *,
        created_by_user:users!gigs_created_by_fkey(name, email, thumbnail)
      `)
      .eq('lab_id', labId)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (gigsError) {
      console.error('Gigs fetch error:', gigsError);
      return NextResponse.json({ error: 'Failed to fetch gigs' }, { status: 500 });
    }

    // Transform gigs to match the service page format
    const projectProposals = gigs.map(gig => {
      const criteria = typeof gig.eligibility_criteria === 'string' 
        ? JSON.parse(gig.eligibility_criteria) 
        : gig.eligibility_criteria;

      return {
        id: gig.id,
        title: gig.title,
        type: criteria?.experience_level || 'Project',
        duration: criteria?.duration || '6-8 weeks',
        budget: criteria?.budget || 'Contact for pricing',
        description: gig.description,
        skills_required: gig.skills_required,
        eligibility_criteria: criteria,
        application_deadline: gig.application_deadline,
        max_applications: gig.max_applications,
        lab: {
          name: lab.name,
          description: lab.description,
          thumbnail: lab.thumbnail_url
        },
        created_by: {
          name: gig.created_by_user?.name || 'Lab Facilitator',
          email: gig.created_by_user?.email || 'facilitator@ar-vr.exponentio.com',
          thumbnail: gig.created_by_user?.thumbnail || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        created_at: gig.created_at,
        updated_at: gig.updated_at
      };
    });

    return NextResponse.json({
      service: {
        name: 'AR/VR & Metaverse',
        description: 'Create immersive experiences that blend reality with imagination. Our AR/VR and Metaverse solutions deliver cutting-edge virtual experiences that engage and captivate users.',
        lab_name: lab.name,
        lab_description: lab.description,
        lab_thumbnail: lab.thumbnail_url
      },
      project_proposals: projectProposals,
      total_proposals: projectProposals.length
    });

  } catch (error) {
    console.error('Error fetching AR/VR service data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
