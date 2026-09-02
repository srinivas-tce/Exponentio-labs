/**
 * Inquiry draft — mirrors ExternalInquiryForm / external-inquiries submit payload.
 * Empty string = unknown; agent merges incrementally.
 */
export interface InquiryDraft {
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  company_website: string;
  industry: string;
  project_title: string;
  project_description: string;
  project_requirements: string;
  budget_range: string;
  timeline: string;
  preferred_lab_category: string;
  preferred_lab_id: string;
  equipment_needed: boolean;
  equipment_details: string;
  additional_notes: string;
}

export const EMPTY_INQUIRY_DRAFT: InquiryDraft = {
  company_name: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  company_website: '',
  industry: '',
  project_title: '',
  project_description: '',
  project_requirements: '',
  budget_range: '',
  timeline: '',
  preferred_lab_category: '',
  preferred_lab_id: '',
  equipment_needed: false,
  equipment_details: '',
  additional_notes: '',
};

/** Agent flow: all must be non-empty before Submit is shown. Submit API still only strictly requires first five + email. */
export const REQUIRED_INQUIRY_FIELDS: (keyof InquiryDraft)[] = [
  'company_name',
  'contact_name',
  'contact_email',
  'project_title',
  'project_description',
  'budget_range',
  'timeline',
];

export interface InquiryAgentMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface InquiryAgentResponse {
  reply: string;
  draft: InquiryDraft;
  missingRequired: string[];
  readyToSubmit: boolean;
}
