'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Cpu, CheckCircle, Users, Shield, Zap, DollarSign, TrendingUp, Lightbulb, Brain, Database, Code, Target, Award, Clock, BarChart, Settings } from 'lucide-react';

const AgenticAIServicePage = () => {
  const topProjects = [
    {
      title: "Autonomous Scientific Research Acceleration",
      complexity: "10/10",
      timeline: "12-16 weeks",
      budget: "$80,000 - $130,000",
      description: "Build a comprehensive research automation platform that orchestrates the entire scientific lifecycle. The system coordinates hierarchical agent teams for literature review, hypothesis generation, experiment design, data analysis, and publication preparation.",
      hardware: "RTX 4090 training server, Synology NAS, enhanced cloud credits",
      software: "LangGraph + Llama 3.1 + Federated Learning + Academic APIs",
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      color: "purple",
      learningOutcomes: [
        "Hierarchical Agent Coordination: Master complex workflows with hierarchical agent teams",
        "Domain-Specific Model Training: Fine-tune large language models like Llama 3.1 for scientific knowledge",
        "Federated Learning: Implement privacy-preserving learning techniques across institutions",
        "Large-Scale Data Management: Manage and process petabyte-scale research datasets on a NAS",
        "Automated Grant & Patent Analysis: Develop agents capable of assisting with grant writing and patent landscape analysis"
      ],
      applications: [
        "Pharmaceutical and biotechnology R&D",
        "Academic and university research labs", 
        "Corporate innovation and research divisions",
        "Governmental scientific agencies"
      ]
    },
    {
      title: "Autonomous Financial Trading Ecosystem",
      complexity: "10/10", 
      timeline: "12-16 weeks",
      budget: "$90,000 - $150,000",
      description: "Develop a production-grade algorithmic trading system using multi-agent coordination for market analysis, risk management, and automated execution. This capstone project integrates real-time market data feeds and sophisticated risk controls to operate autonomously.",
      hardware: "High-frequency inference servers, Synology NAS, enhanced cloud credits",
      software: "Semantic Kernel + Multi-Agent Orchestration + Real-time Data Feeds + Risk APIs",
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      color: "green",
      learningOutcomes: [
        "Real-time Multi-Agent Coordination: Design agent teams for high-frequency trading decisions",
        "Financial Risk Management: Implement models for portfolio optimization, exposure monitoring, and stress testing",
        "High-Frequency Model Inference: Utilize cloud infrastructure for real-time model predictions",
        "Enterprise Integration: Use Semantic Kernel to integrate with existing trading infrastructure",
        "Automated Regulatory Compliance: Build agents to manage audit trails and monitor regulatory requirements"
      ],
      applications: [
        "Hedge funds and asset management firms",
        "Investment banking algorithmic trading desks",
        "Financial technology (FinTech) and RegTech startups",
        "Quantitative analysis and portfolio management"
      ]
    },
    {
      title: "Autonomous Code Migration System",
      complexity: "9/10",
      timeline: "12-14 weeks", 
      budget: "$50,000 - $80,000",
      description: "Create a large-scale platform for codebase modernization using AutoGen's actor model architecture. The system automatically analyzes legacy code, maps dependencies, plans migration strategies, and generates modernized implementations.",
      hardware: "Additional workstations, 10GbE networking, VMware virtualization",
      software: "AutoGen + Distributed Systems + Static Code Analysis + CI/CD Tools",
      icon: <Code className="w-8 h-8 text-blue-600" />,
      color: "blue",
      learningOutcomes: [
        "Distributed Agent Architecture: Implement AutoGen's actor model for parallel processing",
        "Large-Scale Codebase Analysis: Develop agents for pattern recognition and dependency mapping in massive codebases",
        "Automated Code Generation: Build agents that write modernized code and testing harnesses",
        "Cross-Language Migration: Design strategies for migrating between different technology stacks",
        "Automated Validation & Testing: Deploy agents to verify functionality and performance of migrated code"
      ],
      applications: [
        "Enterprise IT modernization and digital transformation",
        "Cloud migration services and consulting",
        "Technical debt reduction in large software companies",
        "Legacy system maintenance and support"
      ]
    }
  ];

  const successMetrics = [
    {
      project: "Scientific Research",
      metrics: [
        "Achieve >90% accuracy on specialized Llama 3.1 model for scientific literature analysis",
        "Reduce literature review and data synthesis time by 40% compared to manual methods",
        "Prepare a research paper for submission based on agent-generated hypotheses and analysis"
      ]
    },
    {
      project: "Financial Trading", 
      metrics: [
        "Process real-time market data with sub-50ms latency for model inference",
        "Achieve target risk-adjusted return during backtesting on historical market data",
        "Develop a novel risk management framework suitable for multi-agent systems"
      ]
    },
    {
      project: "Code Migration",
      metrics: [
        "Attain 95% functional validation on unit and integration tests for migrated codebase",
        "Eliminate over 60% of manual engineering hours required for legacy system updates",
        "Publish the distributed agent framework as an open-source tool for developers"
      ]
    }
  ];

  const features = [
    "Autonomous Decision Making",
    "Intelligent Process Automation", 
    "Predictive Analytics & Insights",
    "Adaptive Learning Systems",
    "Real-time Data Processing",
    "Natural Language Understanding"
  ];

  const benefits = [
    "Reduce manual intervention by 80%",
    "Intelligent automation for complex workflows", 
    "Real-time decision making capabilities",
    "Scalable AI solutions for enterprise needs",
    "Cost reduction through automation",
    "Enhanced operational efficiency"
  ];

  const process = [
    {
      step: "1",
      title: "Discovery & Analysis",
      description: "We analyze your business processes and identify automation opportunities"
    },
    {
      step: "2", 
      title: "AI Strategy Design",
      description: "Develop a comprehensive AI strategy tailored to your specific needs"
    },
    {
      step: "3",
      title: "Development & Training",
      description: "Build and train intelligent systems using cutting-edge AI technologies"
    },
    {
      step: "4",
      title: "Deployment & Optimization",
      description: "Deploy solutions and continuously optimize for maximum performance"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <Cpu className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                Agentic AI <span className="text-blue-600">Development</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Transform your business with intelligent, autonomous AI systems that think, act, and adapt. 
              Our Agentic AI solutions reduce manual intervention by 80% while delivering unprecedented efficiency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Autonomous Systems</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Smart Decision-Making</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Predictive AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top 3 Most Complex <span className="text-blue-600">Agentic AI Projects</span>
            </h2>
            <p className="text-xl text-gray-600">
              Cutting-edge projects that push the boundaries of autonomous AI systems
            </p>
          </div>
          
          <div className="space-y-12">
            {topProjects.map((project, index) => (
              <div key={index} className={`bg-gradient-to-r from-${project.color}-50 to-${project.color}-100 rounded-2xl p-8 shadow-lg`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center mb-4">
                      {project.icon}
                      <h3 className="text-2xl font-bold text-gray-900 ml-4">{project.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="bg-white px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-700">Complexity: {project.complexity}</span>
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-700">Timeline: {project.timeline}</span>
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-700">Budget: {project.budget}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Hardware Required:</h4>
                        <p className="text-sm text-gray-600">{project.hardware}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Software Stack:</h4>
                        <p className="text-sm text-gray-600">{project.software}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Learning Outcomes:</h4>
                      <ul className="space-y-2">
                        {project.learningOutcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Industry Applications:</h4>
                      <ul className="space-y-1">
                        {project.applications.map((app, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {app}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success <span className="text-blue-600">Metrics</span>
            </h2>
            <p className="text-xl text-gray-600">
              Measurable outcomes that define project success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{metric.project}</h3>
                <ul className="space-y-3">
                  {metric.metrics.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Target className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core <span className="text-blue-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600">
              Advanced AI technologies that power our solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-blue-600">AI Solutions</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Proven benefits that drive real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <ArrowRight className="w-6 h-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600">
              A systematic approach to AI implementation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
              Resource Allocation <span className="text-blue-600">Strategy</span>
            </h2>
            <p className="text-xl text-gray-600">
              Our systematic approach to delivering complex Agentic AI projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Settings className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Phased Approach</h3>
              </div>
              <p className="text-gray-700">
                Begin with foundational agent frameworks and scale to complex, multi-team orchestration over the project timeline.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Industry Alignment</h3>
              </div>
              <p className="text-gray-700">
                Structure projects to mirror real-world implementations at leading organizations like JPMorgan and Mayo Clinic.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Cross-Disciplinary Teams</h3>
              </div>
              <p className="text-gray-700">
                Combine students with backgrounds in computer science, finance, and software architecture for comprehensive solutions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Production-Ready Practices</h3>
              </div>
              <p className="text-gray-700">
                Implement MLOps maturity frameworks from the start, including automated CI/CD pipelines and comprehensive monitoring.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <BarChart className="w-8 h-8 text-cyan-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">High-Value Skill Development</h3>
              </div>
              <p className="text-gray-700">
                Focus on the highest-demand skills in the agentic AI market: multi-agent orchestration, model optimization, and production deployment.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-pink-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Timeline Management</h3>
              </div>
              <p className="text-gray-700">
                Structured 12-16 week programs with clear milestones, regular checkpoints, and industry mentorship throughout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build the Future with Agentic AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our advanced AI development programs and work on cutting-edge projects that push the boundaries of autonomous systems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Start Your AI Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/labs/agentic-ai"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Our AI Labs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgenticAIServicePage;
