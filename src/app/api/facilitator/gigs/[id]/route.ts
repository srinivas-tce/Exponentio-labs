import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

// GET /api/facilitator/gigs/[id] - Get specific gig with proposals
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const gigId = params.id;
    console.log('🔍 Looking for gig ID:', gigId);

    // Get gig details (simplified query first)
    const { data: gig, error: gigError } = await supabase
      .from('gigs')
      .select('*')
      .eq('id', gigId)
      .single();

    console.log('🎯 Specific gig result:', gig);
    console.log('❌ Specific gig error:', gigError);

    if (gigError) {
      console.error('Gig query error:', gigError);
      return NextResponse.json(
        { error: `Gig query failed: ${gigError.message}` },
        { status: 404 }
      );
    }

    if (!gig) {
      return NextResponse.json(
        { error: 'Gig not found' },
        { status: 404 }
      );
    }

    // Get lab details separately
    const { data: lab, error: labError } = await supabase
      .from('labs')
      .select('name, category, location, description')
      .eq('id', gig.lab_id)
      .single();

    // Get proposals separately
    const { data: proposals, error: proposalsError } = await supabase
      .from('proposals')
      .select(`
        id,
        title,
        problem_statement,
        approach,
        expected_outcome,
        timeline,
        equipment_needed,
        status,
        review_comments,
        submitted_at,
        reviewed_at,
        github_link,
        attachment_url,
        score,
        student_id,
        users!proposals_student_id_fkey (name, email, department, experience)
      `)
      .eq('gig_id', gigId);

    // Combine the data
    const gigWithDetails = {
      ...gig,
      labs: lab,
      proposals: proposals || []
    };

    // Calculate proposal statistics
    const proposalsList = gigWithDetails.proposals || [];
    const stats = {
      total: proposalsList.length,
      draft: proposalsList.filter(p => p.status === 'draft').length,
      submitted: proposalsList.filter(p => p.status === 'submitted').length,
      under_review: proposalsList.filter(p => p.status === 'under_review').length,
      approved: proposalsList.filter(p => p.status === 'approved').length,
      rejected: proposalsList.filter(p => p.status === 'rejected').length
    };

    return NextResponse.json({
      success: true,
      data: {
        ...gigWithDetails,
        stats
      }
    });

  } catch (error) {
    console.error('Error fetching gig details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/facilitator/gigs/[id] - Update gig
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const gigId = params.id;
    const body = await request.json();

    // Get facilitator ID from request headers or body
    const facilitatorId = request.headers.get('x-facilitator-id') || body.facilitator_id;
    
    if (!facilitatorId) {
      return NextResponse.json(
        { error: 'Facilitator ID is required' },
        { status: 400 }
      );
    }

    // Verify gig belongs to facilitator
    const { data: existingGig, error: checkError } = await supabase
      .from('gigs')
      .select('id')
      .eq('id', gigId)
      .eq('created_by', facilitatorId)
      .single();

    if (checkError || !existingGig) {
      return NextResponse.json(
        { error: 'Gig not found or unauthorized' },
        { status: 404 }
      );
    }

    const { data: gig, error } = await supabase
      .from('gigs')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', gigId)
      .select()
      .single();

    if (error) {
      console.error('Error updating gig:', error);
      return NextResponse.json(
        { error: 'Failed to update gig' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: gig
    });

  } catch (error) {
    console.error('Error updating gig:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
