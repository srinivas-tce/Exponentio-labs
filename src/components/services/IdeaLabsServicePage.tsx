'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle, Users, Shield, Zap, DollarSign, TrendingUp, RocketIcon, Loader2, Clock } from 'lucide-react';

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

const IdeaLabsServicePage = () => {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/idea-labs');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading Idea Labs service data...</p>
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
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const projectProposals = serviceData?.project_proposals || [];
  const features = [
    "Rapid Prototyping",
    "Innovation Consulting", 
    "Product Design & Development",
    "MVP Development",
    "Concept Validation",
    "Market Research & Analysis"
  ];

  const benefits = [
    "Rapid prototyping capabilities",
    "Innovation consulting", 
    "Product design and development",
    "MVP to market acceleration",
    "Reduced time to market",
    "Lower development risks"
  ];

  const process = [
    {
      step: "1",
      title: "Ideation & Research",
      description: "We help you refine your idea and conduct market research to validate concepts"
    },
    {
      step: "2", 
      title: "Design & Prototyping",
      description: "Create detailed designs and build rapid prototypes to test your concept"
    },
    {
      step: "3",
      title: "Development & Testing",
      description: "Develop your MVP and conduct comprehensive testing with real users"
    },
    {
      step: "4",
      title: "Launch & Scale",
      description: "Launch your product and provide support for scaling and growth"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100">
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
              <Lightbulb className="w-12 h-12 text-indigo-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                <span className="text-indigo-600">Idea Labs</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              From spark to prototype, we transform bold ideas into reality. Our Idea Labs service 
              accelerates innovation from concept to market-ready product with rapid prototyping and expert guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Prototyping</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Innovation</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Product Design</span>
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
              Available <span className="text-yellow-600">Innovation Projects</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join cutting-edge innovation projects and work with industry experts
            </p>
          </div>
          
          {projectProposals.length === 0 ? (
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Available</h3>
              <p className="text-gray-500">Check back later for new innovation project opportunities.</p>
            </div>
          ) : (
          <div className="space-y-12">
            {projectProposals.map((project, index) => {
              const icon = <Lightbulb className="w-8 h-8 text-yellow-600" />;
              const features = project.skills_required.split(',').map(skill => skill.trim());
              const techStack = project.skills_required.split(',').map(skill => skill.trim());
              
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
                          <h4 className="font-semibold text-gray-900 mb-3">Key Skills Required:</h4>
                          <ul className="space-y-2">
                            {features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
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
                          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center font-semibold"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Apply for this Gig
                        </button>
                        
                        {/* Additional Info */}
                        <div className="mt-3 text-xs text-gray-500 text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>Deadline: {new Date(project.application_deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <Users className="w-3 h-3 mr-1" />
                            <span>Max: {project.max_applications} applications</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We <span className="text-indigo-600">Deliver</span>
            </h2>
            <p className="text-xl text-gray-600">
              Innovation services that turn ideas into reality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="w-8 h-8 text-indigo-600" />
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
              Why Choose Our <span className="text-indigo-600">Idea Labs</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Proven benefits that drive real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <ArrowRight className="w-6 h-6 text-indigo-500 mr-4 mt-1 flex-shrink-0" />
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
              Our <span className="text-indigo-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600">
              A systematic approach to innovation and product development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Let's discuss how our Idea Labs can accelerate your innovation journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdeaLabsServicePage;
