'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Eye, ExternalLink, Zap, CheckCircle, ArrowRight, Cpu, Brain, Target, Lightbulb, Users, Award, Database, Code } from 'lucide-react';

const AgenticAILabPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const equipment = [
    {
      id: 17,
      name: "ANT PC Ultra 285K Pro",
      category: "AI Workstation",
      quantity: 1,
      specifications: "Intel 285K + RTX Pro 4000 24GB, Professional AI system, 64GB RAM, 2TB NVMe SSD",
      description: "High-performance AI workstation optimized for machine learning and deep learning workloads",
      image: "https://c1.neweggimages.com/productimage/nb1280/83-151-613-08.jpg",
      status: "Available",
      features: ["Intel 285K CPU", "RTX Pro 4000 24GB", "64GB RAM", "2TB NVMe SSD", "AI Optimized"]
    },
    {
      id: 18,
      name: "LG 27QN600-B Monitor",
      category: "Primary Display",
      quantity: 1,
      specifications: "27\" 1440p IPS 99% sRGB, Professional workstation display, 75Hz refresh rate",
      description: "High-resolution professional monitor for AI development and data visualization",
      image: "https://tse4.mm.bing.net/th/id/OIP.go4LYOnb2LycVToN8IjRhQHaFq?pid=Api&P=0&h=180",
      status: "Available",
      features: ["27\" 1440p", "IPS Panel", "99% sRGB", "75Hz Refresh", "Professional Grade"]
    },
    {
      id: 19,
      name: "LG 24MP450-B Monitor",
      category: "Secondary Display",
      quantity: 1,
      specifications: "24\" 1080p IPS FreeSync, Secondary display for monitoring training progress",
      description: "Secondary monitor for system monitoring and multi-tasking during AI development",
      image: "https://tse2.mm.bing.net/th/id/OIP.LyH-_dwQw8m1swuNZpAo9gHaHa?pid=Api&P=0&h=180",
      status: "Available",
      features: ["24\" 1080p", "IPS Panel", "FreeSync", "Secondary Display", "Multi-tasking"]
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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <Zap className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                Agentic AI <span className="text-blue-600">Labs</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              High-performance artificial intelligence laboratory equipped with cutting-edge workstations, 
              professional displays, and optimized infrastructure for machine learning and deep learning development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">{equipment.length} Equipment Items</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">AI Workstations</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Professional Displays</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Agentic AI Lab <span className="text-blue-600">Overview</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              The Agentic AI Lab is established to explore one of the most advanced and rapidly emerging fields of technology—Artificial Intelligence. The lab is equipped with high-performance systems capable of running complex agentic AI workflows, enabling students to go beyond traditional learning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Capabilities</h3>
              <p className="text-gray-700 mb-6">
                With this infrastructure, students can engage in activities such as fine-tuning AI models, creating annotations, and even developing Small Language Models (SLMs) and Large Language Models (LLMs) entirely in-house—tasks that typically demand significant computational power and are usually accessible only to professionals.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Brain className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Model Fine-tuning</h4>
                    <p className="text-gray-600 text-sm">Fine-tuning AI models for specific applications and use cases</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Database className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Data Annotation</h4>
                    <p className="text-gray-600 text-sm">Creating high-quality annotations for training and validation datasets</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Code className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Model Development</h4>
                    <p className="text-gray-600 text-sm">Developing Small Language Models (SLMs) and Large Language Models (LLMs) in-house</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Specialized Curriculum</h3>
              <p className="text-gray-700 mb-6">
                Combined with a specialized Agentic AI curriculum, the lab provides students with hands-on exposure to building next-generation intelligent systems, preparing them to innovate and lead in the evolving landscape of AI.
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Key Learning Areas</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Cpu className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-700">Complex AI Workflows</span>
                  </div>
                  <div className="flex items-center">
                    <Brain className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-700">Intelligent Systems</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-700">Next-Gen AI</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-700">AI Leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lab Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">High-Performance Computing</h3>
              <p className="text-gray-600">Advanced systems capable of running complex agentic AI workflows with professional-grade computational power</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Beyond Traditional Learning</h3>
              <p className="text-gray-600">Hands-on experience with cutting-edge AI technologies typically accessible only to professionals</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Future AI Leaders</h3>
              <p className="text-gray-600">Preparing students to innovate and lead in the rapidly evolving landscape of artificial intelligence</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search AI equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-lg border ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 rounded-lg border ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white border-blue-500' 
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
            Showing {filteredEquipment.length} of {equipment.length} AI equipment items
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
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
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
                            <CheckCircle className="w-3 h-3 text-blue-500 mr-2" />
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
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
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
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
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
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
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

      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Develop the Future of AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us to learn more about our AI lab facilities and equipment availability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Lab Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgenticAILabPage;
