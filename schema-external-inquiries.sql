-- External Inquiries Table for External Company Proposals/Inquiries
-- This table stores inquiries from external companies that go to facility managers

-- Create enum for inquiry status
CREATE TYPE inquiry_status AS ENUM ('pending', 'under_review', 'responded', 'approved', 'rejected', 'closed');

-- EXTERNAL_INQUIRIES TABLE
CREATE TABLE external_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    company_website VARCHAR(255),
    industry VARCHAR(100),
    project_title VARCHAR(255) NOT NULL,
    project_description TEXT NOT NULL,
    project_requirements TEXT,
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    preferred_lab_category lab_category,
    preferred_lab_id UUID REFERENCES labs(id) ON DELETE SET NULL,
    equipment_needed BOOLEAN DEFAULT FALSE,
    equipment_details TEXT,
    additional_notes TEXT,
    status inquiry_status NOT NULL DEFAULT 'pending',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    response_notes TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_external_inquiries_status ON external_inquiries(status);
CREATE INDEX idx_external_inquiries_assigned_to ON external_inquiries(assigned_to);
CREATE INDEX idx_external_inquiries_created_at ON external_inquiries(created_at);
CREATE INDEX idx_external_inquiries_contact_email ON external_inquiries(contact_email);

-- Comments for documentation
COMMENT ON TABLE external_inquiries IS 'Stores inquiries from external companies for lab services and projects';
COMMENT ON COLUMN external_inquiries.assigned_to IS 'Facility manager or facilitator assigned to handle this inquiry';

