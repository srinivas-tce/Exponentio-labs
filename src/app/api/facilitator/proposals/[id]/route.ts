import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

// PUT /api/facilitator/proposals/[id] - Update proposal status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const proposalId = params.id;
    const body = await request.json();
    const { status, review_comments, score } = body;
    
    // Get facilitator ID from request headers or body
    const facilitatorId = request.headers.get('x-facilitator-id') || 
                         body.facilitator_id || 
                         '8fd4f4fc-e119-44e1-a621-a29a296bfafc'; // fallback for testing

    // Verify proposal belongs to facilitator's gig
    const { data: proposal, error: checkError } = await supabase
      .from('proposals')
      .select(`
        id,
        gig_id,
        student_id,
        gigs!inner (created_by)
      `)
      .eq('id', proposalId)
      .eq('gigs.created_by', facilitatorId)
      .single();

    if (checkError || !proposal) {
      return NextResponse.json(
        { error: 'Proposal not found or unauthorized' },
        { status: 404 }
      );
    }

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (review_comments) {
      updateData.review_comments = review_comments;
    }

    if (score !== undefined) {
      updateData.score = score;
    }

    if (status === 'approved' || status === 'rejected') {
      updateData.reviewed_at = new Date().toISOString();
    }

    const { data: updatedProposal, error } = await supabase
      .from('proposals')
      .update(updateData)
      .eq('id', proposalId)
      .select(`
        *,
        users!proposals_student_id_fkey (name, email)
      `)
      .single();

    if (error) {
      console.error('Error updating proposal:', error);
      return NextResponse.json(
        { error: 'Failed to update proposal' },
        { status: 500 }
      );
    }

    // Create notification for student
    await supabase
      .from('notifications')
      .insert({
        user_id: proposal.student_id,
        type: 'proposal_update',
        title: `Proposal ${status}`,
        message: `Your proposal has been ${status}. ${review_comments ? 'Comments: ' + review_comments : ''}`,
        status: 'unread'
      });

    return NextResponse.json({
      success: true,
      data: updatedProposal
    });

  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
