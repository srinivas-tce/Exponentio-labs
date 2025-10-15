# Proposal Application Flow

## Overview
This document describes the new proposal application flow that includes eligibility criteria questions and strict deadline validation.

## Features

### 1. Eligibility Assessment
- **Experience Level**: Students must select their experience level (Beginner, Intermediate, Advanced)
- **Prerequisites**: Students must confirm they have the required prerequisites
- **Duration Commitment**: Students must commit to the project duration
- **Budget Understanding**: Students must understand the budget requirements
- **Features Interest**: Students can select which features they're interested in
- **Complexity Comfort**: Students must confirm their comfort with project complexity

### 2. Multi-Step Application Process
- **Step 1**: Eligibility Assessment - Questions based on gig's eligibility criteria
- **Step 2**: Proposal Details - Problem statement, approach, expected outcome
- **Step 3**: Additional Information - Timeline, GitHub links, attachments

### 3. Strict Deadline Validation
- Applications are blocked if the deadline has passed
- Real-time deadline checking on both frontend and backend
- Clear error messages when deadline is exceeded

### 4. Enhanced Validation
- Field length validation (title: 255 chars, descriptions: 5000 chars)
- URL validation for GitHub and attachment links
- Required field validation
- Duplicate proposal prevention

## File Structure

### New Files Created
- `src/app/proposals/apply/[id]/page.tsx` - Main application page
- `src/app/api/proposals/gig/[id]/route.ts` - API to fetch gig details

### Modified Files
- `src/app/api/proposals/submit/route.ts` - Enhanced with strict validation
- `src/components/services/FullStackServicePage.tsx` - Updated to use new apply flow

## API Endpoints

### GET `/api/proposals/gig/[id]`
Fetches gig details including eligibility criteria for the application page.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "gig-id",
    "title": "Gig Title",
    "description": "Gig Description",
    "eligibility_criteria": {
      "experience_level": "Beginner",
      "prerequisites": ["JavaScript", "React"],
      "duration": "6-8 weeks",
      "budget": "$2,000 - $5,000",
      "features": ["Real-time Chat", "Payment Integration"],
      "complexity": "7/10"
    },
    "application_deadline": "2025-10-24T18:40:00+00:00",
    "max_applications": 100,
    "lab": {
      "id": "lab-id",
      "name": "Lab Name",
      "description": "Lab Description",
      "thumbnail": "thumbnail-url"
    }
  }
}
```

### POST `/api/proposals/submit`
Enhanced proposal submission with strict validation.

**Enhanced Validations:**
- Deadline checking (strict)
- Field length validation
- URL format validation
- Duplicate proposal prevention
- Max applications limit

## Usage

### For Students
1. Navigate to a service page (e.g., Full Stack Development)
2. Click "Apply for this Gig" on any available project
3. Complete the 3-step application process:
   - Answer eligibility questions
   - Provide proposal details
   - Add additional information
4. Submit the proposal

### For Facilitators
- Proposals are automatically validated against eligibility criteria
- Deadline enforcement prevents late applications
- Enhanced validation reduces invalid submissions

## Database Schema Compliance

The implementation strictly follows the existing database schema:
- Uses `proposals` table for storing applications
- Maintains referential integrity with `gigs`, `labs`, and `users` tables
- Preserves all existing field constraints and relationships
- No schema modifications required

## Error Handling

### Frontend Errors
- Deadline passed: Shows clear message with deadline information
- Gig not found: Redirects with appropriate error message
- Eligibility failed: Shows which criteria were not met

### Backend Errors
- Validation errors with specific field information
- Database constraint violations
- Network and server errors

## Security Features

- URL validation prevents malicious links
- Field length limits prevent DoS attacks
- Input sanitization for all text fields
- Authentication required for all operations
