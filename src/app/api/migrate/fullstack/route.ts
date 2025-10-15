import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '../../../../lib/supabase';

// POST /api/migrate/fullstack - Insert Full Stack data into Supabase
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting Full Stack data migration...');

    // Test connection first
    const connectionTest = await supabaseService.testConnection();
    if (!connectionTest.success) {
      throw new Error(`Connection failed: ${connectionTest.message}`);
    }
    console.log('✅ Supabase connection successful');

    // Create facilitator user
    const facilitatorData = {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'facilitator@fullstack.exponentio.com',
      name: 'Full Stack Lab Facilitator',
      role: 'facilitator' as const,
      gender: 'Other',
      phone: '+1-555-0123',
      department: 'Computer Science',
      experience: 8,
      specialization: 'Full Stack Development, MERN Stack, Web Applications',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email_verified_at: new Date().toISOString()
    };

    const facilitator = await supabaseService.createFacilitator(facilitatorData);
    console.log('✅ Created facilitator:', facilitator.name);

    return NextResponse.json({
      status: 'success',
      message: 'Full Stack facilitator created successfully!',
      data: {
        facilitator: facilitator,
        nextSteps: [
          'Use Supabase dashboard to manually create labs, gigs, and equipment',
          'Or run individual SQL commands through Supabase SQL editor',
          'Test the API endpoints once data is in place'
        ],
        sqlCommands: `
-- Insert Lab
INSERT INTO labs (id, name, description, category, location, capacity, thumbnail_url, created_at, updated_at)
VALUES (
  'lab-fullstack-001',
  'Full Stack Development Lab',
  'Web and application development laboratory featuring high-performance workstations, GPU processing units, and comprehensive software development tools for modern full-stack development.',
  'software',
  'Building A, Floor 2, Room 201',
  20,
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
  NOW(),
  NOW()
);

-- Assign facilitator to lab
INSERT INTO facilitator_lab (facilitator_id, lab_id, assigned_at)
VALUES ('facilitator-fullstack-001', 'lab-fullstack-001', NOW());
        `
      }
    });

  } catch (error) {
    console.error('❌ Migration failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
