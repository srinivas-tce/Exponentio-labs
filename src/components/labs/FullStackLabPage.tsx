'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Eye, ExternalLink, Code, CheckCircle, ArrowRight } from 'lucide-react';

const FullStackLabPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const equipment = [
    {
      id: 27,
      name: "Development Workstation Setup",
      category: "Computer Workstation",
      quantity: 2,
      specifications: "12th gen Intel/AMD processor, 32GB RAM, dual monitor setup, mechanical keyboard",
      description: "Complete development workstation optimized for full-stack development",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["12th Gen CPU", "32GB RAM", "Dual Monitor", "Mechanical Keyboard", "Development Ready"]
    },
    {
      id: 28,
      name: "GPU Processing Unit 16GB",
      category: "Graphics Processing",
      quantity: 1,
      specifications: "High-end GPU with 16GB VRAM for AI/ML workloads and graphics processing",
      description: "Powerful GPU for machine learning, graphics rendering, and parallel processing",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["16GB VRAM", "High-end GPU", "AI/ML Ready", "Graphics Processing", "Parallel Computing"]
    },
    {
      id: 29,
      name: "Software Licenses & Subscriptions",
      category: "Software",
      quantity: 1,
      specifications: "Domain subscriptions, API credits, database setup costs, development tools",
      description: "Complete software stack including development tools, APIs, and cloud services",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["Domain Subscriptions", "API Credits", "Database Setup", "Development Tools", "Cloud Services"]
    }
  ];

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.specifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link
              href="/products"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Infrastructure
            </Link>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Code className="w-12 h-12 text-green-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                Full Stack <span className="text-green-600">Labs</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Web and application development laboratory featuring high-performance workstations, 
              GPU processing units, and comprehensive software development tools for modern full-stack development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">{equipment.length} Equipment Items</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Development Workstations</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Software Licenses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search full-stack equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-lg border ${
                  viewMode === 'grid' 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 rounded-lg border ${
                  viewMode === 'list' 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEquipment.length} of {equipment.length} full-stack equipment items
          </p>
        </div>

        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
                viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
              }`}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        item.status === 'Available' 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-red-600 bg-red-50'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                      <ul className="space-y-1">
                        {item.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-32 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 ml-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          item.status === 'Available' 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-red-600 bg-red-50'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {item.description}
                    </p>
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Quantity Available: {item.quantity}
                      </span>
                      <div className="flex gap-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No equipment found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>

      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Amazing Applications?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Contact us to learn more about our full-stack lab facilities and equipment availability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Schedule Lab Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullStackLabPage;
