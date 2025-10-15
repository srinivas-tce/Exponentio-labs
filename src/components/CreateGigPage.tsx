'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Save, ArrowLeft, Calendar, Users, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface EligibilityCriteria {
  id: string;
  name: string;
  value: string;
  data_type: 'text' | 'integer' | 'decimal' | 'percentage' | 'boolean' | 'date' | 'email' | 'url';
  type: 'inpulse' | 'manual';
  description?: string;
}

interface GigFormData {
  title: string;
  description: string;
  skills_required: string;
  eligibility_criteria: EligibilityCriteria[];
  application_deadline: string;
  max_applications: number;
  lab_id: string;
}

const CreateGigPage = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [labs, setLabs] = useState<any[]>([]);
  const [formData, setFormData] = useState<GigFormData>({
    title: '',
    description: '',
    skills_required: '',
    eligibility_criteria: [],
    application_deadline: '',
    max_applications: 10,
    lab_id: ''
  });

  // Fetch labs on component mount
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch('/api/labs');
        if (response.ok) {
          const data = await response.json();
          setLabs(data.data.labs || []);
        }
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();
  }, []);

  const dataTypeOptions = [
    { value: 'text', label: 'Text', icon: '' },
    { value: 'integer', label: 'Integer', icon: '' },
    { value: 'decimal', label: 'Decimal', icon: '' },
    { value: 'percentage', label: 'Percentage', icon: '' },
    { value: 'boolean', label: 'Yes/No', icon: '' },
    { value: 'date', label: 'Date', icon: '' },
    { value: 'email', label: 'Email', icon: '' },
    { value: 'url', label: 'URL', icon: '' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'max_applications' ? parseInt(value) || 0 : value
    }));
  };

  const addEligibilityCriteria = () => {
    const newCriteria: EligibilityCriteria = {
      id: Date.now().toString(),
      name: '',
      value: '',
      data_type: 'text',
      type: 'manual',
      description: ''
    };
    
    setFormData(prev => ({
      ...prev,
      eligibility_criteria: [...prev.eligibility_criteria, newCriteria]
    }));
  };

  const updateEligibilityCriteria = (id: string, field: keyof EligibilityCriteria, value: string) => {
    setFormData(prev => ({
      ...prev,
      eligibility_criteria: prev.eligibility_criteria.map(criteria =>
        criteria.id === id ? { ...criteria, [field]: value } : criteria
      )
    }));
  };

  const removeEligibilityCriteria = (id: string) => {
    setFormData(prev => ({
      ...prev,
      eligibility_criteria: prev.eligibility_criteria.filter(criteria => criteria.id !== id)
    }));
  };

  const getInputComponent = (criteria: EligibilityCriteria) => {
    const commonProps = {
      value: criteria.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
        updateEligibilityCriteria(criteria.id, 'value', e.target.value),
      className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    };

    switch (criteria.data_type) {
      case 'integer':
        return <input type="number" step="1" {...commonProps} placeholder="Enter number" />;
      case 'decimal':
        return <input type="number" step="0.1" {...commonProps} placeholder="Enter decimal" />;
      case 'percentage':
        return <input type="number" min="0" max="100" {...commonProps} placeholder="Enter percentage" />;
      case 'boolean':
        return (
          <select {...commonProps}>
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        );
      case 'date':
        return <input type="date" {...commonProps} />;
      case 'email':
        return <input type="email" {...commonProps} placeholder="Enter email" />;
      case 'url':
        return <input type="url" {...commonProps} placeholder="Enter URL" />;
      default:
        return <input type="text" {...commonProps} placeholder="Enter text" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await fetch('/api/facilitator/gigs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          created_by: user.id
        })
      });

      if (response.ok) {
        // Redirect to gigs list or show success message
        window.location.href = '/facilitator-dashboard/gigs';
      } else {
        console.error('Failed to create gig');
      }
    } catch (error) {
      console.error('Error creating gig:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    return formData.title && 
           formData.description && 
           formData.lab_id && 
           formData.eligibility_criteria.every(c => c.name && c.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href="/facilitator-dashboard/gigs"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Gigs
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Create New Gig</h1>
          <p className="text-gray-600 mt-2">Create a new gig with dynamic eligibility criteria for students.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gig Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter gig title"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the gig requirements and objectives"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lab *
                  </label>
                  <select
                    name="lab_id"
                    value={formData.lab_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a lab</option>
                    {labs.map(lab => (
                      <option key={lab.id} value={lab.id}>
                        {lab.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Applications
                  </label>
                  <input
                    type="number"
                    name="max_applications"
                    value={formData.max_applications}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    type="datetime-local"
                    name="application_deadline"
                    value={formData.application_deadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills Required
                  </label>
                  <input
                    type="text"
                    name="skills_required"
                    value={formData.skills_required}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="React, Node.js, Python..."
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Eligibility Criteria */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Eligibility Criteria
                </h2>
                <button
                  type="button"
                  onClick={addEligibilityCriteria}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Criteria
                </button>
              </div>

              {formData.eligibility_criteria.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No eligibility criteria added yet.</p>
                  <p className="text-sm">Click "Add Criteria" to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.eligibility_criteria.map((criteria, index) => (
                    <div key={criteria.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">
                          Criteria #{index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeEligibilityCriteria(criteria.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Criteria Name *
                          </label>
                          <input
                            type="text"
                            value={criteria.name}
                            onChange={(e) => updateEligibilityCriteria(criteria.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Attendance, GPA"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data Type *
                          </label>
                          <select
                            value={criteria.data_type}
                            onChange={(e) => updateEligibilityCriteria(criteria.id, 'data_type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {dataTypeOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Value *
                          </label>
                          {getInputComponent(criteria)}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Verification Type *
                          </label>
                          <select
                            value={criteria.type}
                            onChange={(e) => updateEligibilityCriteria(criteria.id, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="inpulse">Inpulse (Auto-fetch)</option>
                            <option value="manual">Manual (User submits)</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description (Optional)
                        </label>
                        <input
                          type="text"
                          value={criteria.description || ''}
                          onChange={(e) => updateEligibilityCriteria(criteria.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Additional details about this criteria"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          {previewMode && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Preview: How Students Will See This
              </h3>
              
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">Eligibility Requirements:</h4>
                {formData.eligibility_criteria.length === 0 ? (
                  <p className="text-gray-500 italic">No eligibility criteria set</p>
                ) : (
                  <ul className="space-y-2">
                    {formData.eligibility_criteria.map((criteria, index) => (
                      <li key={criteria.id} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">
                          <strong>{criteria.name}:</strong> {criteria.value}
                          {criteria.data_type === 'percentage' && '%'}
                          {criteria.description && ` (${criteria.description})`}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          criteria.type === 'inpulse' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {criteria.type === 'inpulse' ? 'Auto-verified' : 'Manual upload'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <a
              href="/facilitator-dashboard/gigs"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </a>
            <button
              type="submit"
              disabled={!validateForm() || loading}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Gig
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGigPage;
