import { supabaseService } from '../lib/supabase';

// Simple script to insert Full Stack data using the working Supabase connection
async function insertFullStackData() {
  try {
    console.log('🚀 Starting Full Stack data insertion...');

    // Test connection first
    const connectionTest = await supabaseService.testConnection();
    if (!connectionTest.success) {
      throw new Error(`Connection failed: ${connectionTest.message}`);
    }
    console.log('✅ Supabase connection successful');

    // Create facilitator user
    const facilitatorData = {
      id: 'facilitator-fullstack-001',
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

    console.log('\n🎉 Full Stack facilitator created successfully!');
    console.log(`📊 Summary:`);
    console.log(`- 1 Facilitator: ${facilitator.name}`);
    console.log(`\n🔗 Next steps:`);
    console.log('1. Use Supabase dashboard to manually create labs, gigs, and equipment');
    console.log('2. Or run individual SQL commands through Supabase SQL editor');
    console.log('3. Test the API endpoints once data is in place');

    // Provide SQL commands for manual insertion
    console.log('\n📝 SQL Commands for manual insertion:');
    console.log(`
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

-- Insert Gigs (run these one by one)
INSERT INTO gigs (id, lab_id, title, description, skills_required, eligibility_criteria, status, application_deadline, max_applications, created_by, created_at, updated_at)
VALUES (
  'gig-ecommerce-001',
  'lab-fullstack-001',
  'MERN Stack E-Commerce Website',
  'Modern, scalable, and secure e-commerce platform with payment integration, product catalog, shopping cart, and order management.',
  'React.js, Node.js, Express.js, MongoDB, JWT Authentication, Payment Gateway Integration',
  '{"experience_level": "Intermediate", "prerequisites": ["JavaScript", "React Basics", "Node.js Basics"], "duration": "6 weeks", "budget": "$2,100 USD"}',
  'open',
  NOW() + INTERVAL '30 days',
  5,
  'facilitator-fullstack-001',
  NOW(),
  NOW()
);
    `);

  } catch (error) {
    console.error('❌ Insertion failed:', error);
    throw error;
  }
}

// Run insertion if this file is executed directly
if (require.main === module) {
  insertFullStackData()
    .then(() => {
      console.log('\n✅ Insertion completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Insertion failed:', error);
      process.exit(1);
    });
}

export { insertFullStackData };
