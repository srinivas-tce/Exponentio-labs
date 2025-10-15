import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '../../../../lib/supabase';

// POST /api/migrate/add-equipment-image-column - Add image_url column to equipment table
export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Adding image_url column to equipment table...');

    // Test connection first
    const connectionTest = await supabaseService.testConnection();
    if (!connectionTest.success) {
      throw new Error(`Connection failed: ${connectionTest.message}`);
    }
    console.log('✅ Supabase connection successful');

    const { supabase } = await import('../../../../lib/supabase');
    
    // Add image_url column to equipment table
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE equipment ADD COLUMN image_url TEXT;'
    });

    if (error) {
      console.error('Failed to add image_url column:', error);
      return NextResponse.json({
        status: 'error',
        message: 'Failed to add image_url column',
        error: error.message
      }, { status: 500 });
    }

    console.log('✅ Successfully added image_url column to equipment table');

    return NextResponse.json({
      status: 'success',
      message: 'Successfully added image_url column to equipment table',
      data: { columnAdded: true }
    });

  } catch (error) {
    console.error('❌ Failed to add image_url column:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to add image_url column',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
