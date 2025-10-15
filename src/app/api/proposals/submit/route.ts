import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper function to validate URLs
function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      gig_id,
      lab_id,
      student_id,
      title,
      problem_statement,
      approach,
      expected_outcome,
      timeline,
      equipment_needed,
      github_link,
      attachment_url
    } = body;

    // Validate required fields
    if (!gig_id || !lab_id || !student_id || !title || !problem_statement || !approach || !expected_outcome) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (title.length > 255) {
      return NextResponse.json(
        { error: 'Proposal title must be 255 characters or less' },
        { status: 400 }
      );
    }

    if (problem_statement.length > 5000) {
      return NextResponse.json(
        { error: 'Problem statement must be 5000 characters or less' },
        { status: 400 }
      );
    }

    if (approach.length > 5000) {
      return NextResponse.json(
        { error: 'Technical approach must be 5000 characters or less' },
        { status: 400 }
      );
    }

    if (expected_outcome.length > 5000) {
      return NextResponse.json(
        { error: 'Expected outcome must be 5000 characters or less' },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    if (github_link && !isValidUrl(github_link)) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL format' },
        { status: 400 }
      );
    }

    if (attachment_url && !isValidUrl(attachment_url)) {
      return NextResponse.json(
        { error: 'Invalid attachment URL format' },
        { status: 400 }
      );
    }

    // Check if gig exists and is still open
    const { data: gig, error: gigError } = await supabase
      .from('gigs')
      .select('id, status, application_deadline, max_applications')
      .eq('id', gig_id)
      .single();

    if (gigError || !gig) {
      return NextResponse.json(
        { error: 'Gig not found' },
        { status: 404 }
      );
    }

    if (gig.status !== 'open') {
      return NextResponse.json(
        { error: 'This gig is no longer accepting applications' },
        { status: 400 }
      );
    }

    // Check if application deadline has passed (strict checking)
    const now = new Date();
    const deadline = new Date(gig.application_deadline);
    
    if (deadline <= now) {
      return NextResponse.json(
        { 
          error: 'Application deadline has passed',
          details: {
            deadline: gig.application_deadline,
            current_time: now.toISOString(),
            time_remaining: deadline.getTime() - now.getTime()
          }
        },
        { status: 400 }
      );
    }

    // Check if student has already submitted a proposal for this gig
    const { data: existingProposal, error: existingError } = await supabase
      .from('proposals')
      .select('id')
      .eq('gig_id', gig_id)
      .eq('student_id', student_id)
      .single();

    if (existingProposal) {
      return NextResponse.json(
        { error: 'You have already submitted a proposal for this gig' },
        { status: 400 }
      );
    }

    // Check max applications limit
    if (gig.max_applications) {
      const { count: proposalCount, error: countError } = await supabase
        .from('proposals')
        .select('*', { count: 'exact', head: true })
        .eq('gig_id', gig_id);

      if (countError) {
        return NextResponse.json(
          { error: 'Failed to check application limit' },
          { status: 500 }
        );
      }

      if (proposalCount && proposalCount >= gig.max_applications) {
        return NextResponse.json(
          { error: 'Maximum number of applications reached for this gig' },
          { status: 400 }
        );
      }
    }

    // Set timeline to empty object if not provided
    let parsedTimeline = timeline || {};
    if (typeof timeline === 'string') {
      try {
        parsedTimeline = JSON.parse(timeline);
      } catch (error) {
        // If timeline is not valid JSON, use empty object
        parsedTimeline = {};
      }
    }

    // Create the proposal
    const { data: proposal, error: proposalError } = await supabase
      .from('proposals')
      .insert({
        gig_id,
        lab_id,
        student_id,
        title,
        problem_statement,
        approach,
        expected_outcome,
        timeline: parsedTimeline,
        equipment_needed: equipment_needed || false,
        github_link: github_link || null,
        attachment_url: attachment_url || null,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (proposalError) {
      console.error('Error creating proposal:', proposalError);
      return NextResponse.json(
        { error: 'Failed to submit proposal' },
        { status: 500 }
      );
    }

    // Create notification for the facilitator
    const { data: gigData } = await supabase
      .from('gigs')
      .select('created_by')
      .eq('id', gig_id)
      .single();

    if (gigData?.created_by) {
      await supabase
        .from('notifications')
        .insert({
          user_id: gigData.created_by,
          type: 'proposal_update',
          title: 'New Proposal Submitted',
          message: `A new proposal has been submitted for "${title}"`,
          status: 'unread'
        });
    }

    return NextResponse.json({
      success: true,
      proposal,
      message: 'Proposal submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
