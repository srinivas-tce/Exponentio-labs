-- Supabase Database Schema for Exponentio Labs Platform
-- This schema creates all tables and relationships for the lab management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types/enums
CREATE TYPE user_role AS ENUM ('student', 'facility-manager', 'facilitator', 'admin');
CREATE TYPE lab_category AS ENUM ('software', 'hardware');
CREATE TYPE gig_status AS ENUM ('open', 'closed', 'archived', 'cancelled', 'hold');
CREATE TYPE proposal_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected');
CREATE TYPE equipment_status AS ENUM ('available', 'requested', 'allocated', 'under_maintenance', 'retired');
CREATE TYPE request_status AS ENUM ('requested', 'approved', 'in_use', 'returned', 'rejected', 'closed');
CREATE TYPE notification_type AS ENUM ('proposal_update', 'equipment_update', 'system');
CREATE TYPE notification_status AS ENUM ('unread', 'read');

-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    gender VARCHAR(50),
    phone VARCHAR(20),
    department VARCHAR(255),
    experience INTEGER,
    specialization VARCHAR(255),
    thumbnail TEXT,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LABS TABLE
CREATE TABLE labs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category lab_category NOT NULL,
    location VARCHAR(255),
    capacity INTEGER CHECK (capacity > 0),
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FACILITATOR_LAB TABLE (join table)
CREATE TABLE facilitator_lab (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facilitator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(facilitator_id, lab_id)
);

-- GIGS TABLE
CREATE TABLE gigs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    skills_required TEXT,
    eligibility_criteria JSONB,
    status gig_status NOT NULL DEFAULT 'open',
    application_deadline TIMESTAMP WITH TIME ZONE,
    max_applications INTEGER CHECK (max_applications > 0),
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROPOSALS TABLE
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    problem_statement TEXT NOT NULL,
    approach TEXT NOT NULL,
    expected_outcome TEXT NOT NULL,
    timeline JSONB,
    equipment_needed BOOLEAN DEFAULT FALSE,
    status proposal_status NOT NULL DEFAULT 'draft',
    review_comments TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    github_link TEXT,
    attachment_url TEXT,
    score DECIMAL(3,2) CHECK (score >= 0 AND score <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(gig_id, student_id)
);

-- EQUIPMENT TABLE
CREATE TABLE equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    serial_number VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    status equipment_status NOT NULL DEFAULT 'available',
    condition VARCHAR(100),
    purchase_date DATE,
    cost DECIMAL(10,2) CHECK (cost >= 0),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    last_checked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EQUIPMENT_REQUEST TABLE
CREATE TABLE equipment_request (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    facilitator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    purpose TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status request_status NOT NULL DEFAULT 'requested',
    approval_comments TEXT,
    approved_at TIMESTAMP WITH TIME ZONE,
    returned_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (end_date >= start_date)
);

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status notification_status NOT NULL DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SYNC_LOG TABLE
CREATE TABLE sync_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    triggered_by VARCHAR(255) NOT NULL,
    data_synced JSONB NOT NULL,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_specialization ON users(specialization);
CREATE INDEX idx_labs_category ON labs(category);
CREATE INDEX idx_facilitator_lab_facilitator ON facilitator_lab(facilitator_id);
CREATE INDEX idx_facilitator_lab_lab ON facilitator_lab(lab_id);
CREATE INDEX idx_gigs_lab ON gigs(lab_id);
CREATE INDEX idx_gigs_status ON gigs(status);
CREATE INDEX idx_gigs_created_by ON gigs(created_by);
CREATE INDEX idx_gigs_deadline ON gigs(application_deadline);
CREATE INDEX idx_proposals_gig ON proposals(gig_id);
CREATE INDEX idx_proposals_lab ON proposals(lab_id);
CREATE INDEX idx_proposals_student ON proposals(student_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_submitted_at ON proposals(submitted_at);
CREATE INDEX idx_equipment_lab ON equipment(lab_id);
CREATE INDEX idx_equipment_status ON equipment(status);
CREATE INDEX idx_equipment_assigned_to ON equipment(assigned_to);
CREATE INDEX idx_equipment_request_proposal ON equipment_request(proposal_id);
CREATE INDEX idx_equipment_request_equipment ON equipment_request(equipment_id);
CREATE INDEX idx_equipment_request_student ON equipment_request(student_id);
CREATE INDEX idx_equipment_request_facilitator ON equipment_request(facilitator_id);
CREATE INDEX idx_equipment_request_status ON equipment_request(status);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_sync_log_user ON sync_log(user_id);
CREATE INDEX idx_sync_log_triggered_by ON sync_log(triggered_by);


-- Comments for documentation
COMMENT ON TABLE users IS 'Stores user information including students, facilitators, and admins with contact details and specialization';
COMMENT ON TABLE labs IS 'Stores lab information and configuration';
COMMENT ON TABLE facilitator_lab IS 'Many-to-many relationship between facilitators and labs';
COMMENT ON TABLE gigs IS 'Stores project opportunities/gigs posted by facilitators';
COMMENT ON TABLE proposals IS 'Stores student proposals for gigs';
COMMENT ON TABLE equipment IS 'Stores lab equipment inventory';
COMMENT ON TABLE equipment_request IS 'Stores equipment borrowing requests';
COMMENT ON TABLE notifications IS 'Stores user notifications';
COMMENT ON TABLE sync_log IS 'Stores synchronization logs for external systems';
