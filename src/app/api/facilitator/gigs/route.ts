import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// POST /api/facilitator/gigs - Create a new gig
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      skills_required,
      eligibility_criteria,
      application_deadline,
      max_applications,
      lab_id,
      created_by
    } = body;

    // Validate required fields
    if (!title || !description || !lab_id || !created_by) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Missing required fields (title, description, lab_id, created_by)',
          error: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Validate eligibility criteria structure
    if (eligibility_criteria && Array.isArray(eligibility_criteria)) {
      for (const criteria of eligibility_criteria) {
        if (!criteria.name || !criteria.data_type || !criteria.type) {
          return NextResponse.json(
            { 
              status: 'error',
              message: 'Invalid eligibility criteria structure. Each criteria must have name, data_type, and type.',
              error: 'VALIDATION_ERROR'
            },
            { status: 400 }
          );
        }
      }
    }

    // Create the gig
    const { data: gig, error } = await supabase
      .from('gigs')
      .insert({
        title,
        description,
        skills_required: skills_required || '',
        eligibility_criteria: eligibility_criteria || [],
        application_deadline: application_deadline ? new Date(application_deadline).toISOString() : null,
        max_applications: max_applications || 10,
        lab_id,
        created_by,
        status: 'open',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select(`
        *,
        labs (id, name, description, category),
        created_by_user:users!gigs_created_by_fkey (id, name, email)
      `)
      .single();

    if (error) {
      console.error('Error creating gig:', error);
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Failed to create gig',
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Gig created successfully',
      data: { gig }
    });

  } catch (error) {
    console.error('Error creating gig:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to create gig',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET /api/facilitator/gigs - Get all gigs for a facilitator's labs
export async function GET(request: NextRequest) {
  try {
    // Get the current facilitator email from query parameters
    const { searchParams } = new URL(request.url);
    const facilitatorEmail = searchParams.get('email');
    
    if (!facilitatorEmail) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Facilitator email is required',
          error: 'VALIDATION_ERROR'
        },
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
        { 
          status: 'error',
          message: 'Current facilitator not found',
          error: 'FACILITATOR_NOT_FOUND'
        },
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
        { 
          status: 'error',
          message: 'Failed to fetch facilitator labs',
          error: 'LABS_FETCH_ERROR'
        },
        { status: 500 }
      );
    }

    const labIds = facilitatorLabs?.map(fl => fl.lab_id) || [];

    if (labIds.length === 0) {
      return NextResponse.json({
        status: 'success',
        message: 'No labs assigned to facilitator',
        data: { gigs: [] }
      });
    }

    // Get gigs for the facilitator's labs only
    const { data: gigs, error } = await supabase
      .from('gigs')
      .select(`
        *,
        labs (id, name, description, category),
        created_by_user:users!gigs_created_by_fkey (id, name, email),
        proposals (id, status, submitted_at)
      `)
      .in('lab_id', labIds)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gigs:', error);
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Failed to fetch gigs',
          error: error.message
        },
        { status: 500 }
      );
    }

    // Calculate stats for each gig
    const gigsWithStats = gigs?.map(gig => ({
      ...gig,
      stats: {
        total_proposals: gig.proposals?.length || 0,
        draft: gig.proposals?.filter((p: any) => p.status === 'draft').length || 0,
        submitted: gig.proposals?.filter((p: any) => p.status === 'submitted').length || 0,
        under_review: gig.proposals?.filter((p: any) => p.status === 'under_review').length || 0,
        approved: gig.proposals?.filter((p: any) => p.status === 'approved').length || 0,
        rejected: gig.proposals?.filter((p: any) => p.status === 'rejected').length || 0
      }
    })) || [];

    return NextResponse.json({
      status: 'success',
      message: 'Gigs fetched successfully',
      data: { gigs: gigsWithStats }
    });

  } catch (error) {
    console.error('Error fetching gigs:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to fetch gigs',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}