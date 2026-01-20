import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';

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
      let criteria: any = null;
      let budget = 'Contact for pricing';
      
      // Parse eligibility_criteria
      if (gig.eligibility_criteria) {
        if (typeof gig.eligibility_criteria === 'string') {
          try {
            criteria = JSON.parse(gig.eligibility_criteria);
          } catch (e) {
            console.error('Error parsing eligibility_criteria:', e);
            criteria = null;
          }
        } else {
          criteria = gig.eligibility_criteria;
        }
        
        // Extract budget from criteria object
        if (criteria && typeof criteria === 'object' && criteria.budget) {
          budget = criteria.budget;
        }
      }

      return {
        id: gig.id,
        title: gig.title,
        type: criteria?.experience_level || 'Project',
        duration: criteria?.duration || '6-8 weeks',
        budget: budget,
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

    const response = NextResponse.json({
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

    // Disable all caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;

  } catch (error) {
    console.error('Error fetching AR/VR service data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
