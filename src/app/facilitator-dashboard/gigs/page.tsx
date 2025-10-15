'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthStore } from '@/store/authStore';
import { 
  ArrowLeft, 
  Plus, 
  Eye, 
  Edit, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Briefcase
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
    id: string;
    name: string;
    category: string;
    description: string;
  };
  proposals: Proposal[];
  stats?: {
    total_proposals: number;
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
  status: string;
  student_id: string;
  submitted_at: string;
  users: {
    name: string;
    email: string;
  };
}

const GigsPage: React.FC = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGig, setNewGig] = useState({
    lab_id: '',
    title: '',
    description: '',
    skills_required: '',
    eligibility_criteria: '',
    application_deadline: '',
    max_applications: 0
  });
  const { user, isAuthenticated, isLoading } = useAuthStore();

  // Separate state for raw input values to avoid JSON parsing issues
  const [rawInputs, setRawInputs] = useState({
    prerequisites: '',
    features: '',
    tech_stack: ''
  });

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
      <div className="space-y-2 text-sm">
        {parsed.experience_level && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-24">Level:</span>
            <span className="text-gray-600">{parsed.experience_level}</span>
          </div>
        )}
        {parsed.duration && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-24">Duration:</span>
            <span className="text-gray-600">{parsed.duration}</span>
          </div>
        )}
        {parsed.budget && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-24">Budget:</span>
            <span className="text-gray-600">{parsed.budget}</span>
          </div>
        )}
        {parsed.prerequisites && parsed.prerequisites.length > 0 && (
          <div className="flex items-start">
            <span className="font-medium text-gray-700 w-24 mt-1">Prerequisites:</span>
            <div className="flex flex-wrap gap-1">
              {parsed.prerequisites.map((prereq, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}
        {parsed.features && parsed.features.length > 0 && (
          <div className="flex items-start">
            <span className="font-medium text-gray-700 w-24 mt-1">Features:</span>
            <div className="flex flex-wrap gap-1">
              {parsed.features.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        {parsed.complexity && (
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-24">Complexity:</span>
            <span className="text-gray-600">{parsed.complexity}</span>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    console.log('useEffect triggered:', { isLoading, isAuthenticated, userEmail: user?.email });
    if (!isLoading && isAuthenticated && user?.email) {
      fetchGigs();
    }
  }, [user, isAuthenticated, isLoading]);

  const fetchGigs = async () => {
    try {
      console.log('Fetching gigs for email:', user?.email);
      const response = await fetch(`/api/facilitator/gigs?email=${encodeURIComponent(user?.email || '')}`);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.status === 'success') {
        console.log('Gigs data:', data.data.gigs);
        setGigs(data.data.gigs || []);
      } else {
        console.error('Error fetching gigs:', data.message);
      }
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/facilitator/gigs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newGig,
          created_by: user?.id
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowCreateForm(false);
        setNewGig({
          lab_id: '',
          title: '',
          description: '',
          skills_required: '',
          eligibility_criteria: '',
          application_deadline: '',
          max_applications: 0
        });
        setRawInputs({
          prerequisites: '',
          features: '',
          tech_stack: ''
        });
        fetchGigs();
      }
    } catch (error) {
      console.error('Error creating gig:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'hold': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'closed': return <XCircle className="h-4 w-4 text-gray-600" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'hold': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    console.log('Loading state:', loading);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gigs...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering gigs page:', { gigs: gigs.length, user: user?.email });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/facilitator-dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gigs Management</h1>
                <p className="text-gray-600 mt-2">Manage your project opportunities and track proposals</p>
              </div>
              <Link
                href="/facilitator-dashboard/gigs/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Gig</span>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Gigs</p>
                  <p className="text-2xl font-bold text-gray-900">{gigs.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Gigs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {gigs.filter(g => g.status === 'open').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Proposals</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {gigs.reduce((sum, g) => sum + (g.stats?.total_proposals || g.proposals.length), 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved Proposals</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {gigs.reduce((sum, g) => sum + (g.stats?.approved || g.proposals.filter(p => p.status === 'approved').length), 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gigs List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">All Gigs</h3>
            </div>
            <div className="p-6">
              {gigs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No gigs found</h3>
                  <p className="text-gray-600 mb-4">
                    {user?.email ? 
                      `No gigs found for your assigned labs. User: ${user.email}` : 
                      'Please log in to view your gigs.'
                    }
                  </p>
                  <Link
                    href="/facilitator-dashboard/gigs/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Your First Gig</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {gigs.map((gig) => (
                  <div key={gig.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-xl font-semibold text-gray-900">{gig.title}</h4>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(gig.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                              {gig.status}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{gig.description}</p>
                        
                        {/* Skills Required */}
                        {gig.skills_required && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Skills Required:</p>
                            <div className="flex flex-wrap gap-1">
                              {gig.skills_required.split(',').map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                  {skill.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Eligibility Criteria */}
                        {gig.eligibility_criteria && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Eligibility Criteria:</p>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              {formatEligibilityCriteria(gig.eligibility_criteria)}
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            <span>{gig.labs.name} • {gig.labs.category}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Deadline: {gig.application_deadline ? new Date(gig.application_deadline).toLocaleDateString() : 'No deadline'}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Max: {gig.max_applications || 'Unlimited'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{gig.stats?.total_proposals || gig.proposals.length} proposals</span>
                          </div>
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span>{gig.stats?.approved || gig.proposals.filter(p => p.status === 'approved').length} approved</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Created: {new Date(gig.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/facilitator-dashboard/gigs/${gig.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </Link>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 flex items-center space-x-2">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>
          </div>

          {/* Create Gig Modal */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Create New Gig</h3>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleCreateGig} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lab *
                    </label>
                    <select
                      required
                      value={newGig.lab_id}
                      onChange={(e) => setNewGig({ ...newGig, lab_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Lab</option>
                      <option value="550e8400-e29b-41d4-a716-446655440002">Full Stack Development Lab</option>
                      <option value="550e8400-e29b-41d4-a716-446655440010">Agentic AI Development Lab</option>
                      <option value="550e8400-e29b-41d4-a716-446655440020">AR/VR & Metaverse Lab</option>
                      <option value="550e8400-e29b-41d4-a716-446655440030">Embedded IoT Development Lab</option>
                      <option value="550e8400-e29b-41d4-a716-446655440040">Innovation & Idea Labs</option>
                      <option value="550e8400-e29b-41d4-a716-446655440050">Robotics & Automation Lab</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gig Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newGig.title}
                      onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MERN Stack E-Commerce Website"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newGig.description}
                      onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the project requirements, goals, and deliverables..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills Required
                    </label>
                    <input
                      type="text"
                      value={newGig.skills_required}
                      onChange={(e) => setNewGig({ ...newGig, skills_required: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="React.js, Node.js, Express.js, MongoDB"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Eligibility Criteria
                    </label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Experience Level</label>
                          <select
                            value={newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria || '{}').experience_level || '' : ''}
                            onChange={(e) => {
                              const current = newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria) : {};
                              setNewGig({ 
                                ...newGig, 
                                eligibility_criteria: JSON.stringify({ ...current, experience_level: e.target.value })
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Duration</label>
                          <input
                            type="text"
                            value={newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria || '{}').duration || '' : ''}
                            onChange={(e) => {
                              const current = newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria) : {};
                              setNewGig({ 
                                ...newGig, 
                                eligibility_criteria: JSON.stringify({ ...current, duration: e.target.value })
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="e.g., 6-8 weeks"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Budget</label>
                          <input
                            type="text"
                            value={newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria || '{}').budget || '' : ''}
                            onChange={(e) => {
                              const current = newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria) : {};
                              setNewGig({ 
                                ...newGig, 
                                eligibility_criteria: JSON.stringify({ ...current, budget: e.target.value })
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="e.g., $2,000 - $5,000"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Complexity</label>
                          <input
                            type="text"
                            value={newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria || '{}').complexity || '' : ''}
                            onChange={(e) => {
                              const current = newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria) : {};
                              setNewGig({ 
                                ...newGig, 
                                eligibility_criteria: JSON.stringify({ ...current, complexity: e.target.value })
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="e.g., 8/10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Prerequisites (comma-separated)</label>
                        <input
                          type="text"
                          value={rawInputs.prerequisites}
                          onChange={(e) => {
                            setRawInputs({ ...rawInputs, prerequisites: e.target.value });
                          }}
                          onBlur={() => {
                            const current = newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria) : {};
                            const prerequisites = rawInputs.prerequisites.split(',').map(p => p.trim()).filter(p => p);
                            setNewGig({ 
                              ...newGig, 
                              eligibility_criteria: JSON.stringify({ ...current, prerequisites })
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="JavaScript, React Basics, Node.js"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Features (comma-separated)</label>
                        <input
                          type="text"
                          value={rawInputs.features}
                          onChange={(e) => {
                            setRawInputs({ ...rawInputs, features: e.target.value });
                          }}
                          onBlur={() => {
                            const current = newGig.eligibility_criteria ? JSON.parse(newGig.eligibility_criteria) : {};
                            const features = rawInputs.features.split(',').map(f => f.trim()).filter(f => f);
                            setNewGig({ 
                              ...newGig, 
                              eligibility_criteria: JSON.stringify({ ...current, features })
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Real-time Chat, Payment Integration, Admin Panel"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Application Deadline
                      </label>
                      <input
                        type="datetime-local"
                        value={newGig.application_deadline}
                        onChange={(e) => setNewGig({ ...newGig, application_deadline: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Applications
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newGig.max_applications}
                        onChange={(e) => setNewGig({ ...newGig, max_applications: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="5"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                      Create Gig
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default GigsPage;
