import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      company_name,
      contact_name,
      contact_email,
      contact_phone,
      company_website,
      industry,
      project_title,
      project_description,
      project_requirements,
      budget_range,
      timeline,
      preferred_lab_category,
      preferred_lab_id,
      equipment_needed,
      equipment_details,
      additional_notes,
    } = body;

    // Validate required fields
    if (!company_name || !contact_name || !contact_email || !project_title || !project_description) {
      return NextResponse.json(
        { error: 'Missing required fields: company_name, contact_name, contact_email, project_title, and project_description are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create the inquiry
    const { data: inquiry, error } = await supabase
      .from('external_inquiries')
      .insert({
        company_name,
        contact_name,
        contact_email,
        contact_phone: contact_phone || null,
        company_website: company_website || null,
        industry: industry || null,
        project_title,
        project_description,
        project_requirements: project_requirements || null,
        budget_range: budget_range || null,
        timeline: timeline || null,
        preferred_lab_category: preferred_lab_category || null,
        preferred_lab_id: preferred_lab_id || null,
        equipment_needed: equipment_needed || false,
        equipment_details: equipment_details || null,
        additional_notes: additional_notes || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating external inquiry:', error);
      return NextResponse.json(
        { error: 'Failed to submit inquiry. Please try again.' },
        { status: 500 }
      );
    }

    // Find facility managers to notify
    const { data: facilityManagers, error: managerError } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('role', 'facility-manager')
      .limit(10);

    if (!managerError && facilityManagers && facilityManagers.length > 0) {
      // Create notifications for facility managers
      const notifications = facilityManagers.map(manager => ({
        user_id: manager.id,
        type: 'system' as const,
        title: 'New External Company Inquiry',
        message: `New inquiry from ${company_name}: ${project_title}`,
        status: 'unread' as const,
      }));

      await supabase
        .from('notifications')
        .insert(notifications);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully. We will get back to you soon.',
      data: {
        id: inquiry.id,
        status: inquiry.status,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error in external inquiry submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

