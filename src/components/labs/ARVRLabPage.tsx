'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Eye, ExternalLink, Cpu, CheckCircle, ArrowRight, Eye as EyeIcon, Layers, Target, Lightbulb, Users, Award, Database, Printer, Globe } from 'lucide-react';

const ARVRLabPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const equipment = [
    {
      id: 1,
      name: "Meta Quest 3 (512GB)",
      category: "VR Headset",
      quantity: 1,
      specifications: "512GB storage, advanced hand tracking, mixed reality capabilities, 4K+ Infinite Display, Snapdragon XR2 Gen 2",
      description: "Latest generation VR headset with advanced mixed reality capabilities for immersive development and testing",
      image: "https://files.emalls.ir/files/Products/automatic/18546755/dqo0bsus_thumb3.jpg",
      status: "Available",
      features: [
        "4K+ Infinite Display",
        "Advanced Hand Tracking",
        "Mixed Reality Capabilities",
        "Snapdragon XR2 Gen 2",
        "512GB Storage"
      ]
    },
    {
      id: 2,
      name: "Ultraleap Leap Motion Controller 2",
      category: "Motion Controller",
      quantity: 1,
      specifications: "Hand tracking, gesture recognition, 150° field of view, 120 FPS tracking, sub-millimeter accuracy",
      description: "Advanced hand tracking controller for precise gesture recognition in AR/VR applications",
      image: "https://tse1.mm.bing.net/th/id/OIP.TvNxQBsBBqo2kjOgxQAFlwHaEJ?pid=Api&P=0&h=180",
      status: "Available",
      features: [
        "150° Field of View",
        "120 FPS Tracking",
        "Sub-millimeter Accuracy",
        "Gesture Recognition",
        "Wireless Connectivity"
      ]
    },
    {
      id: 3,
      name: "XREAL Air 2 Ultra",
      category: "AR Developer Glasses",
      quantity: 1,
      specifications: "Spatial computing, 6DOF tracking, 1080p display, 52° FOV, 500 nits brightness",
      description: "Professional AR glasses for spatial computing and immersive development experiences",
      image: "https://img-new.cgtrader.com/items/5191008/869db5109e/xreal-air-2-ultra-3d-model-869db5109e.jpg",
      status: "Available",
      features: [
        "6DOF Tracking",
        "1080p Display",
        "52° Field of View",
        "500 Nits Brightness",
        "Spatial Computing"
      ]
    },
    {
      id: 4,
      name: "XREAL Beam Pro Handheld Controller",
      category: "AR Support Device",
      quantity: 1,
      specifications: "6.5\" 1080 x 2400 LCD 60Hz Display, 6GB RAM + 128GB Storage, Snapdragon Spatial Companion Processor, Wi-Fi 6 & Bluetooth 5.2",
      description: "Handheld controller for XREAL AR glasses with advanced processing capabilities",
      image: "https://www.noypigeeks.com/wp-content/uploads/2024/06/Xreal-Beam-Pro.jpg",
      status: "Available",
      features: [
        "6.5\" 1080p Display",
        "6GB RAM + 128GB Storage",
        "Snapdragon Processor",
        "Wi-Fi 6 & Bluetooth 5.2",
        "Spatial Companion"
      ]
    },
    {
      id: 5,
      name: "SenseGlove Nova",
      category: "Haptic Gloves",
      quantity: 1,
      specifications: "Force feedback, finger tracking, wireless connectivity, 4 hours battery life",
      description: "Advanced haptic gloves providing realistic touch feedback in virtual environments",
      image: "https://www.auganix.org/wp-content/uploads/2024/04/SenseGlove-Nova-2-front-and-back.jpg",
      status: "Available",
      features: [
        "Force Feedback",
        "Finger Tracking",
        "Wireless Connectivity",
        "4 Hours Battery Life",
        "Realistic Touch Feedback"
      ]
    },
    {
      id: 6,
      name: "bHaptics TactSuit Air (16 motor)",
      category: "Haptic Suit",
      quantity: 1,
      specifications: "16 vibration motors, wireless connectivity, 4+ hours battery life, full body haptic feedback",
      description: "Full-body haptic suit providing immersive tactile feedback for VR experiences",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/11/467111294/YK/XG/PD/14158318/bhaptics-tactsuit-air-16-motor-haptic-suit-1000x1000.jpg",
      status: "Available",
      features: [
        "16 Vibration Motors",
        "Full Body Feedback",
        "Wireless Connectivity",
        "4+ Hours Battery Life",
        "Immersive Tactile Experience"
      ]
    },
    {
      id: 7,
      name: "Full Performance Capture (with Headcam)",
      category: "Motion Capture Suit",
      quantity: 1,
      specifications: "Full body motion tracking, headcam integration, real-time capture, professional grade",
      description: "Complete motion capture system for realistic character animation and movement tracking",
      image: "https://assets-global.website-files.com/5e6b63ac3b6e253f11889f39/64bf9b3a920188ee5effa41a_Headrig1_2048x1365px.jpg",
      status: "Available",
      features: [
        "Full Body Tracking",
        "Headcam Integration",
        "Real-time Capture",
        "Professional Grade",
        "Character Animation"
      ]
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
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100">
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
              <Cpu className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                AR/VR <span className="text-purple-600">Labs</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Immersive technology development and testing laboratory equipped with cutting-edge VR headsets, 
              AR glasses, haptic feedback systems, and motion capture technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">{equipment.length} Equipment Items</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">VR & AR Development</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Haptic Feedback</span>
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
              AR-VR Lab <span className="text-purple-600">Overview</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              The AR-VR Lab represents a convergence of cutting-edge technologies in the field of digital asset creation and representation, designed to keep pace with today's rapidly evolving technological landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Immersive Technologies</h3>
              <p className="text-gray-700 mb-6">
                The lab focuses on immersive technologies such as Virtual Reality (VR) and Augmented Reality (AR), which are utilized for prototyping, visualization, content creation, and next-generation user experiences.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <EyeIcon className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Virtual Reality (VR)</h4>
                    <p className="text-gray-600 text-sm">Immersive virtual environments for prototyping and user experience development</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Layers className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Augmented Reality (AR)</h4>
                    <p className="text-gray-600 text-sm">Overlaying digital content onto real-world environments for enhanced visualization</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Content Creation</h4>
                    <p className="text-gray-600 text-sm">Developing next-generation user experiences and interactive content</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Digital Twin Infrastructure</h3>
              <p className="text-gray-700 mb-6">
                The lab supports digital twin infrastructure—powerful systems that replicate real-world assets in virtual environments. These digital twins enable automation, optimization, and scenario-based simulations for industries and research.
              </p>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Advanced Capabilities</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Database className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Digital Twins</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Virtual Environments</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Automation</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Simulations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lab Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Printer className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Printing</h3>
              <p className="text-gray-600">Advanced digital printing capabilities for rapid development of prototypes in both digital and physical formats</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rapid Prototyping</h3>
              <p className="text-gray-600">Fast iteration and development of immersive experiences with cutting-edge AR/VR technologies</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Applications</h3>
              <p className="text-gray-600">Supporting automation, optimization, and scenario-based simulations for various industries and research</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search AR/VR equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-lg border ${
                  viewMode === 'grid' 
                    ? 'bg-purple-500 text-white border-purple-500' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 rounded-lg border ${
                  viewMode === 'list' 
                    ? 'bg-purple-500 text-white border-purple-500' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEquipment.length} of {equipment.length} AR/VR equipment items
          </p>
        </div>

        {/* Equipment Grid/List */}
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
                  {/* Grid View */}
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
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
                            <CheckCircle className="w-3 h-3 text-purple-500 mr-2" />
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
                      <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
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
                  {/* List View */}
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
                        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
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
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
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

        {/* No Results */}
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

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience AR/VR Development?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Contact us to learn more about our AR/VR lab facilities and equipment availability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Schedule Lab Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ARVRLabPage;
