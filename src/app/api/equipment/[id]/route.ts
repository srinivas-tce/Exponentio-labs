import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/equipment/[id] - Get equipment details by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const equipmentId = params.id;
    
    if (!equipmentId) {
      return NextResponse.json({ error: 'Equipment ID is required' }, { status: 400 });
    }

    // Get equipment details with lab information
    const { data: equipment, error: equipmentError } = await supabase
      .from('equipment')
      .select(`
        *,
        labs!equipment_lab_id_fkey(
          id,
          name,
          description,
          location,
          capacity
        ),
        assigned_to_user:users!equipment_assigned_to_fkey(
          name
        )
      `)
      .eq('id', equipmentId)
      .single();

    if (equipmentError) {
      console.error('Equipment fetch error:', equipmentError);
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
    }

    // Transform the data
    const equipmentDetails = {
      id: equipment.id,
      name: equipment.name,
      serial_number: equipment.serial_number,
      category: equipment.category,
      status: equipment.status,
      condition: equipment.condition,
      purchase_date: equipment.purchase_date,
      cost: equipment.cost,
      image_url: equipment.image_url,
      lab_id: equipment.lab_id,
      lab_name: equipment.labs?.name || 'Unknown Lab',
      lab_description: equipment.labs?.description || 'No description available',
      lab_location: equipment.labs?.location || 'Location not specified',
      lab_capacity: equipment.labs?.capacity || 0,
      assigned_to_user: equipment.assigned_to_user ? {
        name: equipment.assigned_to_user.name
      } : null,
      last_checked_at: equipment.last_checked_at,
      created_at: equipment.created_at,
      updated_at: equipment.updated_at
    };

    return NextResponse.json(equipmentDetails);

  } catch (error) {
    console.error('Error fetching equipment details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
