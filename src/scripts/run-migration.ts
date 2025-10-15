#!/usr/bin/env tsx

import { migrateFullStackData } from './migrate-fullstack-data';

async function main() {
  console.log('🚀 Starting Full Stack data migration...');
  
  try {
    await migrateFullStackData();
    console.log('\n✅ Migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Test the API endpoints:');
    console.log('   - GET /api/labs/fullstack');
    console.log('   - GET /api/services/fullstack');
    console.log('2. Update the service components to use dynamic data');
    console.log('3. Repeat the process for other services');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
