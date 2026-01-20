import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/labs - Get all labs from Supabase
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    // Build query
    let query = supabase
      .from('labs')
      .select(`
        id,
        name,
        description,
        category,
        location,
        capacity,
        thumbnail_url,
        created_at
      `);

    // Filter by category if provided
    if (category) {
      query = query.eq('category', category);
    }

    const { data: labs, error } = await query.order('name', { ascending: true });

    if (error) {
      console.error('Labs fetch error:', error);
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Failed to fetch labs',
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Labs fetched successfully',
      data: { labs: labs || [] }
    });

  } catch (error) {
    console.error('Error fetching labs:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to fetch labs',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
