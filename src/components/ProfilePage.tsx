'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, Star, Briefcase, Award, FileText, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface Proposal {
  id: string;
  title: string;
  problem_statement: string;
  approach: string;
  expected_outcome: string;
  timeline: any;
  equipment_needed: boolean;
  status: string;
  review_comments: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  github_link: string | null;
  attachment_url: string | null;
  score: number | null;
  gigs: {
    id: string;
    title: string;
    description: string;
    skills_required: string;
    eligibility_criteria: any;
    application_deadline: string;
    status: string;
    labs: {
      id: string;
      name: string;
      description: string;
    };
  };
}

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [proposalsLoading, setProposalsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'proposals'>('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    experience: '',
    specialization: '',
    gender: '',
    thumbnail: ''
  });
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.id) {
        setProfileLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/internal/users/sync?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          const userData = data.data.user;
          
          setProfileData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            department: userData.department || '',
            experience: userData.experience?.toString() || '',
            specialization: userData.specialization || '',
            gender: userData.gender || '',
            thumbnail: userData.thumbnail || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.id]);

  // Fetch proposals on component mount
  useEffect(() => {
    const fetchProposals = async () => {
      if (!user?.id) {
        setProposalsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/student/proposals?student_id=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setProposals(data.proposals || []);
        }
      } catch (error) {
        console.error('Error fetching proposals:', error);
      } finally {
        setProposalsLoading(false);
      }
    };

    fetchProposals();
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };


  const handleSave = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/internal/users/sync`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          updates: {
            name: profileData.name,
            phone: profileData.phone,
            experience: profileData.experience ? parseInt(profileData.experience) : null,
            department: profileData.department,
            specialization: profileData.specialization,
            gender: profileData.gender
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Update the user in the auth store
        useAuthStore.getState().setUser({
          ...user,
          name: profileData.name,
          gender: profileData.gender,
          thumbnail: profileData.thumbnail
        });
        setIsEditing(false);
      } else {
        console.error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to current user data
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        department: '',
        experience: '',
        specialization: '',
        gender: user.gender || '',
        thumbnail: user.thumbnail || ''
      });
    }
    setIsEditing(false);
  };

  // Helper function to get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'draft':
        return { icon: <Edit className="w-4 h-4" />, color: 'text-gray-600', bg: 'bg-gray-100' };
      case 'submitted':
        return { icon: <Clock className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'under_review':
        return { icon: <AlertCircle className="w-4 h-4" />, color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'approved':
        return { icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-100' };
      case 'rejected':
        return { icon: <XCircle className="w-4 h-4" />, color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { icon: <FileText className="w-4 h-4" />, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading state
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show not authenticated state
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
          <a
            href="/login"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <img
                  src={profileData.thumbnail || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=14a800&color=fff`}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="ml-6">
                  <h1 className="text-3xl font-bold">{profileData.name || 'User'}</h1>
                  <p className="text-blue-100 text-lg">{profileData.email}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-blue-100 ml-2">({proposals.length} proposals submitted)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center disabled:opacity-50"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('proposals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'proposals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                My Proposals ({proposals.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'profile' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900">{profileData.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+91 98765 43210"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.phone || 'Not provided'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="department"
                          value={profileData.department}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Computer Science"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.department || 'Not provided'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="specialization"
                          value={profileData.specialization}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Full Stack Development"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.specialization || 'Not provided'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={profileData.gender}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{profileData.gender || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                  {isEditing ? (
                    <input
                      type="number"
                      name="experience"
                      value={profileData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Years of experience"
                      min="0"
                      max="50"
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.experience ? `${profileData.experience} years` : 'Not provided'}</p>
                  )}
                </div>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-semibold capitalize">{user?.role || 'Student'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Proposals Submitted:</span>
                      <span className="font-semibold">{proposals.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Approved Proposals:</span>
                      <span className="font-semibold">{proposals.filter(p => p.status === 'approved').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Member Since:</span>
                      <span className="font-semibold">{user?.email_verified_at ? new Date(user.email_verified_at).getFullYear() : '2024'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View My Applications
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Browse Jobs
                    </button>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      Update Availability
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              /* Proposals Tab */
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">My Proposals</h2>
                  <p className="text-gray-600">Track your submitted proposals and their status</p>
                </div>

                {proposalsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Loading proposals...</span>
                  </div>
                ) : proposals.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
                    <p className="text-gray-600 mb-4">You haven't submitted any proposals yet.</p>
                    <a
                      href="/services"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse Available Gigs
                    </a>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {proposals.map((proposal) => {
                      const statusInfo = getStatusInfo(proposal.status);
                      return (
                        <div key={proposal.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{proposal.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">
                                <strong>Gig:</strong> {proposal.gigs.title}
                              </p>
                              <p className="text-sm text-gray-600 mb-2">
                                <strong>Lab:</strong> {proposal.gigs.labs.name}
                              </p>
                            </div>
                            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                              {statusInfo.icon}
                              <span className="ml-2 capitalize">{proposal.status.replace('_', ' ')}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Problem Statement</h4>
                              <p className="text-sm text-gray-600 line-clamp-2">{proposal.problem_statement}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Expected Outcome</h4>
                              <p className="text-sm text-gray-600 line-clamp-2">{proposal.expected_outcome}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>Submitted: {formatDate(proposal.submitted_at)}</span>
                            </div>
                            {proposal.equipment_needed && (
                              <div className="flex items-center text-blue-600">
                                <Award className="w-4 h-4 mr-1" />
                                <span>Equipment Requested</span>
                              </div>
                            )}
                          </div>

                          {proposal.review_comments && (
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                              <h4 className="font-medium text-gray-900 mb-2">Review Comments</h4>
                              <p className="text-sm text-gray-600">{proposal.review_comments}</p>
                            </div>
                          )}

                          {proposal.score && (
                            <div className="flex items-center mb-4">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="font-medium text-gray-900">Score: {proposal.score}/10</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex space-x-4">
                              {proposal.github_link && (
                                <a
                                  href={proposal.github_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  GitHub
                                </a>
                              )}
                              {proposal.attachment_url && (
                                <a
                                  href={proposal.attachment_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  Attachment
                                </a>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {proposal.reviewed_at && `Reviewed: ${formatDate(proposal.reviewed_at)}`}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
