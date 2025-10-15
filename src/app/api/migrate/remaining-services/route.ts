import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '../../../../lib/supabase';

// POST /api/migrate/remaining-services - Complete migration for remaining services
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting Migration for Remaining Services...');

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

    const { supabase } = await import('../../../../lib/supabase');
    const results = {};

    // 3. EMBEDDED IOT SERVICE
    console.log('\n📊 Creating Embedded IoT Service...');
    const embeddedLabId = '550e8400-e29b-41d4-a716-446655440030';
    
    const embeddedLab = {
      id: embeddedLabId,
      name: 'Embedded IoT Development Lab',
      description: 'Connected technology laboratory featuring IoT development kits, embedded systems, sensor networks, and comprehensive tools for building smart devices and edge computing solutions.',
      category: 'hardware',
      location: 'Building D, Floor 1, Room 101',
      capacity: 18,
      thumbnail_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    };

    const { data: embeddedLabData, error: embeddedLabError } = await supabase
      .from('labs')
      .upsert(embeddedLab)
      .select()
      .single();

    if (embeddedLabError) {
      throw new Error(`Failed to create Embedded IoT lab: ${embeddedLabError.message}`);
    }
    console.log('✅ Created Embedded IoT lab:', embeddedLabData.name);

    // Assign facilitator to Embedded IoT lab
    await supabase
      .from('facilitator_lab')
      .upsert({
        facilitator_id: facilitatorId,
        lab_id: embeddedLabId,
        assigned_at: new Date().toISOString()
      });

    // Embedded IoT Gigs
    const embeddedGigs = [
      {
        id: '550e8400-e29b-41d4-a716-446655440031',
        lab_id: embeddedLabId,
        title: 'Smart City IoT Network',
        description: 'Develop a comprehensive IoT network for smart city applications including traffic monitoring, environmental sensing, and infrastructure management. Implement edge computing solutions and real-time data processing.',
        skills_required: 'Arduino, Raspberry Pi, IoT Protocols, Edge Computing, Python, C++, Sensor Integration',
        eligibility_criteria: {
          experience_level: 'Intermediate',
          prerequisites: ['Embedded Systems', 'IoT Protocols', 'Python/C++'],
          duration: '10-12 weeks',
          budget: '$30,000 - $50,000',
          features: ['Smart Sensors', 'Edge Computing', 'Real-time Processing', 'Network Management']
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 4,
        created_by: facilitatorId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440032',
        lab_id: embeddedLabId,
        title: 'Industrial IoT Monitoring System',
        description: 'Build an industrial-grade IoT monitoring system for equipment health, predictive maintenance, and process optimization. Include wireless connectivity, data visualization, and alert systems.',
        skills_required: 'Industrial IoT, Wireless Protocols, Data Analytics, Machine Learning, Cloud Integration',
        eligibility_criteria: {
          experience_level: 'Advanced',
          prerequisites: ['Industrial Systems', 'Data Analytics', 'Machine Learning'],
          duration: '12-14 weeks',
          budget: '$40,000 - $65,000',
          features: ['Predictive Maintenance', 'Real-time Monitoring', 'Data Analytics', 'Alert Systems']
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 3,
        created_by: facilitatorId
      }
    ];

    for (const gig of embeddedGigs) {
      await supabase
        .from('gigs')
        .upsert({
          ...gig,
          eligibility_criteria: JSON.stringify(gig.eligibility_criteria)
        });
    }
    console.log('✅ Created Embedded IoT gigs:', embeddedGigs.length);

    // Embedded IoT Equipment
    const embeddedEquipment = [
      {
        id: '550e8400-e29b-41d4-a716-446655440033',
        lab_id: embeddedLabId,
        name: 'IoT Development Kit',
        serial_number: 'IOT-EMB-001',
        category: 'IoT Hardware',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-02-20',
        cost: 2000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440034',
        lab_id: embeddedLabId,
        name: 'Sensor Network Kit',
        serial_number: 'SENS-EMB-001',
        category: 'Sensors',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-02-20',
        cost: 1500.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440035',
        lab_id: embeddedLabId,
        name: 'Edge Computing Unit',
        serial_number: 'EDGE-EMB-001',
        category: 'Edge Computing',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-03-01',
        cost: 3000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      }
    ];

    for (const item of embeddedEquipment) {
      await supabase
        .from('equipment')
        .upsert(item);
    }
    console.log('✅ Created Embedded IoT equipment:', embeddedEquipment.length);

    results.embeddedIoT = {
      lab: embeddedLabData,
      gigs: embeddedGigs.length,
      equipment: embeddedEquipment.length
    };

    // 4. IDEA LABS SERVICE
    console.log('\n📊 Creating Idea Labs Service...');
    const ideaLabsId = '550e8400-e29b-41d4-a716-446655440040';
    
    const ideaLabs = {
      id: ideaLabsId,
      name: 'Innovation & Idea Labs',
      description: 'Creative innovation laboratory featuring ideation tools, prototyping equipment, design thinking resources, and comprehensive tools for transforming ideas into viable products and solutions.',
      category: 'software',
      location: 'Building E, Floor 2, Room 203',
      capacity: 25,
      thumbnail_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    };

    const { data: ideaLabsData, error: ideaLabsError } = await supabase
      .from('labs')
      .upsert(ideaLabs)
      .select()
      .single();

    if (ideaLabsError) {
      throw new Error(`Failed to create Idea Labs: ${ideaLabsError.message}`);
    }
    console.log('✅ Created Idea Labs:', ideaLabsData.name);

    // Assign facilitator to Idea Labs
    await supabase
      .from('facilitator_lab')
      .upsert({
        facilitator_id: facilitatorId,
        lab_id: ideaLabsId,
        assigned_at: new Date().toISOString()
      });

    // Idea Labs Gigs
    const ideaLabsGigs = [
      {
        id: '550e8400-e29b-41d4-a716-446655440041',
        lab_id: ideaLabsId,
        title: 'Startup Innovation Accelerator',
        description: 'Develop a comprehensive platform for startup ideation, validation, and acceleration. Include market research tools, business model canvas, prototype development, and investor pitch preparation.',
        skills_required: 'Business Analysis, Market Research, Prototyping, Design Thinking, Presentation Skills',
        eligibility_criteria: {
          experience_level: 'Beginner',
          prerequisites: ['Business Basics', 'Design Thinking', 'Presentation Skills'],
          duration: '8-10 weeks',
          budget: '$15,000 - $25,000',
          features: ['Ideation Tools', 'Market Research', 'Prototyping', 'Pitch Preparation']
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 6,
        created_by: facilitatorId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440042',
        lab_id: ideaLabsId,
        title: 'Social Impact Innovation Project',
        description: 'Create innovative solutions for social challenges using technology. Focus on sustainability, accessibility, and community impact. Develop prototypes and implementation strategies for real-world deployment.',
        skills_required: 'Social Innovation, Sustainability, Community Engagement, Project Management',
        eligibility_criteria: {
          experience_level: 'Intermediate',
          prerequisites: ['Social Awareness', 'Project Management', 'Community Engagement'],
          duration: '10-12 weeks',
          budget: '$20,000 - $35,000',
          features: ['Social Innovation', 'Sustainability Focus', 'Community Impact', 'Real-world Deployment']
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 5,
        created_by: facilitatorId
      }
    ];

    for (const gig of ideaLabsGigs) {
      await supabase
        .from('gigs')
        .upsert({
          ...gig,
          eligibility_criteria: JSON.stringify(gig.eligibility_criteria)
        });
    }
    console.log('✅ Created Idea Labs gigs:', ideaLabsGigs.length);

    // Idea Labs Equipment
    const ideaLabsEquipment = [
      {
        id: '550e8400-e29b-41d4-a716-446655440043',
        lab_id: ideaLabsId,
        name: 'Prototyping Equipment Kit',
        serial_number: 'PROT-IDEA-001',
        category: 'Prototyping',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-01-15',
        cost: 2500.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440044',
        lab_id: ideaLabsId,
        name: 'Design Thinking Resources',
        serial_number: 'DESIGN-IDEA-001',
        category: 'Design Tools',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-01-15',
        cost: 1000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440045',
        lab_id: ideaLabsId,
        name: 'Collaboration Software Licenses',
        serial_number: 'COLLAB-IDEA-001',
        category: 'Software',
        status: 'available',
        condition: 'Active',
        purchase_date: '2024-01-01',
        cost: 800.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      }
    ];

    for (const item of ideaLabsEquipment) {
      await supabase
        .from('equipment')
        .upsert(item);
    }
    console.log('✅ Created Idea Labs equipment:', ideaLabsEquipment.length);

    results.ideaLabs = {
      lab: ideaLabsData,
      gigs: ideaLabsGigs.length,
      equipment: ideaLabsEquipment.length
    };

    // 5. ROBOTICS SERVICE
    console.log('\n📊 Creating Robotics Service...');
    const roboticsLabId = '550e8400-e29b-41d4-a716-446655440050';
    
    const roboticsLab = {
      id: roboticsLabId,
      name: 'Robotics & Automation Lab',
      description: 'Advanced robotics laboratory featuring robotic arms, autonomous vehicles, computer vision systems, and comprehensive tools for building intelligent robots and automation solutions.',
      category: 'hardware',
      location: 'Building F, Floor 1, Room 102',
      capacity: 16,
      thumbnail_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
    };

    const { data: roboticsLabData, error: roboticsLabError } = await supabase
      .from('labs')
      .upsert(roboticsLab)
      .select()
      .single();

    if (roboticsLabError) {
      throw new Error(`Failed to create Robotics lab: ${roboticsLabError.message}`);
    }
    console.log('✅ Created Robotics lab:', roboticsLabData.name);

    // Assign facilitator to Robotics lab
    await supabase
      .from('facilitator_lab')
      .upsert({
        facilitator_id: facilitatorId,
        lab_id: roboticsLabId,
        assigned_at: new Date().toISOString()
      });

    // Robotics Gigs
    const roboticsGigs = [
      {
        id: '550e8400-e29b-41d4-a716-446655440051',
        lab_id: roboticsLabId,
        title: 'Autonomous Mobile Robot',
        description: 'Develop an autonomous mobile robot with navigation, object detection, and manipulation capabilities. Implement SLAM algorithms, computer vision, and path planning for real-world applications.',
        skills_required: 'ROS, Computer Vision, SLAM, Path Planning, Python, C++, Robotics Hardware',
        eligibility_criteria: {
          experience_level: 'Advanced',
          prerequisites: ['Robotics', 'Computer Vision', 'Python/C++'],
          duration: '12-16 weeks',
          budget: '$35,000 - $55,000',
          features: ['Autonomous Navigation', 'Object Detection', 'Manipulation', 'SLAM Implementation']
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 3,
        created_by: facilitatorId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440052',
        lab_id: roboticsLabId,
        title: 'Industrial Automation System',
        description: 'Build an industrial automation system using robotic arms for manufacturing processes. Include quality control, safety systems, and integration with existing production lines.',
        skills_required: 'Industrial Robotics, PLC Programming, Safety Systems, Manufacturing Integration',
        eligibility_criteria: {
          experience_level: 'Advanced',
          prerequisites: ['Industrial Systems', 'PLC Programming', 'Safety Standards'],
          duration: '14-18 weeks',
          budget: '$45,000 - $70,000',
          features: ['Industrial Robotics', 'Quality Control', 'Safety Systems', 'Production Integration']
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 2,
        created_by: facilitatorId
      }
    ];

    for (const gig of roboticsGigs) {
      await supabase
        .from('gigs')
        .upsert({
          ...gig,
          eligibility_criteria: JSON.stringify(gig.eligibility_criteria)
        });
    }
    console.log('✅ Created Robotics gigs:', roboticsGigs.length);

    // Robotics Equipment
    const roboticsEquipment = [
      {
        id: '550e8400-e29b-41d4-a716-446655440053',
        lab_id: roboticsLabId,
        name: 'Robotic Arm System',
        serial_number: 'ARM-ROB-001',
        category: 'Robotic Hardware',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-03-15',
        cost: 8000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440054',
        lab_id: roboticsLabId,
        name: 'Computer Vision System',
        serial_number: 'CV-ROB-001',
        category: 'Computer Vision',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-03-15',
        cost: 3000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440055',
        lab_id: roboticsLabId,
        name: 'Mobile Robot Platform',
        serial_number: 'MOBILE-ROB-001',
        category: 'Mobile Robotics',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-04-01',
        cost: 5000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      }
    ];

    for (const item of roboticsEquipment) {
      await supabase
        .from('equipment')
        .upsert(item);
    }
    console.log('✅ Created Robotics equipment:', roboticsEquipment.length);

    results.robotics = {
      lab: roboticsLabData,
      gigs: roboticsGigs.length,
      equipment: roboticsEquipment.length
    };

    console.log('\n🎉 Remaining Services Migration Completed Successfully!');
    console.log(`📊 Summary:`);
    console.log(`- Facilitator: ${facilitator.name} (ID: ${facilitatorId})`);
    console.log(`- Embedded IoT Lab: ${results.embeddedIoT.lab.name} (${results.embeddedIoT.gigs} gigs, ${results.embeddedIoT.equipment} equipment)`);
    console.log(`- Idea Labs: ${results.ideaLabs.lab.name} (${results.ideaLabs.gigs} gigs, ${results.ideaLabs.equipment} equipment)`);
    console.log(`- Robotics Lab: ${results.robotics.lab.name} (${results.robotics.gigs} gigs, ${results.robotics.equipment} equipment)`);

    return NextResponse.json({
      status: 'success',
      message: 'Remaining Services Migration Completed Successfully!',
      data: {
        facilitator: facilitator,
        services: results,
        summary: {
          totalLabs: 3,
          totalGigs: results.embeddedIoT.gigs + results.ideaLabs.gigs + results.robotics.gigs,
          totalEquipment: results.embeddedIoT.equipment + results.ideaLabs.equipment + results.robotics.equipment
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
