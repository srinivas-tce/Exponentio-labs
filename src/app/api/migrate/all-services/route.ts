import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '../../../../lib/supabase';

// POST /api/migrate/all-services - Complete migration for all services following schema.sql
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting Complete Migration for All Services following schema.sql...');

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

    // 1. AGENTIC AI SERVICE
    console.log('\n📊 Creating Agentic AI Service...');
    const agenticAILabId = '550e8400-e29b-41d4-a716-446655440010';
    
    const agenticAILab = {
      id: agenticAILabId,
      name: 'Agentic AI Development Lab',
      description: 'Advanced AI laboratory featuring high-performance computing clusters, GPU processing units, and comprehensive AI development tools for autonomous agent systems and machine learning.',
      category: 'software',
      location: 'Building B, Floor 3, Room 301',
      capacity: 15,
      thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
    };

    const { data: agenticLab, error: agenticLabError } = await supabase
      .from('labs')
      .upsert(agenticAILab)
      .select()
      .single();

    if (agenticLabError) {
      throw new Error(`Failed to create Agentic AI lab: ${agenticLabError.message}`);
    }
    console.log('✅ Created Agentic AI lab:', agenticLab.name);

    // Assign facilitator to Agentic AI lab
    await supabase
      .from('facilitator_lab')
      .upsert({
        facilitator_id: facilitatorId,
        lab_id: agenticAILabId,
        assigned_at: new Date().toISOString()
      });

    // Agentic AI Gigs
    const agenticAIGigs = [
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        lab_id: agenticAILabId,
        title: 'Autonomous Scientific Research Acceleration',
        description: 'Build a comprehensive research automation platform that orchestrates the entire scientific lifecycle. The system coordinates hierarchical agent teams for literature review, hypothesis generation, experiment design, data analysis, and publication preparation.',
        skills_required: 'LangGraph, Llama 3.1, Federated Learning, Academic APIs, Python, Machine Learning',
        eligibility_criteria: {
          experience_level: 'Advanced',
          prerequisites: ['Python', 'Machine Learning', 'Research Methods'],
          duration: '12-16 weeks',
          budget: '$80,000 - $130,000',
          complexity: '10/10',
          hardware: 'RTX 4090 training server, Synology NAS, enhanced cloud credits',
          software: 'LangGraph + Llama 3.1 + Federated Learning + Academic APIs'
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 2,
        created_by: facilitatorId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        lab_id: agenticAILabId,
        title: 'Autonomous Financial Trading Ecosystem',
        description: 'Develop a production-grade algorithmic trading system using multi-agent coordination for market analysis, risk management, and automated execution. This capstone project integrates real-time market data feeds and sophisticated risk controls to operate autonomously.',
        skills_required: 'Semantic Kernel, Multi-Agent Orchestration, Real-time Data Feeds, Risk APIs, Python, Financial Modeling',
        eligibility_criteria: {
          experience_level: 'Advanced',
          prerequisites: ['Python', 'Financial Markets', 'Risk Management'],
          duration: '12-16 weeks',
          budget: '$90,000 - $150,000',
          complexity: '10/10',
          hardware: 'High-frequency inference servers, Synology NAS, enhanced cloud credits',
          software: 'Semantic Kernel + Multi-Agent Orchestration + Real-time Data Feeds + Risk APIs'
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 2,
        created_by: facilitatorId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        lab_id: agenticAILabId,
        title: 'Autonomous Code Migration System',
        description: 'Create a large-scale platform for codebase modernization using AutoGen\'s actor model architecture. The system automatically analyzes legacy code, maps dependencies, plans migration strategies, and generates modernized implementations.',
        skills_required: 'AutoGen, Distributed Systems, Static Code Analysis, CI/CD Tools, Python, Software Architecture',
        eligibility_criteria: {
          experience_level: 'Advanced',
          prerequisites: ['Python', 'Software Architecture', 'Distributed Systems'],
          duration: '12-14 weeks',
          budget: '$50,000 - $80,000',
          complexity: '9/10',
          hardware: 'Additional workstations, 10GbE networking, VMware virtualization',
          software: 'AutoGen + Distributed Systems + Static Code Analysis + CI/CD Tools'
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 3,
        created_by: facilitatorId
      }
    ];

    for (const gig of agenticAIGigs) {
      await supabase
        .from('gigs')
        .upsert({
          ...gig,
          eligibility_criteria: JSON.stringify(gig.eligibility_criteria)
        });
    }
    console.log('✅ Created Agentic AI gigs:', agenticAIGigs.length);

    // Agentic AI Equipment
    const agenticAIEquipment = [
      {
        id: '550e8400-e29b-41d4-a716-446655440014',
        lab_id: agenticAILabId,
        name: 'RTX 4090 Training Server',
        serial_number: 'RTX-AI-001',
        category: 'AI Computing',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-03-01',
        cost: 15000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440015',
        lab_id: agenticAILabId,
        name: 'Synology NAS Storage',
        serial_number: 'NAS-AI-001',
        category: 'Storage',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-03-01',
        cost: 5000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440016',
        lab_id: agenticAILabId,
        name: 'Cloud Computing Credits',
        serial_number: 'CLOUD-AI-001',
        category: 'Software',
        status: 'available',
        condition: 'Active',
        purchase_date: '2024-01-01',
        cost: 2000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      }
    ];

    for (const item of agenticAIEquipment) {
      await supabase
        .from('equipment')
        .upsert(item);
    }
    console.log('✅ Created Agentic AI equipment:', agenticAIEquipment.length);

    results.agenticAI = {
      lab: agenticLab,
      gigs: agenticAIGigs.length,
      equipment: agenticAIEquipment.length
    };

    // 2. AR/VR SERVICE
    console.log('\n📊 Creating AR/VR Service...');
    const arvrLabId = '550e8400-e29b-41d4-a716-446655440020';
    
    const arvrLab = {
      id: arvrLabId,
      name: 'AR/VR & Metaverse Lab',
      description: 'Immersive technology laboratory featuring VR headsets, AR development kits, 3D modeling workstations, and comprehensive tools for creating virtual and augmented reality experiences.',
      category: 'hardware',
      location: 'Building C, Floor 2, Room 202',
      capacity: 12,
      thumbnail_url: 'https://images.unsplash.com/photo-1592478411213-6153e4c4c8d4?w=400&h=300&fit=crop'
    };

    const { data: arvrLabData, error: arvrLabError } = await supabase
      .from('labs')
      .upsert(arvrLab)
      .select()
      .single();

    if (arvrLabError) {
      throw new Error(`Failed to create AR/VR lab: ${arvrLabError.message}`);
    }
    console.log('✅ Created AR/VR lab:', arvrLabData.name);

    // Assign facilitator to AR/VR lab
    await supabase
      .from('facilitator_lab')
      .upsert({
        facilitator_id: facilitatorId,
        lab_id: arvrLabId,
        assigned_at: new Date().toISOString()
      });

    // AR/VR Gigs
    const arvrGigs = [
      {
        id: '550e8400-e29b-41d4-a716-446655440021',
        lab_id: arvrLabId,
        title: 'Immersive Training Simulation Platform',
        description: 'Develop a comprehensive VR training platform for professional development. Create realistic simulations for medical training, safety protocols, and skill development with haptic feedback and multi-user support.',
        skills_required: 'Unity 3D, C#, VR Development, 3D Modeling, Haptic Technology, Multiplayer Networking',
        eligibility_criteria: {
          experience_level: 'Intermediate',
          prerequisites: ['Unity 3D', 'C#', '3D Modeling'],
          duration: '8-10 weeks',
          budget: '$25,000 - $40,000',
          features: ['VR Training Simulations', 'Haptic Feedback', 'Multi-user Support', 'Realistic Environments']
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 4,
        created_by: facilitatorId
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440022',
        lab_id: arvrLabId,
        title: 'AR Shopping Experience Platform',
        description: 'Build an augmented reality shopping platform that allows users to visualize products in their real environment. Integrate with e-commerce APIs, implement virtual try-on features, and create interactive product demonstrations.',
        skills_required: 'ARCore/ARKit, React Native, 3D Rendering, Computer Vision, E-commerce APIs',
        eligibility_criteria: {
          experience_level: 'Intermediate',
          prerequisites: ['Mobile Development', 'AR Development', '3D Graphics'],
          duration: '6-8 weeks',
          budget: '$20,000 - $35,000',
          features: ['AR Product Visualization', 'Virtual Try-on', 'E-commerce Integration', 'Real-time Tracking']
        },
        status: 'open',
        application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 5,
        created_by: facilitatorId
      }
    ];

    for (const gig of arvrGigs) {
      await supabase
        .from('gigs')
        .upsert({
          ...gig,
          eligibility_criteria: JSON.stringify(gig.eligibility_criteria)
        });
    }
    console.log('✅ Created AR/VR gigs:', arvrGigs.length);

    // AR/VR Equipment
    const arvrEquipment = [
      {
        id: '550e8400-e29b-41d4-a716-446655440023',
        lab_id: arvrLabId,
        name: 'VR Headset Development Kit',
        serial_number: 'VR-AR-001',
        category: 'VR Hardware',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-02-15',
        cost: 3000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440024',
        lab_id: arvrLabId,
        name: 'AR Development Workstation',
        serial_number: 'AR-AR-001',
        category: 'AR Hardware',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-02-15',
        cost: 4000.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440025',
        lab_id: arvrLabId,
        name: '3D Modeling Software Licenses',
        serial_number: '3D-AR-001',
        category: 'Software',
        status: 'available',
        condition: 'Active',
        purchase_date: '2024-01-01',
        cost: 1500.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      }
    ];

    for (const item of arvrEquipment) {
      await supabase
        .from('equipment')
        .upsert(item);
    }
    console.log('✅ Created AR/VR equipment:', arvrEquipment.length);

    results.arVR = {
      lab: arvrLabData,
      gigs: arvrGigs.length,
      equipment: arvrEquipment.length
    };

    console.log('\n🎉 All Services Migration Completed Successfully!');
    console.log(`📊 Summary:`);
    console.log(`- Facilitator: ${facilitator.name} (ID: ${facilitatorId})`);
    console.log(`- Agentic AI Lab: ${results.agenticAI.lab.name} (${results.agenticAI.gigs} gigs, ${results.agenticAI.equipment} equipment)`);
    console.log(`- AR/VR Lab: ${results.arVR.lab.name} (${results.arVR.gigs} gigs, ${results.arVR.equipment} equipment)`);

    return NextResponse.json({
      status: 'success',
      message: 'All Services Migration Completed Successfully!',
      data: {
        facilitator: facilitator,
        services: results,
        summary: {
          totalLabs: 2,
          totalGigs: results.agenticAI.gigs + results.arVR.gigs,
          totalEquipment: results.agenticAI.equipment + results.arVR.equipment
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
