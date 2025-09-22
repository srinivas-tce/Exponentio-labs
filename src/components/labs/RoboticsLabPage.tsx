'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Eye, ExternalLink, Bot, CheckCircle, ArrowRight, Target, Lightbulb, Users, Zap, Award, Cpu, Navigation, Package } from 'lucide-react';

const RoboticsLabPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const equipment = [
    {
      id: 8,
      name: "Intel RealSense Depth Camera D455",
      category: "Depth Camera",
      quantity: 1,
      specifications: "Stereo depth camera with up to 10m range, global shutter, integrated RGB sensor, 1280x720 @ 30fps",
      description: "Professional depth sensing camera for robotics navigation and object detection",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["10m Range", "Global Shutter", "RGB Sensor", "1280x720 @ 30fps", "ROS Compatible"]
    },
    {
      id: 9,
      name: "Waveshare WAVEGO (PI4 Kit)",
      category: "Quadruped Robot",
      quantity: 1,
      specifications: "12-DOF bionic quadruped with Raspberry Pi 4, ROS support, 3D printed body",
      description: "Advanced quadruped robot platform for locomotion research and development",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["12-DOF", "Raspberry Pi 4", "ROS Support", "3D Printed", "Bionic Design"]
    },
    {
      id: 10,
      name: "Elephant Robotics myCobot 280 Pi",
      category: "Robotic Arm",
      quantity: 1,
      specifications: "6-DOF, 250g payload, 280mm reach, ROS/Python support, Raspberry Pi integration",
      description: "Compact robotic arm perfect for pick-and-place operations and educational projects",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["6-DOF", "250g Payload", "280mm Reach", "ROS/Python", "Raspberry Pi"]
    },
    {
      id: 11,
      name: "Pixhawk 2.4.8 Flight Controller Kit",
      category: "Flight Controller",
      quantity: 1,
      specifications: "Complete kit with controller, GPS, power module, and telemetry radios for drone development",
      description: "Professional flight controller system for autonomous drone and UAV development",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["Complete Kit", "GPS Module", "Power Module", "Telemetry", "Drone Development"]
    },
    {
      id: 12,
      name: "YDLIDAR G4 (2D)",
      category: "LiDAR Sensor",
      quantity: 1,
      specifications: "360° 2D LiDAR with 16m range, 12Hz scanning frequency, ROS compatible",
      description: "High-precision 2D LiDAR sensor for mapping, navigation, and obstacle detection",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["360° Scanning", "16m Range", "12Hz Frequency", "ROS Compatible", "High Precision"]
    },
    {
      id: 13,
      name: "TurtleBot 4 Lite",
      category: "Mobile Robot",
      quantity: 1,
      specifications: "iRobot Create 3 base, Raspberry Pi 4, OAK-D-Lite RGBD camera, RPLidar A1",
      description: "Complete mobile robot platform for autonomous navigation and SLAM research",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["iRobot Base", "Raspberry Pi 4", "RGBD Camera", "RPLidar A1", "SLAM Ready"]
    },
    {
      id: 14,
      name: "NVIDIA Jetson AGX Orin Developer Kit (64GB)",
      category: "AI Computing Platform",
      quantity: 1,
      specifications: "64GB unified memory, 2048-core NVIDIA Ampere GPU, 12-core ARM Cortex-A78AE CPU",
      description: "High-performance AI computing platform for edge robotics and autonomous systems",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["64GB Memory", "2048-core GPU", "12-core CPU", "Edge AI", "High Performance"]
    },
    {
      id: 15,
      name: "EMOTIV EPOC X",
      category: "EEG Headset",
      quantity: 1,
      specifications: "14-channel wireless EEG headset with saline electrodes, research-grade, 8-hour battery",
      description: "Professional EEG headset for brain-computer interface research and development",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["14 Channels", "Wireless", "Research Grade", "8-hour Battery", "BCI Ready"]
    },
    {
      id: 16,
      name: "OPENBCI CYTON + DAISY BIOSENSING BOARDS",
      category: "Biosensing Platform",
      quantity: 1,
      specifications: "16-channels of scientifically validated EEG, ECG, and EMG data, wireless connectivity",
      description: "Advanced biosensing platform for comprehensive physiological data collection",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available",
      features: ["16 Channels", "EEG/ECG/EMG", "Wireless", "Scientific Grade", "Multi-modal"]
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
      <div className="bg-gradient-to-br from-orange-50 to-red-100">
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
              <Bot className="w-12 h-12 text-orange-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                Robotics <span className="text-orange-600">Labs</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Advanced robotics and automation systems laboratory featuring quadruped robots, 
              robotic arms, LiDAR sensors, flight controllers, and AI computing platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">{equipment.length} Equipment Items</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Mobile Robots</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">AI Computing</span>
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
              Robotics Lab <span className="text-orange-600">Overview</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              The Robotics Lab is a dedicated hub for students to explore, research, and innovate in the rapidly evolving field of robotics. Designed to provide hands-on experience with state-of-the-art technologies, the lab nurtures a culture of problem-solving, creativity, and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Lab Capabilities</h3>
              <p className="text-gray-700 mb-6">
                Equipped with advanced tools such as Quadcopters, TurtleBot 4, and Cobot 280 Pi, the facility empowers students to work on a wide range of projects—from autonomous navigation and aerial robotics to human–robot collaboration for industrial applications.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Navigation className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Autonomous Navigation</h4>
                    <p className="text-gray-600 text-sm">Designing and programming unmanned aerial vehicles (UAVs) for real-world applications</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Cpu className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">AI & SLAM Research</h4>
                    <p className="text-gray-600 text-sm">Experimenting with ROS-based mobile robots for SLAM, AI, and autonomous exploration</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Package className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Collaborative Robotics</h4>
                    <p className="text-gray-600 text-sm">Exploring collaborative robotics (cobots) and their role in shaping the factories of the future</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Vision & Future Scope</h3>
              <p className="text-gray-700 mb-6">
                The Robotics Lab aspires to prepare students for global opportunities in Industry 4.0, Artificial Intelligence, Autonomous Systems, and Healthcare Robotics. Beyond academics, it will act as a launchpad for student-led startups, interdisciplinary research, and innovation-driven projects.
              </p>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Key Focus Areas</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="text-sm text-gray-700">Industry 4.0</span>
                  </div>
                  <div className="flex items-center">
                    <Cpu className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="text-sm text-gray-700">Artificial Intelligence</span>
                  </div>
                  <div className="flex items-center">
                    <Navigation className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="text-sm text-gray-700">Autonomous Systems</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="text-sm text-gray-700">Healthcare Robotics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lab Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation Hub</h3>
              <p className="text-gray-600">A platform for student-led startups and interdisciplinary research projects</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Learning</h3>
              <p className="text-gray-600">Hands-on experience with cutting-edge robotics technologies and equipment</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Future-Ready</h3>
              <p className="text-gray-600">Equipping learners to drive the future of robotics and automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search robotics equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-lg border ${
                  viewMode === 'grid' 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 rounded-lg border ${
                  viewMode === 'list' 
                    ? 'bg-orange-500 text-white border-orange-500' 
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
            Showing {filteredEquipment.length} of {equipment.length} robotics equipment items
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
                      <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
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
                            <CheckCircle className="w-3 h-3 text-orange-500 mr-2" />
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
                      <button className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
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
                        <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
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
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
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

      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build the Future of Robotics?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Contact us to learn more about our robotics lab facilities and equipment availability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              Schedule Lab Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoboticsLabPage;
