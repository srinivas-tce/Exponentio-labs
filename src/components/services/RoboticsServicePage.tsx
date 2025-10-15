'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, CheckCircle, Users, Shield, Zap, DollarSign, TrendingUp, Lightbulb, Cpu, MapPin, Package, Target, Award, Clock, BarChart, Settings, Eye, Navigation, Loader2 } from 'lucide-react';

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

const RoboticsServicePage = () => {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/robotics');
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
          <Loader2 className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading robotics service data...</p>
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
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const projectProposals = serviceData?.project_proposals || [];

  const features = [
    "Industrial Automation Systems",
    "AI-Powered Robotics", 
    "Robotic Process Automation",
    "Custom Robotic Solutions",
    "Precision Manufacturing",
    "Autonomous Navigation"
  ];

  const benefits = [
    "Industrial automation solutions",
    "Precision manufacturing systems", 
    "AI-driven robotic intelligence",
    "Custom robotic applications",
    "Increased productivity and efficiency",
    "Reduced operational costs"
  ];

  const process = [
    {
      step: "1",
      title: "Analysis & Planning",
      description: "We analyze your automation needs and design custom robotic solutions"
    },
    {
      step: "2", 
      title: "Design & Development",
      description: "Create and develop robotic systems tailored to your specific requirements"
    },
    {
      step: "3",
      title: "Integration & Testing",
      description: "Integrate robots into your workflow and conduct comprehensive testing"
    },
    {
      step: "4",
      title: "Deployment & Training",
      description: "Deploy solutions and provide training for your team"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-orange-50 to-red-100">
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
              <Bot className="w-12 h-12 text-orange-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                <span className="text-orange-600">Robotics</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Build smart machines engineered for precision and efficiency. Our robotics solutions 
              automate processes and enhance productivity across various industries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Automation</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Industrial Robotics</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">AI-Powered Robotics</span>
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
              Available <span className="text-orange-600">Robotics Projects</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join cutting-edge robotics projects and work with industry experts
            </p>
          </div>
          
          {projectProposals.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Available</h3>
              <p className="text-gray-500">Check back later for new robotics project opportunities.</p>
            </div>
          ) : (
          <div className="space-y-12">
            {projectProposals.map((project, index) => {
              const icon = <Bot className="w-8 h-8 text-orange-600" />;
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
                                <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
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
                          className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center font-semibold"
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


      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core <span className="text-orange-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600">
              Advanced robotics technologies that power our solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="w-8 h-8 text-orange-600" />
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
              Why Choose Our <span className="text-orange-600">Robotics Solutions</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Proven benefits that drive real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <ArrowRight className="w-6 h-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
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
              Our <span className="text-orange-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600">
              A systematic approach to robotics implementation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Allocation Strategy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Resource Allocation <span className="text-orange-600">Strategy</span>
            </h2>
            <p className="text-xl text-gray-600">
              Our systematic approach to delivering complex robotics projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Settings className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Foundation First</h3>
              </div>
              <p className="text-gray-700">
                Utilize open-source platforms like TurtleBot 4 (ROS 2) and Cobot Pi (Raspberry Pi) to provide a robust starting point, allowing students to focus on advanced applications rather than building hardware from scratch.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Phased Complexity</h3>
              </div>
              <p className="text-gray-700">
                Begin with single-robot projects (e.g., delivery robot) and scale to more complex challenges involving multiple robots, fleet management, and AI integration.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Cross-Platform Integration</h3>
              </div>
              <p className="text-gray-700">
                Encourage projects that combine platforms, such as having a TurtleBot mobile base collaborate with a Cobot Pi arm, to teach systems integration.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Industry Alignment</h3>
              </div>
              <p className="text-gray-700">
                Focus project scopes on high-demand areas like smart manufacturing, warehouse automation, and service robotics to ensure skills are directly applicable to the job market.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Eye className="w-8 h-8 text-cyan-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Simulation and Virtual Testing</h3>
              </div>
              <p className="text-gray-700">
                Leverage simulation tools like Gazebo and RViz to test algorithms for kinematics, motion planning, and navigation before deploying on physical hardware, saving time and preventing damage.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-pink-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Timeline Management</h3>
              </div>
              <p className="text-gray-700">
                Structured 12-32 week programs with clear milestones, regular checkpoints, and industry mentorship throughout the development process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build the Future with Robotics?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join our advanced robotics programs and work on cutting-edge projects that push the boundaries of autonomous systems and industrial automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Start Your Robotics Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/labs/robotics"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Explore Our Robotics Labs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoboticsServicePage;
