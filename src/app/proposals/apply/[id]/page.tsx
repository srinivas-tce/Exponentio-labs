'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileText,
  Code,
  Users,
  DollarSign,
  Target,
  Zap,
  Upload,
  ExternalLink
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
  eligibility_criteria: EligibilityCriteria;
  status: string;
  application_deadline: string;
  max_applications: number;
  lab: {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
  };
  created_by: {
    name: string;
    email: string;
    thumbnail: string;
  };
  created_at: string;
  updated_at: string;
}

interface ApplicationFormData {
  // Dynamic criteria fields (will be populated based on gig.eligibility_criteria)
  [key: string]: any;
  
  // Proposal details
  title: string;
  problem_statement: string;
  approach: string;
  expected_outcome: string;
  equipment_needed: boolean;
  github_link: string;
  attachment_url: string;
}

const ProposalApplyPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const [formData, setFormData] = useState<ApplicationFormData>({
    title: '',
    problem_statement: '',
    approach: '',
    expected_outcome: '',
    equipment_needed: false,
    github_link: '',
    attachment_url: ''
  });

  const totalSteps = 3;

  useEffect(() => {
    if (params.id) {
      fetchGig();
    }
  }, [params.id]);

  const fetchGig = async () => {
    try {
      const response = await fetch(`/api/proposals/gig/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setGig(data.data);
        // Pre-populate some fields from gig data
        // Initialize dynamic criteria fields
        const initialFormData: ApplicationFormData = {
          title: data.data.title || '',
          problem_statement: '',
          approach: '',
          expected_outcome: '',
          equipment_needed: false,
          github_link: '',
          attachment_url: ''
        };
        
        // Add dynamic criteria fields if eligibility_criteria is an array
        if (Array.isArray(data.data.eligibility_criteria)) {
          data.data.eligibility_criteria.forEach((criteria: any) => {
            initialFormData[`criteria_${criteria.id}`] = '';
          });
        }
        
        setFormData(initialFormData);
      } else {
        setError(data.message || 'Failed to load gig details');
      }
    } catch (error) {
      console.error('Error fetching gig:', error);
      setError('Failed to load gig details');
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = () => {
    // Always allow students to proceed - eligibility will be checked by facilitators
    setIsEligible(true);
    return true;
  };

  const isStep1Valid = () => {
    if (!gig || !Array.isArray(gig.eligibility_criteria)) {
      return false;
    }
    
    // Check if all dynamic criteria fields are filled
    return gig.eligibility_criteria.every((criteria: any) => {
      const fieldName = `criteria_${criteria.id}`;
      const value = formData[fieldName];
      return value !== undefined && value !== null && value !== '';
    });
  };

  const handleInputChange = (field: keyof ApplicationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof ApplicationFormData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      checkEligibility(); // Always allow proceeding
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!gig || !user) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/proposals/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gig_id: gig.id,
          lab_id: gig.lab.id,
          student_id: user.id,
          title: formData.title,
          problem_statement: formData.problem_statement,
          approach: formData.approach,
          expected_outcome: formData.expected_outcome,
          timeline: {}, // Empty timeline object as required by schema
          equipment_needed: formData.equipment_needed,
          github_link: formData.github_link,
          attachment_url: formData.attachment_url
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(data.error || 'Failed to submit proposal');
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      setError('Failed to submit proposal');
    } finally {
      setSubmitting(false);
    }
  };

  const isDeadlinePassed = gig ? new Date(gig.application_deadline) < new Date() : false;
  const isGigClosed = gig?.status !== 'open';

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
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gig Not Found</h2>
          <p className="text-gray-600 mb-4">The gig you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/facilitator-dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isDeadlinePassed || isGigClosed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isDeadlinePassed ? 'Application Deadline Passed' : 'Gig No Longer Available'}
          </h2>
          <p className="text-gray-600 mb-4">
            {isDeadlinePassed 
              ? `The application deadline was ${new Date(gig.application_deadline).toLocaleDateString()}`
              : 'This gig is no longer accepting applications.'
            }
          </p>
          <button
            onClick={() => router.push('/facilitator-dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start space-x-4">
              <img
                src={gig.lab.thumbnail}
                alt={gig.lab.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{gig.title}</h1>
                <p className="text-gray-600 mb-4">{gig.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Deadline: {new Date(gig.application_deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Max: {gig.max_applications || 'Unlimited'}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{gig.lab.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <span className="text-green-800 font-medium">Proposal submitted successfully!</span>
              <p className="text-green-700 text-sm mt-1">You will be redirected to the homepage shortly.</p>
            </div>
          </div>
        )}

        {/* Step 1: Eligibility Questions */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Background Information</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Please answer these questions to help facilitators understand your background and experience.
            </p>

            <div className="space-y-6">
              {/* Handle Complex Eligibility Criteria Array Structure */}
              {Array.isArray(gig.eligibility_criteria) && gig.eligibility_criteria.length > 0 ? (
                gig.eligibility_criteria.map((criteria, index) => (
                  <div key={criteria.id || index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {criteria.name} *
                    </label>
                    
                    {criteria.type === 'manual' && (
                      <div>
                        {criteria.data_type === 'percentage' && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              Required: {criteria.value}% {criteria.description}
                            </p>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              placeholder={`Enter your ${criteria.name.toLowerCase()} percentage`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => handleInputChange(`criteria_${criteria.id}` as keyof ApplicationFormData, e.target.value)}
                              required
                            />
                          </div>
                        )}
                        
                        {criteria.data_type === 'integer' && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              Required: {criteria.value} {criteria.description}
                            </p>
                            <input
                              type="number"
                              min="0"
                              placeholder={`Enter your ${criteria.name.toLowerCase()} score`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => handleInputChange(`criteria_${criteria.id}` as keyof ApplicationFormData, e.target.value)}
                              required
                            />
                          </div>
                        )}
                        
                        {criteria.data_type === 'boolean' && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              {criteria.description}
                            </p>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => handleInputChange(`criteria_${criteria.id}` as keyof ApplicationFormData, e.target.value)}
                              required
                            >
                              <option value="">Select your answer</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        )}
                        
                        {criteria.data_type === 'text' && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              {criteria.description}
                            </p>
                            <textarea
                              rows={3}
                              placeholder={`Describe your ${criteria.name.toLowerCase()}`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => handleInputChange(`criteria_${criteria.id}` as keyof ApplicationFormData, e.target.value)}
                              required
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {criteria.type === 'multiple_choice' && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          {criteria.description}
                        </p>
                        <div className="space-y-2">
                          {criteria.options?.map((option: string, optionIndex: number) => (
                            <label key={optionIndex} className="flex items-center">
                              <input
                                type="radio"
                                name={`criteria_${criteria.id}`}
                                value={option}
                                onChange={(e) => handleInputChange(`criteria_${criteria.id}` as keyof ApplicationFormData, e.target.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                required
                              />
                              <span className="ml-2 text-sm text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                /* Fallback for simple object structure (to be removed) */
                <div className="text-center py-8">
                  <p className="text-gray-500">No eligibility criteria available for this gig.</p>
                </div>
              )}
            </div>


            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                disabled={!isStep1Valid()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Proposal Details
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Proposal Details */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Proposal Details</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Provide detailed information about your proposed solution.
            </p>

            <div className="space-y-6">
              {/* Proposal Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposal Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your proposal title"
                  required
                />
              </div>

              {/* Problem Statement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem Statement *
                </label>
                <textarea
                  value={formData.problem_statement}
                  onChange={(e) => handleInputChange('problem_statement', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the problem you aim to solve with this project..."
                  required
                />
              </div>

              {/* Technical Approach */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Approach *
                </label>
                <textarea
                  value={formData.approach}
                  onChange={(e) => handleInputChange('approach', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain your technical approach, methodology, and implementation strategy..."
                  required
                />
              </div>

              {/* Expected Outcome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Outcome *
                </label>
                <textarea
                  value={formData.expected_outcome}
                  onChange={(e) => handleInputChange('expected_outcome', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the expected deliverables, features, and impact of your project..."
                  required
                />
              </div>

              {/* Equipment Needed */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.equipment_needed}
                    onChange={(e) => handleInputChange('equipment_needed', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I will need lab equipment for this project
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.title || !formData.problem_statement || !formData.approach || !formData.expected_outcome}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Additional Information
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Additional Information */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-6">
              <Code className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Additional Information</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Provide any additional information that supports your proposal.
            </p>

            <div className="space-y-6">

              {/* GitHub Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={formData.github_link}
                  onChange={(e) => handleInputChange('github_link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repository"
                />
              </div>

              {/* Additional Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Attachments
                </label>
                <input
                  type="url"
                  value={formData.attachment_url}
                  onChange={(e) => handleInputChange('attachment_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://drive.google.com/file/..."
                />
              </div>

              {/* Skills Required Display */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Required Skills for this Gig:</h4>
                <div className="flex flex-wrap gap-2">
                  {gig.skills_required.split(',').map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Submit Proposal
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalApplyPage;
