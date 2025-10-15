import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gigId = params.id;

    if (!gigId) {
      return NextResponse.json(
        { error: 'Gig ID is required' },
        { status: 400 }
      );
    }

    // Fetch gig with related data
    const { data: gig, error: gigError } = await supabase
      .from('gigs')
      .select(`
        id,
        title,
        description,
        skills_required,
        eligibility_criteria,
        status,
        application_deadline,
        max_applications,
        created_at,
        updated_at,
        labs:lab_id (
          id,
          name,
          description,
          thumbnail_url
        ),
        created_by:created_by (
          id,
          name,
          email,
          thumbnail
        )
      `)
      .eq('id', gigId)
      .single();

    if (gigError || !gig) {
      return NextResponse.json(
        { error: 'Gig not found' },
        { status: 404 }
      );
    }

    // Parse eligibility criteria if it's a string
    let eligibilityCriteria = gig.eligibility_criteria;
    if (typeof eligibilityCriteria === 'string') {
      try {
        eligibilityCriteria = JSON.parse(eligibilityCriteria);
      } catch (error) {
        console.error('Error parsing eligibility criteria:', error);
        eligibilityCriteria = {};
      }
    }

    // Format the response
    const formattedGig = {
      ...gig,
      lab: {
        id: gig.labs.id,
        name: gig.labs.name,
        description: gig.labs.description,
        thumbnail: gig.labs.thumbnail_url
      },
      created_by: {
        name: gig.created_by.name,
        email: gig.created_by.email,
        thumbnail: gig.created_by.thumbnail
      },
      eligibility_criteria: eligibilityCriteria
    };

    // Remove the original nested objects
    delete formattedGig.labs;
    delete formattedGig.created_by;

    return NextResponse.json({
      success: true,
      data: formattedGig
    });

  } catch (error) {
    console.error('Error fetching gig:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
