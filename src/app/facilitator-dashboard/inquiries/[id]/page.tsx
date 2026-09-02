'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MarkdownDisplay } from '@/components/MarkdownDisplay';
import { useAuthStore } from '@/store/authStore';
import { 
  ArrowLeft, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  FileText, 
  DollarSign, 
  Calendar, 
  Wrench, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  AlertCircle,
  Send
} from 'lucide-react';

interface ExternalInquiry {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  company_website?: string;
  industry?: string;
  project_title: string;
  project_description: string;
  project_requirements?: string;
  budget_range?: string;
  timeline?: string;
  preferred_lab_category?: string;
  preferred_lab_id?: string;
  preferred_lab?: {
    id: string;
    name: string;
    category: string;
    description?: string;
  } | null;
  equipment_needed: boolean;
  equipment_details?: string;
  additional_notes?: string;
  status: string;
  response_notes?: string;
  assigned_to?: string;
  assigned_user?: {
    id: string;
    name: string;
    email: string;
  } | null;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

const InquiryDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const [inquiry, setInquiry] = useState<ExternalInquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('');
  const [responseNotes, setResponseNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email && params.id) {
      fetchInquiry();
    }
  }, [user?.email, params.id]);

  const fetchInquiry = async () => {
    // if (!user?.email) {
    //   setError('User email is required');
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(
        `/api/facilitator/external-inquiries/${params.id}?email=${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      
      if (data.success) {
        setInquiry(data.data);
        setStatus(data.data.status);
        setResponseNotes(data.data.response_notes || '');
      } else {
        setError(data.error || 'Failed to fetch inquiry');
        if (data.error?.includes('Unauthorized')) {
          router.push('/facilitator-dashboard');
        }
      }
    } catch (err) {
      console.error('Error fetching inquiry:', err);
      setError('Failed to fetch inquiry');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!user?.email) return;

    setUpdating(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/facilitator/external-inquiries/${params.id}?email=${encodeURIComponent(user.email)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            response_notes: responseNotes,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setInquiry(data.data);
        setStatus(data.data.status);
        alert(`Inquiry status updated to ${newStatus}`);
      } else {
        setError(data.error || 'Failed to update inquiry');
      }
    } catch (err) {
      console.error('Error updating inquiry:', err);
      setError('Failed to update inquiry');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      case 'responded': return 'text-green-600 bg-green-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading inquiry...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!inquiry) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Inquiry not found</p>
            <Link href="/facilitator-dashboard" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/facilitator-dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{inquiry.project_title}</h1>
                <p className="text-gray-600 mt-1">{inquiry.company_name}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(inquiry.status)}`}>
                {inquiry.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-medium text-gray-900">{inquiry.company_name}</p>
                  </div>
                  {inquiry.industry && (
                    <div>
                      <p className="text-sm text-gray-500">Industry</p>
                      <p className="font-medium text-gray-900">{inquiry.industry}</p>
                    </div>
                  )}
                  {inquiry.company_website && (
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={inquiry.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        {inquiry.company_website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Contact Name</p>
                    <p className="font-medium text-gray-900">{inquiry.contact_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${inquiry.contact_email}`}
                      className="font-medium text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      {inquiry.contact_email}
                    </a>
                  </div>
                  {inquiry.contact_phone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${inquiry.contact_phone}`}
                        className="font-medium text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {inquiry.contact_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Project Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Project Description</p>
                    <MarkdownDisplay content={inquiry.project_description} />
                  </div>
                  {inquiry.project_requirements && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2">Requirements (PRD)</p>
                      <MarkdownDisplay content={inquiry.project_requirements} />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    {inquiry.budget_range && (
                      <div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Budget Range
                        </p>
                        <p className="font-medium text-gray-900">{inquiry.budget_range}</p>
                      </div>
                    )}
                    {inquiry.timeline && (
                      <div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Timeline
                        </p>
                        <p className="font-medium text-gray-900">{inquiry.timeline}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lab Preferences */}
              {inquiry.preferred_lab && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Preferred Lab
                  </h2>
                  <div>
                    <p className="font-medium text-gray-900">{inquiry.preferred_lab.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{inquiry.preferred_lab.category}</p>
                    {inquiry.preferred_lab.description && (
                      <p className="text-sm text-gray-600 mt-2">{inquiry.preferred_lab.description}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Equipment Requirements */}
              {inquiry.equipment_needed && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Wrench className="w-5 h-5 mr-2" />
                    Equipment Requirements
                  </h2>
                  {inquiry.equipment_details ? (
                    <p className="text-gray-900 whitespace-pre-wrap">{inquiry.equipment_details}</p>
                  ) : (
                    <p className="text-gray-600">Equipment needed, but no details provided.</p>
                  )}
                </div>
              )}

              {/* Additional Notes */}
              {inquiry.additional_notes && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Additional Notes
                  </h2>
                  <p className="text-gray-900 whitespace-pre-wrap">{inquiry.additional_notes}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response Notes
                    </label>
                    <textarea
                      value={responseNotes}
                      onChange={(e) => setResponseNotes(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add notes about this inquiry..."
                    />
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleStatusUpdate('under_review')}
                      disabled={updating || inquiry.status === 'under_review'}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Mark as Under Review
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('responded')}
                      disabled={updating || inquiry.status === 'responded'}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Mark as Responded
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('approved')}
                      disabled={updating || inquiry.status === 'approved'}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('rejected')}
                      disabled={updating || inquiry.status === 'rejected'}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('closed')}
                      disabled={updating || inquiry.status === 'closed'}
                      className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Submitted</p>
                    <p className="font-medium text-gray-900">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {inquiry.responded_at && (
                    <div>
                      <p className="text-gray-500">Responded</p>
                      <p className="font-medium text-gray-900">
                        {new Date(inquiry.responded_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {inquiry.assigned_user && (
                    <div>
                      <p className="text-gray-500">Assigned To</p>
                      <p className="font-medium text-gray-900">{inquiry.assigned_user.name}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Response Notes */}
              {inquiry.response_notes && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Notes</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{inquiry.response_notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default InquiryDetailPage;


