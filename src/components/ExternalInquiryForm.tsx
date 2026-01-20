'use client';

import React, { useState } from 'react';
import { 
  Send, 
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
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
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

const ExternalInquiryForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
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
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [labs, setLabs] = useState<Array<{ id: string; name: string; category: string }>>([]);

  // Fetch labs when category is selected
  React.useEffect(() => {
    if (formData.preferred_lab_category) {
      fetchLabs(formData.preferred_lab_category);
    } else {
      setLabs([]);
      setFormData(prev => ({ ...prev, preferred_lab_id: '' }));
    }
  }, [formData.preferred_lab_category]);

  const fetchLabs = async (category: string) => {
    try {
      const response = await fetch(`/api/labs?category=${category}`);
      if (response.ok) {
        const data = await response.json();
        setLabs(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching labs:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/external-inquiries/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      setSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
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
        });
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Inquiry Submitted Successfully!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your interest. Our facility managers will review your inquiry and get back to you within 24-48 hours.
          </p>
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</div>
                <span className="text-gray-700">We'll review your inquiry</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</div>
                <span className="text-gray-700">Schedule a consultation call</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</div>
                <span className="text-gray-700">Provide detailed project proposal</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Partner with Our Labs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Are you a company looking to collaborate with our labs? Submit an inquiry below and our facility managers will get back to you.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      required
                      value={formData.company_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Healthcare, Finance, Education"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="company_website" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      id="company_website"
                      name="company_website"
                      value={formData.company_website}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="contact_name"
                      name="contact_name"
                      required
                      value={formData.contact_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="contact_email"
                      name="contact_email"
                      required
                      value={formData.contact_email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="contact_phone"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="project_title" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="project_title"
                      name="project_title"
                      required
                      value={formData.project_title}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief title of your project"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project_description" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="project_description"
                    name="project_description"
                    required
                    rows={5}
                    value={formData.project_description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your project in detail..."
                  />
                </div>

                <div>
                  <label htmlFor="project_requirements" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Requirements
                  </label>
                  <textarea
                    id="project_requirements"
                    name="project_requirements"
                    rows={4}
                    value={formData.project_requirements}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="List specific requirements, technologies, or skills needed..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget_range" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        id="budget_range"
                        name="budget_range"
                        value={formData.budget_range}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-50k">Under ₹50,000</option>
                        <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                        <option value="100k-250k">₹1,00,000 - ₹2,50,000</option>
                        <option value="250k-500k">₹2,50,000 - ₹5,00,000</option>
                        <option value="500k-1m">₹5,00,000 - ₹10,00,000</option>
                        <option value="1m-plus">₹10,00,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="1-month">1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-12-months">6-12 months</option>
                        <option value="12-months-plus">12+ months</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Preferences */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lab Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferred_lab_category" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Lab Category
                  </label>
                  <select
                    id="preferred_lab_category"
                    name="preferred_lab_category"
                    value={formData.preferred_lab_category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="software">Software</option>
                    <option value="hardware">Hardware</option>
                  </select>
                </div>

                {labs.length > 0 && (
                  <div>
                    <label htmlFor="preferred_lab_id" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Lab (Optional)
                    </label>
                    <select
                      id="preferred_lab_id"
                      name="preferred_lab_id"
                      value={formData.preferred_lab_id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select lab</option>
                      {labs.map(lab => (
                        <option key={lab.id} value={lab.id}>{lab.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Equipment */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Requirements</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="equipment_needed"
                    name="equipment_needed"
                    checked={formData.equipment_needed}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="equipment_needed" className="ml-2 text-sm font-medium text-gray-700">
                    Do you need lab equipment for this project?
                  </label>
                </div>

                {formData.equipment_needed && (
                  <div>
                    <label htmlFor="equipment_details" className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment Details
                    </label>
                    <div className="relative">
                      <Wrench className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        id="equipment_details"
                        name="equipment_details"
                        rows={3}
                        value={formData.equipment_details}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the equipment you need..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  id="additional_notes"
                  name="additional_notes"
                  rows={4}
                  value={formData.additional_notes}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    Submit Inquiry
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ExternalInquiryForm;

