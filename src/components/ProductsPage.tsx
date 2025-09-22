'use client';

import React, { useState } from 'react';
import { Search, Filter, ExternalLink, ShoppingCart, Eye } from 'lucide-react';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // AR/VR Equipment
  const arVrEquipment = [
    {
      id: 1,
      name: "Meta Quest 3 (512GB)",
      category: "VR Headset",
      quantity: 2,
      specifications: "512GB storage, advanced hand tracking, mixed reality capabilities",
      price: "₹89,999",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4c4a8bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "#",
      status: "Available"
    },
    {
      id: 2,
      name: "Ultraleap Leap Motion Controller 2",
      category: "Motion Controller",
      quantity: 1,
      specifications: "Hand tracking, gesture recognition, 150° field of view",
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "https://www.indiamart.com/proddetail/leap-motion-controller-2-2853611760091.html",
      status: "Available"
    },
    {
      id: 3,
      name: "XREAL Air 2 Ultra",
      category: "AR Developer Glasses",
      quantity: 1,
      specifications: "Spatial computing, 6DOF tracking, 1080p display",
      price: "₹1,25,000",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "https://www.designinfo.in/c/games-equipment/ar-augmented-reality/",
      status: "Available"
    }
  ];

  // Robotics Equipment
  const roboticsEquipment = [
    {
      id: 8,
      name: "Intel RealSense Depth Camera D455",
      category: "Depth Camera",
      quantity: 2,
      specifications: "Stereo depth camera, 10m range, global shutter, RGB sensor",
      price: "₹1,20,000",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "https://www.indiamart.com/proddetail/intel-realsense-depth-camera-d455-2851543788730.html",
      status: "Available"
    },
    {
      id: 9,
      name: "Waveshare WAVEGO (PI4 Kit)",
      category: "Quadruped Robot",
      quantity: 1,
      specifications: "12-DOF bionic quadruped, Raspberry Pi 4, ROS support",
      price: "₹85,000",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "https://hubtronics.in/wavego-pi4-kit",
      status: "Available"
    }
  ];

  // Fullstack Development Equipment
  const fullstackEquipment = [
    {
      id: 23,
      name: "ANT PC Ultra 285K Pro",
      category: "AI Workstation",
      quantity: 1,
      specifications: "Intel 285K + RTX Pro 4000 24GB, Professional AI system",
      price: "₹3,06,104",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "https://www.ant-pc.com/workstation/ai-and-deep-learning/ant-pc-pheidole-al700k",
      status: "Available"
    },
    {
      id: 24,
      name: "LG 27QN600-B Monitor",
      category: "Primary Display",
      quantity: 1,
      specifications: "27\" 1440p IPS 99% sRGB, Professional workstation display",
      price: "₹20,895",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "#",
      status: "Available"
    }
  ];

  // IDEA Lab Equipment
  const ideaLabEquipment = [
    {
      id: 39,
      name: "Laser Cutter",
      category: "Fabrication Equipment",
      quantity: 2,
      specifications: "High precision laser cutting for prototyping",
      price: "₹5,00,000",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "#",
      status: "Available"
    },
    {
      id: 40,
      name: "3D Printer",
      category: "Additive Manufacturing",
      quantity: 3,
      specifications: "High resolution 3D printing for rapid prototyping",
      price: "₹1,50,000",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      link: "#",
      status: "Available"
    }
  ];

  // Combine all equipment
  const allEquipment = [
    ...arVrEquipment,
    ...roboticsEquipment,
    ...fullstackEquipment,
    ...ideaLabEquipment
  ];

  const categories = [
    { id: 'all', name: 'All Equipment', count: allEquipment.length },
    { id: 'ar-vr', name: 'AR/VR Equipment', count: arVrEquipment.length },
    { id: 'robotics', name: 'Robotics', count: roboticsEquipment.length },
    { id: 'fullstack', name: 'Fullstack Development', count: fullstackEquipment.length },
    { id: 'idea-lab', name: 'IDEA Lab', count: ideaLabEquipment.length }
  ];

  // Filter equipment based on search and category
  const filteredEquipment = allEquipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.specifications.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'ar-vr' && arVrEquipment.includes(item)) ||
                           (selectedCategory === 'robotics' && roboticsEquipment.includes(item)) ||
                           (selectedCategory === 'fullstack' && fullstackEquipment.includes(item)) ||
                           (selectedCategory === 'idea-lab' && ideaLabEquipment.includes(item));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Lab Equipment & Hardware
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive AR/VR, Robotics, Fullstack Development, Embedded Systems, Agentic AI, and IDEA Lab equipment for cutting-edge research and development
            </p>
          </div>
        </div>
      </div>

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
                  placeholder="Search equipment, specifications, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEquipment.length} of {allEquipment.length} equipment items
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
                      {item.specifications}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {item.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Request
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </button>
                      {item.link !== '#' && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
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
                      <span className="text-2xl font-bold text-gray-900">
                        {item.price}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {item.specifications}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Quantity Available: {item.quantity}
                      </span>
                      <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Request Equipment
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        {item.link !== '#' && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Source
                          </a>
                        )}
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
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
