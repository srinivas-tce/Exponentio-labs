import { supabaseService } from '../lib/supabase';

// Migration script to populate Full Stack service data into Supabase
async function migrateFullStackData() {
  try {
    console.log('Starting Full Stack data migration...');

    // Test connection first
    const connectionTest = await supabaseService.testConnection();
    if (!connectionTest.success) {
      throw new Error(`Connection failed: ${connectionTest.message}`);
    }
    console.log('✅ Database connection successful');

    // First, create a facilitator user for the lab
    const facilitatorData = {
      id: 'facilitator-fullstack-001',
      email: 'facilitator@fullstack.exponentio.com',
      name: 'Full Stack Lab Facilitator',
      role: 'facilitator' as const,
      gender: 'Other',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email_verified_at: new Date().toISOString()
    };

    const facilitator = await supabaseService.createFacilitator(facilitatorData);
    console.log('✅ Created facilitator:', facilitator.id);

    // For now, we'll create a simple migration that focuses on the essential data
    // The full migration with labs, gigs, and equipment will need to be done through
    // the Supabase dashboard or by creating additional methods in the SupabaseService
    
    console.log('✅ Full Stack data migration completed successfully!');
    console.log(`Created:`);
    console.log(`- 1 Facilitator: ${facilitator.name}`);
    console.log(`\n📋 Next steps:`);
    console.log('1. Create labs, gigs, and equipment data through Supabase dashboard');
    console.log('2. Test the API endpoints:');
    console.log('   - GET /api/labs/fullstack');
    console.log('   - GET /api/services/fullstack');
    console.log('3. Update the service components to use dynamic data');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateFullStackData()
    .then(() => {
      console.log('Migration completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export { migrateFullStackData };