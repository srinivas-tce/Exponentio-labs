'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, CheckCircle, Users, Shield, Zap, DollarSign, TrendingUp, Lightbulb, ShoppingCart, BarChart, MessageCircle, Clock, Target, Award, Database, Smartphone, Globe, CreditCard, Loader2, Send, Calendar, User } from 'lucide-react';
import ProposalSubmissionForm from '@/components/ProposalSubmissionForm';

interface ProjectProposal {
  id: string;
  title: string;
  type: string;
  duration: string;
  budget: string;
  description: string;
  skills_required: string;
  eligibility_criteria: any;
  application_deadline: string;
  max_applications: number;
  lab: {
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

interface ServiceData {
  service: {
    name: string;
    description: string;
    lab_name: string;
    lab_description: string;
    lab_thumbnail: string;
  };
  project_proposals: ProjectProposal[];
  total_proposals: number;
}

const FullStackServicePage = () => {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGig, setSelectedGig] = useState<ProjectProposal | null>(null);
  const [showProposalForm, setShowProposalForm] = useState(false);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/fullstack');
        if (!response.ok) {
          throw new Error('Failed to fetch service data');
        }
        const data = await response.json();
        setServiceData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  const handleApplyClick = (gig: ProjectProposal) => {
    // Navigate to the new apply page
    window.location.href = `/proposals/apply/${gig.id}`;
  };

  const handleProposalSubmit = async (proposalData: any) => {
    try {
      const response = await fetch('/api/proposals/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit proposal');
      }

      return result;
    } catch (error) {
      console.error('Error submitting proposal:', error);
      throw error;
    }
  };

  const handleCloseProposalForm = () => {
    setShowProposalForm(false);
    setSelectedGig(null);
  };

  // Helper function to get icon for project type
  const getProjectIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('e-commerce') || titleLower.includes('commerce') || titleLower.includes('shop')) {
      return <ShoppingCart className="w-8 h-8 text-blue-600" />;
    } else if (titleLower.includes('dashboard') || titleLower.includes('analytics') || titleLower.includes('admin')) {
      return <BarChart className="w-8 h-8 text-green-600" />;
    } else if (titleLower.includes('social') || titleLower.includes('media') || titleLower.includes('chat')) {
      return <MessageCircle className="w-8 h-8 text-purple-600" />;
    } else if (titleLower.includes('blog') || titleLower.includes('cms') || titleLower.includes('content')) {
      return <Database className="w-8 h-8 text-orange-600" />;
    } else if (titleLower.includes('mobile') || titleLower.includes('app') || titleLower.includes('responsive')) {
      return <Smartphone className="w-8 h-8 text-indigo-600" />;
    } else if (titleLower.includes('api') || titleLower.includes('backend') || titleLower.includes('server')) {
      return <Globe className="w-8 h-8 text-cyan-600" />;
    } else if (titleLower.includes('payment') || titleLower.includes('finance') || titleLower.includes('billing')) {
      return <CreditCard className="w-8 h-8 text-emerald-600" />;
    }
    
    // Default fallback
    return <Code className="w-8 h-8 text-gray-600" />;
  };

  // Helper function to extract features from skills_required
  const extractFeatures = (skillsRequired: string) => {
    const skills = skillsRequired.split(',').map(skill => skill.trim());
    return skills.slice(0, 6); // Limit to 6 features
  };

  // Helper function to create tech stack from skills
  const createTechStack = (skillsRequired: string) => {
    const skills = skillsRequired.split(',').map(skill => skill.trim());
    return skills.map(skill => {
      if (skill.toLowerCase().includes('react')) return `Frontend: ${skill}`;
      if (skill.toLowerCase().includes('node')) return `Backend: ${skill}`;
      if (skill.toLowerCase().includes('mongo')) return `Database: ${skill}`;
      if (skill.toLowerCase().includes('jwt') || skill.toLowerCase().includes('auth')) return `Authentication: ${skill}`;
      return skill;
    });
  };

  // Helper function to create timeline from duration
  const createTimeline = (duration: string) => {
    const weeks = parseInt(duration.replace(/\D/g, '')) || 4;
    const phases = Math.min(weeks, 5);
    const timeline = [];
    
    for (let i = 1; i <= phases; i++) {
      timeline.push({
        phase: `Phase ${i}`,
        task: i === 1 ? "Requirement gathering, UI/UX wireframes" :
              i === 2 ? "Backend API setup, database schema design" :
              i === 3 ? "Frontend integration with backend APIs" :
              i === 4 ? "Testing, bug fixes, deployment" :
              "Final testing and deployment",
        duration: `${Math.ceil(weeks / phases)} week${Math.ceil(weeks / phases) > 1 ? 's' : ''}`
      });
    }
    return timeline;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading Full Stack service data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading service data: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const projectProposals = serviceData?.project_proposals || [];

  const features = [
    "Frontend & Backend Development",
    "API Development & Integration", 
    "Database Design & Optimization",
    "Responsive Web Design",
    "Cloud Deployment & Scaling",
    "Mobile-First Applications"
  ];

  const benefits = [
    "Complete digital transformation",
    "Cross-platform compatibility", 
    "Scalable architecture design",
    "Modern tech stack implementation",
    "Faster time to market",
    "Reduced development costs"
  ];

  const process = [
    {
      step: "1",
      title: "Requirements Analysis",
      description: "We analyze your needs and define the project scope and technical requirements"
    },
    {
      step: "2", 
      title: "Architecture Design",
      description: "Design scalable system architecture and select optimal technology stack"
    },
    {
      step: "3",
      title: "Development & Testing",
      description: "Build and rigorously test your application with modern development practices"
    },
    {
      step: "4",
      title: "Deployment & Maintenance",
      description: "Deploy to production and provide ongoing maintenance and support"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link
              href="/services"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </Link>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Code className="w-12 h-12 text-green-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                Full Stack <span className="text-green-600">Development</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              {serviceData?.service.description || 'End-to-end web and application development solutions. From frontend to backend, we build scalable, modern applications that grow with your business.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Frontend & Backend</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">API Development</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Database Integration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Proposals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready-to-Implement <span className="text-green-600">Project Proposals</span>
              {projectProposals.length > 0 && (
                <span className="text-lg font-normal text-gray-500 ml-2">
                  ({projectProposals.length} available)
                </span>
              )}
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive MERN stack solutions with detailed timelines, budgets, and technical specifications
            </p>
          </div>
          
          <div className="space-y-12">
            {projectProposals.map((project, index) => {
              const icon = <Code className="w-8 h-8 text-green-600" />;
              const features = project.skills_required.split(',').map(skill => skill.trim());
              
              return (
                <div key={project.id || index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center mb-4">
                        {icon}
                        <h3 className="text-2xl font-bold text-gray-900 ml-4">{project.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="bg-white px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-700">Type: {project.type}</span>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-700">Duration: {project.duration}</span>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-700">Budget: {project.budget}</span>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-700">Max Applications: {project.max_applications}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-6">{project.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Skills Required:</h4>
                          <ul className="space-y-2">
                            {features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Eligibility Criteria:</h4>
                          <div className="space-y-2">
                            {project.eligibility_criteria?.prerequisites && (
                              <div>
                                <span className="text-sm font-medium text-gray-900">Prerequisites:</span>
                                <p className="text-sm text-gray-600">{project.eligibility_criteria.prerequisites.join(', ')}</p>
                              </div>
                            )}
                            {project.eligibility_criteria?.experience_level && (
                              <div>
                                <span className="text-sm font-medium text-gray-900">Experience Level:</span>
                                <p className="text-sm text-gray-600">{project.eligibility_criteria.experience_level}</p>
                              </div>
                            )}
                            {project.eligibility_criteria?.complexity && (
                              <div>
                                <span className="text-sm font-medium text-gray-900">Complexity:</span>
                                <p className="text-sm text-gray-600">{project.eligibility_criteria.complexity}/10</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Application Details:</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Deadline: {new Date(project.application_deadline).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          Created by: {project.created_by?.name || 'Lab Facilitator'}
                        </p>
                        
                        {/* Apply Button */}
                        <button
                          onClick={() => handleApplyClick(project)}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-semibold"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Apply for this Gig
                        </button>
                        
                        {/* Additional Info */}
                        <div className="mt-3 text-xs text-gray-500 text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Deadline: {new Date(project.application_deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>Max: {project.max_applications} applications</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {projectProposals.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Code className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No project proposals available
                </h3>
                <p className="text-gray-600">
                  Check back soon for new Full Stack development opportunities
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core <span className="text-green-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600">
              Advanced development technologies that power our solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-green-600">Development Solutions</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Proven benefits that drive real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <ArrowRight className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600">
              A systematic approach to application development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your MERN Stack Project?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Choose from our ready-to-implement project proposals or let's discuss a custom solution tailored to your specific needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/labs/fullstack"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Explore Our Labs
            </Link>
          </div>
        </div>
      </section>

      {/* Proposal Submission Form Modal */}
      {selectedGig && (
        <ProposalSubmissionForm
          gig={{
            id: selectedGig.id,
            title: selectedGig.title,
            description: selectedGig.description,
            skills_required: selectedGig.skills_required,
            eligibility_criteria: selectedGig.eligibility_criteria,
            application_deadline: selectedGig.application_deadline,
            max_applications: selectedGig.max_applications,
            lab: {
              id: selectedGig.lab?.id || '',
              name: selectedGig.lab?.name || ''
            }
          }}
          isOpen={showProposalForm}
          onClose={handleCloseProposalForm}
          onSubmit={handleProposalSubmit}
        />
      )}
    </div>
  );
};

export default FullStackServicePage;
