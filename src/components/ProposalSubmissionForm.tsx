'use client';

import React, { useState } from 'react';
import { X, FileText, Calendar, Code, Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface ProposalSubmissionFormProps {
  gig: {
    id: string;
    title: string;
    description: string;
    skills_required: string;
    eligibility_criteria: any;
    application_deadline: string;
    max_applications: number;
    lab: {
      id: string;
      name: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposalData: ProposalData) => Promise<void>;
}

interface ProposalData {
  gig_id: string;
  lab_id: string;
  student_id: string;
  title: string;
  problem_statement: string;
  approach: string;
  expected_outcome: string;
  equipment_needed: boolean;
  github_link?: string;
  attachment_url?: string;
}

const ProposalSubmissionForm: React.FC<ProposalSubmissionFormProps> = ({
  gig,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<ProposalData>({
    gig_id: gig.id,
    lab_id: gig.lab.id,
    student_id: '', // This will be set from auth context
    title: '',
    problem_statement: '',
    approach: '',
    expected_outcome: '',
    equipment_needed: false,
    github_link: '',
    attachment_url: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.problem_statement || !formData.approach || !formData.expected_outcome) {
        throw new Error('Please fill in all required fields');
      }

      // Set student_id from auth context (placeholder for now)
      const proposalData = {
        ...formData,
        student_id: '550e8400-e29b-41d4-a716-446655440099' // Placeholder student ID
      };

      await onSubmit(proposalData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        gig_id: gig.id,
        lab_id: gig.lab.id,
        student_id: '',
        title: '',
        problem_statement: '',
        approach: '',
        expected_outcome: '',
        equipment_needed: false,
        github_link: '',
        attachment_url: ''
      });

      // Close modal after success
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Submit Proposal</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Gig Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{gig.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{gig.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Deadline: {new Date(gig.application_deadline).toLocaleDateString()}</span>
            </div>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800">Proposal submitted successfully!</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-800">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposal Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your proposal title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment Needed
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="equipment_needed"
                    checked={formData.equipment_needed}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I will need lab equipment for this project
                  </label>
                </div>
              </div>
            </div>

            {/* Problem Statement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem Statement *
              </label>
              <textarea
                name="problem_statement"
                value={formData.problem_statement}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the problem you aim to solve with this project..."
              />
            </div>

            {/* Approach */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Approach *
              </label>
              <textarea
                name="approach"
                value={formData.approach}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Explain your technical approach, methodology, and implementation strategy..."
              />
            </div>

            {/* Expected Outcome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Outcome *
              </label>
              <textarea
                name="expected_outcome"
                value={formData.expected_outcome}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the expected deliverables, features, and impact of your project..."
              />
            </div>


            {/* Additional Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  name="github_link"
                  value={formData.github_link}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repository"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Attachments
                </label>
                <input
                  type="url"
                  name="attachment_url"
                  value={formData.attachment_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://drive.google.com/file/..."
                />
              </div>
            </div>

            {/* Skills Match */}
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

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProposalSubmissionForm;
