'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  MessageSquare,
  Star,
  FileText,
  Github,
  Paperclip
} from 'lucide-react';

interface EligibilityCriteria {
  experience_level?: string;
  prerequisites?: string[];
  duration?: string;
  budget?: string;
  features?: string[];
  complexity?: string;
  hardware?: string;
  software?: string;
  tech_stack?: string[];
}

interface Gig {
  id: string;
  title: string;
  description: string;
  skills_required: string;
  eligibility_criteria: string | EligibilityCriteria;
  status: string;
  application_deadline: string;
  max_applications: number;
  created_at: string;
  labs: {
    name: string;
    category: string;
    location: string;
    description: string;
  };
  proposals: Proposal[];
  stats: {
    total: number;
    draft: number;
    submitted: number;
    under_review: number;
    approved: number;
    rejected: number;
  };
}

interface Proposal {
  id: string;
  title: string;
  problem_statement: string;
  approach: string;
  expected_outcome: string;
  timeline: any;
  equipment_needed: boolean;
  status: string;
  review_comments: string;
  submitted_at: string;
  reviewed_at: string;
  github_link: string;
  attachment_url: string;
  score: number;
  student_id: string;
  users: {
    name: string;
    email: string;
    department: string;
    experience: number;
  };
}

const GigDetailsPage: React.FC = () => {
  const params = useParams();
  const gigId = params.id as string;
  const [activeTab, setActiveTab] = useState('details');
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  // Helper function to parse eligibility criteria
  const parseEligibilityCriteria = (criteria: string | EligibilityCriteria): EligibilityCriteria | null => {
    if (typeof criteria === 'string') {
      try {
        return JSON.parse(criteria);
      } catch (error) {
        console.error('Error parsing eligibility criteria:', error);
        return null;
      }
    }
    return criteria;
  };

  // Helper function to format eligibility criteria for display
  const formatEligibilityCriteria = (criteria: string | EligibilityCriteria) => {
    const parsed = parseEligibilityCriteria(criteria);
    if (!parsed) return null;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parsed.experience_level && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Experience Level</h4>
              <p className="text-gray-700">{parsed.experience_level}</p>
            </div>
          )}
          {parsed.duration && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
              <p className="text-gray-700">{parsed.duration}</p>
            </div>
          )}
          {parsed.budget && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Budget</h4>
              <p className="text-gray-700">{parsed.budget}</p>
            </div>
          )}
          {parsed.complexity && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Complexity</h4>
              <p className="text-gray-700">{parsed.complexity}</p>
            </div>
          )}
        </div>
        
        {parsed.prerequisites && parsed.prerequisites.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Prerequisites</h4>
            <div className="flex flex-wrap gap-2">
              {parsed.prerequisites.map((prereq, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {parsed.features && parsed.features.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
            <div className="space-y-2">
              {parsed.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {parsed.tech_stack && parsed.tech_stack.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Tech Stack</h4>
            <div className="space-y-2">
              {parsed.tech_stack.map((tech, index) => (
                <div key={index} className="flex items-start">
                  <Star className="h-4 w-4 text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {parsed.hardware && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Hardware Requirements</h4>
            <p className="text-gray-700">{parsed.hardware}</p>
          </div>
        )}
        
        {parsed.software && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Software Requirements</h4>
            <p className="text-gray-700">{parsed.software}</p>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (gigId) {
      fetchGigDetails();
    }
  }, [gigId]);

  const fetchGigDetails = async () => {
    try {
      const response = await fetch(`/api/facilitator/gigs/${gigId}`);
      const data = await response.json();
      
      if (data.success) {
        setGig(data.data);
      }
    } catch (error) {
      console.error('Error fetching gig details:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProposalStatus = async (proposalId: string, status: string, comments?: string, score?: number) => {
    try {
      const response = await fetch(`/api/facilitator/proposals/${proposalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          review_comments: comments,
          score
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh gig details
        fetchGigDetails();
        setSelectedProposal(null);
      }
    } catch (error) {
      console.error('Error updating proposal:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'under_review': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gig details...</p>
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gig Not Found</h1>
          <Link href="/facilitator-dashboard" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/facilitator-dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{gig.title}</h1>
                <p className="text-gray-600 mb-4">{gig.labs.name} • {gig.labs.category}</p>
                <p className="text-gray-700">{gig.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(gig.status)}`}>
                  {gig.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('proposals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'proposals' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Proposals ({gig.stats.total})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h3>
                    {gig.skills_required ? (
                      <div className="flex flex-wrap gap-2">
                        {gig.skills_required.split(',').map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700">Not specified</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
                    {gig.eligibility_criteria ? (
                      formatEligibilityCriteria(gig.eligibility_criteria)
                    ) : (
                      <p className="text-gray-700">Not specified</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Application Deadline</p>
                        <p className="text-gray-900">{gig.application_deadline ? new Date(gig.application_deadline).toLocaleDateString() : 'No deadline'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Max Applications</p>
                        <p className="text-gray-900">{gig.max_applications || 'Unlimited'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Created</p>
                        <p className="text-gray-900">{new Date(gig.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'proposals' && (
              <div className="space-y-6">
                {/* Proposal Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gray-900">{gig.stats.total}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">{gig.stats.submitted}</p>
                    <p className="text-sm text-blue-600">Submitted</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-600">{gig.stats.under_review}</p>
                    <p className="text-sm text-yellow-600">Under Review</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{gig.stats.approved}</p>
                    <p className="text-sm text-green-600">Approved</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-600">{gig.stats.rejected}</p>
                    <p className="text-sm text-red-600">Rejected</p>
                  </div>
                </div>

                {/* Proposals List */}
                <div className="space-y-4">
                  {gig.proposals.map((proposal) => (
                    <div key={proposal.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{proposal.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                              {proposal.status}
                            </span>
                            {proposal.score && (
                              <div className="flex items-center text-yellow-600">
                                <Star className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium">{proposal.score}/10</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">By: {proposal.users.name} ({proposal.users.email})</p>
                          <p className="text-gray-700 mb-3">{proposal.problem_statement}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Submitted: {proposal.submitted_at ? new Date(proposal.submitted_at).toLocaleDateString() : 'Not submitted'}</span>
                            {proposal.equipment_needed && <span className="text-orange-600">Equipment needed</span>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedProposal(proposal)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Review</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Proposal Review Modal */}
        {selectedProposal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Review Proposal</h3>
                  <button
                    onClick={() => setSelectedProposal(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Student Information</h4>
                  <p className="text-gray-700">{selectedProposal.users.name} ({selectedProposal.users.email})</p>
                  <p className="text-gray-600">{selectedProposal.users.department} • {selectedProposal.users.experience} years experience</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Problem Statement</h4>
                  <p className="text-gray-700">{selectedProposal.problem_statement}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Approach</h4>
                  <p className="text-gray-700">{selectedProposal.approach}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Expected Outcome</h4>
                  <p className="text-gray-700">{selectedProposal.expected_outcome}</p>
                </div>

                {selectedProposal.github_link && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">GitHub Link</h4>
                    <a href={selectedProposal.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
                      <Github className="h-4 w-4 mr-2" />
                      {selectedProposal.github_link}
                    </a>
                  </div>
                )}

                {selectedProposal.attachment_url && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Attachment</h4>
                    <a href={selectedProposal.attachment_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Download Attachment
                    </a>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => updateProposalStatus(selectedProposal.id, 'approved')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => updateProposalStatus(selectedProposal.id, 'rejected')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetailsPage;
