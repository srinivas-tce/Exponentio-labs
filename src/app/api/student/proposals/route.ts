import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id');

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching proposals for student:', studentId);

    // First, let's check if there are any proposals for this student
    const { data: proposals, error } = await supabaseService
      .from('proposals')
      .select('*')
      .eq('student_id', studentId)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching proposals:', error);
      return NextResponse.json(
        { error: 'Failed to fetch proposals', details: error.message },
        { status: 500 }
      );
    }

    console.log('Found proposals:', proposals?.length || 0);

    return NextResponse.json({
      success: true,
      proposals: proposals || []
    });

  } catch (error) {
    console.error('Error fetching student proposals:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
