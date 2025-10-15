import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '../../../../lib/supabase';

// POST /api/migrate/fullstack-complete - Complete Full Stack data migration following schema.sql
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting Complete Full Stack data migration following schema.sql...');

    // Test connection first
    const connectionTest = await supabaseService.testConnection();
    if (!connectionTest.success) {
      throw new Error(`Connection failed: ${connectionTest.message}`);
    }
    console.log('✅ Supabase connection successful');

    // Use existing facilitator ID
    const facilitatorId = '8fd4f4fc-e119-44e1-a621-a29a296bfafc';
    
    // Verify facilitator exists
    const facilitator = await supabaseService.getUserById(facilitatorId);
    if (!facilitator) {
      throw new Error('Facilitator not found. Please ensure the facilitator exists first.');
    }
    console.log('✅ Using existing facilitator:', facilitator.name);

    // 1. Create lab following schema.sql exactly
    const labId = '550e8400-e29b-41d4-a716-446655440002';
    const labData = {
      id: labId,
      name: 'Full Stack Development Lab',
      description: 'Web and application development laboratory featuring high-performance workstations, GPU processing units, and comprehensive software development tools for modern full-stack development.',
      category: 'software', // lab_category enum
      location: 'Building A, Floor 2, Room 201',
      capacity: 20,
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    };

    // Insert lab using raw SQL through Supabase
    const { supabase } = await import('../../../../lib/supabase');
    
    const { data: lab, error: labError } = await supabase
      .from('labs')
      .upsert(labData)
      .select()
      .single();

    if (labError) {
      throw new Error(`Failed to create lab: ${labError.message}`);
    }
    console.log('✅ Created lab:', lab.name);

    // 2. Assign facilitator to lab (facilitator_lab table)
    const { error: facilitatorLabError } = await supabase
      .from('facilitator_lab')
      .upsert({
        facilitator_id: facilitatorId,
        lab_id: labId,
        assigned_at: new Date().toISOString()
      });

    if (facilitatorLabError) {
      console.warn('⚠️ Warning: Could not assign facilitator to lab:', facilitatorLabError.message);
    } else {
      console.log('✅ Assigned facilitator to lab');
    }

    // 3. Create gigs following schema.sql exactly
    const gigs = [
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        lab_id: labId,
        title: 'MERN Stack E-Commerce Website',
        description: 'Modern, scalable, and secure e-commerce platform with payment integration, product catalog, shopping cart, and order management.',
        skills_required: 'React.js, Node.js, Express.js, MongoDB, JWT Authentication, Payment Gateway Integration',
        eligibility_criteria: {
          experience_level: 'Intermediate',
          prerequisites: ['JavaScript', 'React Basics', 'Node.js Basics'],
          duration: '6 weeks',
          budget: '$2,100 USD',
          features: [
            'Responsive user interface with product catalog',
            'Shopping cart and wishlist functionality',
            'Customer authentication with JWT',
            'Payment gateway integration (Stripe/PayPal)',
            'Admin panel for product and order management',
            'Real-time order tracking'
          ],
          tech_stack: [
            'Frontend: React.js, Redux, TailwindCSS',
            'Backend: Node.js, Express.js',
            'Database: MongoDB Atlas',
            'Authentication: JWT / OAuth',
            'Payments: Stripe or PayPal',
            'Hosting: Vercel + Render/Heroku'
          ]
        },
        status: 'open', // gig_status enum
        application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 5,
        created_by: facilitatorId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        lab_id: labId,
        title: 'MERN Stack Business Dashboard',
        description: 'Secure, scalable business analytics dashboard with KPIs visualization, user management, sales tracking, and report generation.',
        skills_required: 'React.js, Redux, Chart.js, Node.js, Express.js, MongoDB, JWT Authentication',
        eligibility_criteria: {
          experience_level: 'Intermediate',
          prerequisites: ['JavaScript', 'React Basics', 'Data Visualization'],
          duration: '5 weeks',
          budget: '$1,900 USD',
          features: [
            'Modern responsive UI with charts and graphs',
            'Customizable widgets and filters',
            'Role-based user access (admin, staff)',
            'Real-time data updates and notifications',
            'Exportable reports (CSV, PDF)',
            'Sales and revenue analysis with time filters'
          ],
          tech_stack: [
            'Frontend: React.js, Redux, TailwindCSS, Chart.js',
            'Backend: Node.js, Express.js',
            'Database: MongoDB Atlas',
            'Authentication: JWT / OAuth',
            'Charts: Chart.js/Recharts',
            'Hosting: Vercel + Render/Heroku'
          ]
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 4,
        created_by: facilitatorId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        lab_id: labId,
        title: 'MERN Stack Social Media Platform',
        description: 'Scalable social media/community platform with real-time chat, posts, comments, user profiles, and content moderation.',
        skills_required: 'React.js, Redux, Socket.io, Node.js, Express.js, MongoDB, Real-time Communication',
        eligibility_criteria: {
          experience_level: 'Advanced',
          prerequisites: ['JavaScript', 'React Advanced', 'WebSockets', 'Real-time Systems'],
          duration: '6 weeks',
          budget: '$2,300 USD',
          features: [
            'Account registration and secure login',
            'Create, edit, and delete posts (text, images, links)',
            'Like, comment, and share functionality',
            'Real-time chat and notifications',
            'User profiles with followers/following',
            'Admin panel for content moderation'
          ],
          tech_stack: [
            'Frontend: React.js, Redux, TailwindCSS',
            'Backend: Node.js, Express.js, Socket.io',
            'Database: MongoDB Atlas',
            'Authentication: JWT / OAuth (Google, Facebook)',
            'Real-time: Socket.io/WebSockets',
            'Hosting: Vercel + Render/Heroku'
          ]
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 3,
        created_by: facilitatorId
      }
    ];

    // Insert gigs
    for (const gig of gigs) {
      const { error: gigError } = await supabase
        .from('gigs')
        .upsert({
          ...gig,
          eligibility_criteria: JSON.stringify(gig.eligibility_criteria)
        });

      if (gigError) {
        console.error(`❌ Failed to create gig ${gig.title}:`, gigError.message);
      } else {
        console.log(`✅ Created gig: ${gig.title}`);
      }
    }

    // 4. Create equipment following schema.sql exactly
    const equipment = [
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        lab_id: labId,
        name: 'Development Workstation Setup',
        serial_number: 'WS-FS-001',
        category: 'Computer Workstation',
        status: 'available', // equipment_status enum
        condition: 'Excellent',
        purchase_date: '2024-01-15',
        cost: 2500.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        lab_id: labId,
        name: 'Development Workstation Setup',
        serial_number: 'WS-FS-002',
        category: 'Computer Workstation',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-01-15',
        cost: 2500.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        lab_id: labId,
        name: 'GPU Processing Unit 16GB',
        serial_number: 'GPU-FS-001',
        category: 'Graphics Processing',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-02-01',
        cost: 1200.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440009',
        lab_id: labId,
        name: 'Software Licenses & Subscriptions',
        serial_number: 'SW-FS-001',
        category: 'Software',
        status: 'available',
        condition: 'Active',
        purchase_date: '2024-01-01',
        cost: 500.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      }
    ];

    // Insert equipment
    for (const item of equipment) {
      const { error: equipmentError } = await supabase
        .from('equipment')
        .upsert(item);

      if (equipmentError) {
        console.error(`❌ Failed to create equipment ${item.name}:`, equipmentError.message);
      } else {
        console.log(`✅ Created equipment: ${item.name}`);
      }
    }

    console.log('\n🎉 Complete Full Stack data migration following schema.sql completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`- 1 Lab: ${lab.name} (ID: ${labId})`);
    console.log(`- 1 Facilitator: ${facilitator.name} (ID: ${facilitatorId})`);
    console.log(`- ${gigs.length} Gigs/Project Proposals`);
    console.log(`- ${equipment.length} Equipment items`);
    console.log(`- 1 Facilitator-Lab assignment`);

    return NextResponse.json({
      status: 'success',
      message: 'Complete Full Stack data migration following schema.sql completed successfully!',
      data: {
        lab: lab,
        facilitator: facilitator,
        gigsCount: gigs.length,
        equipmentCount: equipment.length,
        summary: {
          labId: labId,
          facilitatorId: facilitatorId,
          gigs: gigs.map(g => ({ id: g.id, title: g.title })),
          equipment: equipment.map(e => ({ id: e.id, name: e.name }))
        }
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
