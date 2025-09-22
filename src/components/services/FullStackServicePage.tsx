'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, CheckCircle, Users, Shield, Zap, DollarSign, TrendingUp, Lightbulb, ShoppingCart, BarChart, MessageCircle, Clock, Target, Award, Database, Smartphone, Globe, CreditCard } from 'lucide-react';

const FullStackServicePage = () => {
  const projectProposals = [
    {
      title: "MERN Stack E-Commerce Website",
      type: "E-Commerce Platform",
      duration: "6 Weeks",
      budget: "$2,100 USD",
      description: "Modern, scalable, and secure e-commerce platform with payment integration, product catalog, shopping cart, and order management.",
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
      color: "blue",
      features: [
        "Responsive user interface with product catalog",
        "Shopping cart and wishlist functionality",
        "Customer authentication with JWT",
        "Payment gateway integration (Stripe/PayPal)",
        "Admin panel for product and order management",
        "Real-time order tracking"
      ],
      techStack: [
        "Frontend: React.js, Redux, TailwindCSS",
        "Backend: Node.js, Express.js",
        "Database: MongoDB Atlas",
        "Authentication: JWT / OAuth",
        "Payments: Stripe or PayPal",
        "Hosting: Vercel + Render/Heroku"
      ],
      timeline: [
        { phase: "Phase 1", task: "Requirement gathering, UI/UX wireframes", duration: "1 week" },
        { phase: "Phase 2", task: "Backend API setup, database schema design", duration: "1 week" },
        { phase: "Phase 3", task: "Frontend integration with backend APIs", duration: "2 weeks" },
        { phase: "Phase 4", task: "Payment gateway integration and order flow", duration: "1 week" },
        { phase: "Phase 5", task: "Testing, bug fixes, deployment", duration: "1 week" }
      ]
    },
    {
      title: "MERN Stack Business Dashboard",
      type: "Analytics Dashboard",
      duration: "5 Weeks",
      budget: "$1,900 USD",
      description: "Secure, scalable business analytics dashboard with KPIs visualization, user management, sales tracking, and report generation.",
      icon: <BarChart className="w-8 h-8 text-green-600" />,
      color: "green",
      features: [
        "Modern responsive UI with charts and graphs",
        "Customizable widgets and filters",
        "Role-based user access (admin, staff)",
        "Real-time data updates and notifications",
        "Exportable reports (CSV, PDF)",
        "Sales and revenue analysis with time filters"
      ],
      techStack: [
        "Frontend: React.js, Redux, TailwindCSS, Chart.js",
        "Backend: Node.js, Express.js",
        "Database: MongoDB Atlas",
        "Authentication: JWT / OAuth",
        "Charts: Chart.js/Recharts",
        "Hosting: Vercel + Render/Heroku"
      ],
      timeline: [
        { phase: "Phase 1", task: "Requirement gathering, UI/UX wireframes", duration: "1 week" },
        { phase: "Phase 2", task: "Backend API and database schema setup", duration: "1 week" },
        { phase: "Phase 3", task: "Frontend dashboard with charts and widgets", duration: "2 weeks" },
        { phase: "Phase 4", task: "Testing, bug fixes, deployment", duration: "1 week" }
      ]
    },
    {
      title: "MERN Stack Social Media Platform",
      type: "Social Media SAAS",
      duration: "6 Weeks",
      budget: "$2,300 USD",
      description: "Scalable social media/community platform with real-time chat, posts, comments, user profiles, and content moderation.",
      icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
      color: "purple",
      features: [
        "Account registration and secure login",
        "Create, edit, and delete posts (text, images, links)",
        "Like, comment, and share functionality",
        "Real-time chat and notifications",
        "User profiles with followers/following",
        "Admin panel for content moderation"
      ],
      techStack: [
        "Frontend: React.js, Redux, TailwindCSS",
        "Backend: Node.js, Express.js, Socket.io",
        "Database: MongoDB Atlas",
        "Authentication: JWT / OAuth (Google, Facebook)",
        "Real-time: Socket.io/WebSockets",
        "Hosting: Vercel + Render/Heroku"
      ],
      timeline: [
        { phase: "Phase 1", task: "Requirement gathering, UI/UX wireframes", duration: "1 week" },
        { phase: "Phase 2", task: "Backend APIs, database schema, authentication", duration: "1 week" },
        { phase: "Phase 3", task: "Core features: posts, comments, likes, profiles", duration: "2 weeks" },
        { phase: "Phase 4", task: "Real-time chat, notifications, admin moderation", duration: "1 week" },
        { phase: "Phase 5", task: "Testing, bug fixes, deployment", duration: "1 week" }
      ]
    }
  ];

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
              End-to-end web and application development solutions. From frontend to backend, 
              we build scalable, modern applications that grow with your business.
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
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive MERN stack solutions with detailed timelines, budgets, and technical specifications
            </p>
          </div>
          
          <div className="space-y-12">
            {projectProposals.map((project, index) => (
              <div key={index} className={`bg-gradient-to-r from-${project.color}-50 to-${project.color}-100 rounded-2xl p-8 shadow-lg`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center mb-4">
                      {project.icon}
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
                    </div>
                    <p className="text-gray-700 mb-6">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Technology Stack:</h4>
                        <ul className="space-y-1">
                          {project.techStack.map((tech, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {tech}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Project Timeline:</h4>
                      <div className="space-y-3">
                        {project.timeline.map((phase, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-medium text-gray-900">{phase.phase}</span>
                              <span className="text-xs text-gray-500">{phase.duration}</span>
                            </div>
                            <p className="text-xs text-gray-600">{phase.task}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default FullStackServicePage;
