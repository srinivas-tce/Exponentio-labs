import { db } from '../lib/database';

// Migration script to populate Full Stack service data into Supabase using direct postgres connection
async function migrateFullStackDataToSupabase() {
  try {
    console.log('🚀 Starting Full Stack data migration to Supabase...');

    // 1. Create facilitator user
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

    const facilitator = await db.createFacilitator(facilitatorData);
    console.log('✅ Created facilitator:', facilitator.name);

    // 2. Create lab
    const labData = {
      id: 'lab-fullstack-001',
      name: 'Full Stack Development Lab',
      description: 'Web and application development laboratory featuring high-performance workstations, GPU processing units, and comprehensive software development tools for modern full-stack development.',
      category: 'software',
      location: 'Building A, Floor 2, Room 201',
      capacity: 20,
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    };

    const lab = await db.queryOne(`
      INSERT INTO labs (id, name, description, category, location, capacity, thumbnail_url, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        location = EXCLUDED.location,
        capacity = EXCLUDED.capacity,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = NOW()
      RETURNING *;
    `, [
      labData.id,
      labData.name,
      labData.description,
      labData.category,
      labData.location,
      labData.capacity,
      labData.thumbnail_url
    ]);

    console.log('✅ Created lab:', lab.name);

    // 3. Assign facilitator to lab
    await db.query(`
      INSERT INTO facilitator_lab (facilitator_id, lab_id, assigned_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (facilitator_id, lab_id) DO NOTHING;
    `, [facilitator.id, lab.id]);

    console.log('✅ Assigned facilitator to lab');

    // 4. Create gigs (project proposals)
    const gigs = [
      {
        id: 'gig-ecommerce-001',
        lab_id: lab.id,
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
        status: 'open',
        application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        max_applications: 5,
        created_by: facilitator.id
      },
      {
        id: 'gig-dashboard-001',
        lab_id: lab.id,
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
        created_by: facilitator.id
      },
      {
        id: 'gig-social-001',
        lab_id: lab.id,
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
        created_by: facilitator.id
      }
    ];

    for (const gig of gigs) {
      await db.query(`
        INSERT INTO gigs (id, lab_id, title, description, skills_required, eligibility_criteria, status, application_deadline, max_applications, created_by, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          skills_required = EXCLUDED.skills_required,
          eligibility_criteria = EXCLUDED.eligibility_criteria,
          status = EXCLUDED.status,
          application_deadline = EXCLUDED.application_deadline,
          max_applications = EXCLUDED.max_applications,
          updated_at = NOW()
        RETURNING *;
      `, [
        gig.id,
        lab.id,
        gig.title,
        gig.description,
        gig.skills_required,
        JSON.stringify(gig.eligibility_criteria),
        gig.status,
        gig.application_deadline,
        gig.max_applications,
        gig.created_by
      ]);
    }

    console.log('✅ Created gigs:', gigs.length);

    // 5. Create equipment
    const equipment = [
      {
        id: 'equipment-workstation-001',
        lab_id: lab.id,
        name: 'Development Workstation Setup',
        serial_number: 'WS-FS-001',
        category: 'Computer Workstation',
        status: 'available',
        condition: 'Excellent',
        purchase_date: '2024-01-15',
        cost: 2500.00,
        assigned_to: null,
        last_checked_at: new Date().toISOString()
      },
      {
        id: 'equipment-workstation-002',
        lab_id: lab.id,
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
        id: 'equipment-gpu-001',
        lab_id: lab.id,
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
        id: 'equipment-software-001',
        lab_id: lab.id,
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

    for (const item of equipment) {
      await db.query(`
        INSERT INTO equipment (id, lab_id, name, serial_number, category, status, condition, purchase_date, cost, assigned_to, last_checked_at, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          serial_number = EXCLUDED.serial_number,
          category = EXCLUDED.category,
          status = EXCLUDED.status,
          condition = EXCLUDED.condition,
          purchase_date = EXCLUDED.purchase_date,
          cost = EXCLUDED.cost,
          assigned_to = EXCLUDED.assigned_to,
          last_checked_at = EXCLUDED.last_checked_at,
          updated_at = NOW()
        RETURNING *;
      `, [
        item.id,
        lab.id,
        item.name,
        item.serial_number,
        item.category,
        item.status,
        item.condition,
        item.purchase_date,
        item.cost,
        item.assigned_to,
        item.last_checked_at
      ]);
    }

    console.log('✅ Created equipment:', equipment.length);

    console.log('\n🎉 Full Stack data migration to Supabase completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`- 1 Lab: ${lab.name}`);
    console.log(`- 1 Facilitator: ${facilitator.name}`);
    console.log(`- ${gigs.length} Gigs/Project Proposals`);
    console.log(`- ${equipment.length} Equipment items`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateFullStackDataToSupabase()
    .then(() => {
      console.log('\n✅ Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Migration failed:', error);
      process.exit(1);
    });
}

export { migrateFullStackDataToSupabase };