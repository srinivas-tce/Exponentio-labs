# External Company Inquiries Implementation

## Overview
This implementation adds a complete system for external companies to submit inquiries/proposals that are routed to facility managers. The system includes database schema, API routes, frontend forms, and dashboard integration.

## Database Schema

### New Table: `external_inquiries`
Created in `schema-external-inquiries.sql`

**Fields:**
- `id` (UUID, Primary Key)
- `company_name` (VARCHAR) - Required
- `contact_name` (VARCHAR) - Required
- `contact_email` (VARCHAR) - Required
- `contact_phone` (VARCHAR) - Optional
- `company_website` (VARCHAR) - Optional
- `industry` (VARCHAR) - Optional
- `project_title` (VARCHAR) - Required
- `project_description` (TEXT) - Required
- `project_requirements` (TEXT) - Optional
- `budget_range` (VARCHAR) - Optional
- `timeline` (VARCHAR) - Optional
- `preferred_lab_category` (lab_category enum) - Optional
- `preferred_lab_id` (UUID, FK to labs) - Optional
- `equipment_needed` (BOOLEAN) - Default: false
- `equipment_details` (TEXT) - Optional
- `additional_notes` (TEXT) - Optional
- `status` (inquiry_status enum) - Default: 'pending'
- `assigned_to` (UUID, FK to users) - Optional
- `response_notes` (TEXT) - Optional
- `responded_at` (TIMESTAMP) - Optional
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Status Enum Values:**
- `pending` - Initial status when inquiry is submitted
- `under_review` - Inquiry is being reviewed
- `responded` - Response has been sent
- `approved` - Inquiry approved
- `rejected` - Inquiry rejected
- `closed` - Inquiry closed

**Indexes:**
- `idx_external_inquiries_status` - For filtering by status
- `idx_external_inquiries_assigned_to` - For filtering by assigned user
- `idx_external_inquiries_created_at` - For sorting by date
- `idx_external_inquiries_contact_email` - For searching by email

## API Routes

### 1. Submit Inquiry (Public)
**Endpoint:** `POST /api/external-inquiries/submit`

**Request Body:**
```json
{
  "company_name": "Company Name",
  "contact_name": "John Doe",
  "contact_email": "john@company.com",
  "contact_phone": "+1234567890",
  "company_website": "https://company.com",
  "industry": "Technology",
  "project_title": "Project Title",
  "project_description": "Detailed description...",
  "project_requirements": "Requirements...",
  "budget_range": "100k-250k",
  "timeline": "3-6-months",
  "preferred_lab_category": "software",
  "preferred_lab_id": "uuid",
  "equipment_needed": true,
  "equipment_details": "Equipment needed...",
  "additional_notes": "Additional info..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully...",
  "data": {
    "id": "uuid",
    "status": "pending"
  }
}
```

**Features:**
- Validates required fields
- Validates email format
- Creates notifications for all facility managers
- Returns inquiry ID and status

### 2. Get Inquiries (Facility Managers)
**Endpoint:** `GET /api/facilitator/external-inquiries`

**Query Parameters:**
- `email` (required) - Facility manager email
- `status` (optional) - Filter by status
- `assigned_to_me` (optional) - Filter by assigned inquiries (true/false)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "company_name": "Company Name",
      "contact_name": "John Doe",
      "contact_email": "john@company.com",
      "project_title": "Project Title",
      "status": "pending",
      "preferred_lab": {...},
      "assigned_user": {...},
      "created_at": "2025-01-15T10:00:00Z"
    }
  ]
}
```

### 3. Get Single Inquiry
**Endpoint:** `GET /api/facilitator/external-inquiries/[id]`

**Response:**
```json
{
  "success": true,
  "data": {
    // Full inquiry object with all details
  }
}
```

### 4. Update Inquiry
**Endpoint:** `PUT /api/facilitator/external-inquiries/[id]`

**Query Parameters:**
- `email` (required) - Facility manager email

**Request Body:**
```json
{
  "status": "under_review",
  "assigned_to": "user-uuid",
  "response_notes": "Notes about the inquiry..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry updated successfully",
  "data": {
    // Updated inquiry object
  }
}
```

## Frontend Components

### 1. ExternalInquiryForm Component
**Location:** `src/components/ExternalInquiryForm.tsx`

**Features:**
- Comprehensive form with all inquiry fields
- Dynamic lab selection based on category
- Equipment requirements section
- Form validation
- Success/error handling
- Responsive design

**Form Sections:**
1. Company Information
2. Contact Information
3. Project Information
4. Lab Preferences
5. Equipment Requirements
6. Additional Notes

### 2. Public Inquiry Page
**Location:** `src/app/inquiry/page.tsx`

**Route:** `/inquiry`

Public page where external companies can submit inquiries. Includes Header and Footer.

### 3. Facilitator Dashboard Integration
**Location:** `src/app/facilitator-dashboard/page.tsx`

**Features:**
- New "External Inquiries" tab in sidebar
- Pending inquiries count badge
- List view of all inquiries
- Quick access to inquiry details
- Pending inquiries count in overview stats

### 4. Inquiry Detail Page
**Location:** `src/app/facilitator-dashboard/inquiries/[id]/page.tsx`

**Route:** `/facilitator-dashboard/inquiries/[id]`

**Features:**
- Full inquiry details display
- Status update actions
- Response notes management
- Contact information display
- Project details view
- Equipment requirements display
- Metadata and timestamps

## Integration Points

### Footer Link
Added "Submit an Inquiry" link in the footer (`src/components/Footer.tsx`) under Contact Us section.

### Labs API Enhancement
Updated `/api/labs` route to support category filtering:
- `GET /api/labs?category=software` - Returns only software labs
- `GET /api/labs?category=hardware` - Returns only hardware labs
- `GET /api/labs` - Returns all labs

## Workflow

1. **External Company Submits Inquiry:**
   - Visits `/inquiry` page
   - Fills out the inquiry form
   - Submits the form
   - Receives confirmation

2. **Notification to Facility Managers:**
   - System creates notifications for all facility managers
   - Notifications appear in their dashboard

3. **Facility Manager Reviews:**
   - Views inquiries in dashboard
   - Clicks on inquiry to see details
   - Updates status and adds response notes
   - Can assign inquiry to specific facilitator

4. **Status Management:**
   - `pending` → `under_review` → `responded`/`approved`/`rejected` → `closed`

## Database Migration

To apply the schema changes, run the SQL in `schema-external-inquiries.sql`:

```sql
-- Run this in your Supabase SQL editor or database
-- See schema-external-inquiries.sql for full schema
```

## Testing Checklist

- [ ] Submit inquiry from public form
- [ ] Verify notification creation for facility managers
- [ ] View inquiries in facilitator dashboard
- [ ] Filter inquiries by status
- [ ] View inquiry details
- [ ] Update inquiry status
- [ ] Add response notes
- [ ] Assign inquiry to facilitator
- [ ] Test lab category filtering in form
- [ ] Test equipment requirements section
- [ ] Verify email validation
- [ ] Test responsive design

## Future Enhancements

1. Email notifications to external companies on status updates
2. File attachments for project documents
3. Comments/thread system for communication
4. Bulk actions for multiple inquiries
5. Export inquiries to CSV/PDF
6. Advanced filtering and search
7. Analytics dashboard for inquiry metrics
8. Integration with external CRM systems

