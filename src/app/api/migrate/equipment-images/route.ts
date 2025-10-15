import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '../../../../lib/supabase';

// POST /api/migrate/equipment-images - Add image URLs to all equipment
export async function POST(request: NextRequest) {
  try {
    console.log('🖼️ Starting Equipment Images Migration...');

    // Test connection first
    const connectionTest = await supabaseService.testConnection();
    if (!connectionTest.success) {
      throw new Error(`Connection failed: ${connectionTest.message}`);
    }
    console.log('✅ Supabase connection successful');

    const { supabase } = await import('../../../../lib/supabase');
    
    // Equipment image mappings using original hardcoded images
    const equipmentImages = {
      // Full Stack Lab Equipment
      '550e8400-e29b-41d4-a716-446655440006': 'https://raygun.com/blog/wp-content/uploads/2014/06/Anthony-Acosta.jpg', // Development Workstation Setup
      '550e8400-e29b-41d4-a716-446655440007': 'https://raygun.com/blog/wp-content/uploads/2014/06/Anthony-Acosta.jpg', // Development Workstation Setup
      '550e8400-e29b-41d4-a716-446655440008': 'https://res.cloudinary.com/dmwxtja1g/image/upload/c_lpad,dpr_1.0,f_auto,q_80/v1/media/catalog/product/d/e/dell_nvidia_tesla_v100_16gb_fh_graphics_accelerator_900-2g500-0000-000_angle_zoom_1.jpg?_i=AB', // GPU Processing Unit 16GB
      '550e8400-e29b-41d4-a716-446655440009': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', // Software Licenses & Subscriptions

      // Agentic AI Lab Equipment
      '550e8400-e29b-41d4-a716-446655440014': 'https://c1.neweggimages.com/productimage/nb1280/83-151-613-08.jpg', // RTX 4090 Training Server
      '550e8400-e29b-41d4-a716-446655440015': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', // Synology NAS Storage
      '550e8400-e29b-41d4-a716-446655440016': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop', // Cloud Computing Credits

      // AR/VR Lab Equipment
      '550e8400-e29b-41d4-a716-446655440023': 'https://files.emalls.ir/files/Products/automatic/18546755/dqo0bsus_thumb3.jpg', // VR Headset Development Kit
      '550e8400-e29b-41d4-a716-446655440024': 'https://img-new.cgtrader.com/items/5191008/869db5109e/xreal-air-2-ultra-3d-model-869db5109e.jpg', // AR Development Workstation
      '550e8400-e29b-41d4-a716-446655440025': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', // 3D Modeling Software Licenses

      // Embedded IoT Lab Equipment
      '550e8400-e29b-41d4-a716-446655440033': 'https://www.paleotechnologist.net/wp-content/uploads/2012/03/Scope_setup_clean_sm.png', // IoT Development Kit
      '550e8400-e29b-41d4-a716-446655440034': 'https://materialsupply-saudi.com/wp-content/uploads/2023/06/spd3303c.jpg', // Sensor Network Kit
      '550e8400-e29b-41d4-a716-446655440035': 'https://m.media-amazon.com/images/I/71pnaH-VuqL.jpg', // Edge Computing Unit

      // Idea Labs Equipment
      '550e8400-e29b-41d4-a716-446655440043': 'https://tse4.mm.bing.net/th/id/OIP.HtLmjvLOMsXuDnOiiqYEgwHaE8?pid=Api&P=0&h=180', // Prototyping Equipment Kit
      '550e8400-e29b-41d4-a716-446655440044': 'https://tse1.mm.bing.net/th/id/OIP.pd5rNxqzHxoxMGrgbGiVLAHaE9?pid=Api&P=0&h=180', // Design Thinking Resources
      '550e8400-e29b-41d4-a716-446655440045': 'https://tse2.mm.bing.net/th/id/OIP.llYdM1wIpkc0GGUF9SH86wHaHa?pid=Api&P=0&h=180', // Collaboration Software Licenses

      // Robotics Lab Equipment
      '550e8400-e29b-41d4-a716-446655440053': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop', // Robotic Arm System
      '550e8400-e29b-41d4-a716-446655440054': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop', // Computer Vision System
      '550e8400-e29b-41d4-a716-446655440055': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop', // Mobile Robot Platform
    };

    let updatedCount = 0;
    const results = [];

    // Update each equipment item with its image URL
    for (const [equipmentId, imageUrl] of Object.entries(equipmentImages)) {
      try {
        const { data, error } = await supabase
          .from('equipment')
          .update({ 
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', equipmentId)
          .select();

        if (error) {
          console.error(`Failed to update equipment ${equipmentId}:`, error);
          results.push({ id: equipmentId, status: 'error', error: error.message });
        } else {
          console.log(`✅ Updated equipment ${equipmentId} with image URL`);
          updatedCount++;
          results.push({ id: equipmentId, status: 'success', name: data[0]?.name });
        }
      } catch (err) {
        console.error(`Error updating equipment ${equipmentId}:`, err);
        results.push({ id: equipmentId, status: 'error', error: err instanceof Error ? err.message : 'Unknown error' });
      }
    }

    console.log(`\n🎉 Equipment Images Migration Completed!`);
    console.log(`📊 Summary:`);
    console.log(`- Total equipment items: ${Object.keys(equipmentImages).length}`);
    console.log(`- Successfully updated: ${updatedCount}`);
    console.log(`- Failed updates: ${Object.keys(equipmentImages).length - updatedCount}`);

    return NextResponse.json({
      status: 'success',
      message: 'Equipment Images Migration Completed!',
      data: {
        totalEquipment: Object.keys(equipmentImages).length,
        updatedCount,
        failedCount: Object.keys(equipmentImages).length - updatedCount,
        results
      }
    });

  } catch (error) {
    console.error('❌ Equipment Images Migration failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Equipment Images Migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
