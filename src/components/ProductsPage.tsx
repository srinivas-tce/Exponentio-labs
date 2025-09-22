'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, ExternalLink, Eye, Cpu, Bot, Wifi, Lightbulb, Code, Zap, Shield, Users, RocketIcon, CheckCircle, ArrowRight } from 'lucide-react';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // AR/VR LABS Equipment
  const arVrLabs = [
    {
      id: 1,
      name: "Meta Quest 3 (512GB)",
      category: "VR Headset",
      quantity: 1,
      specifications: "512GB storage, advanced hand tracking, mixed reality capabilities, 4K+ Infinite Display, Snapdragon XR2 Gen 2",
      description: "Latest generation VR headset with advanced mixed reality capabilities for immersive development and testing",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4c4a8bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 2,
      name: "Ultraleap Leap Motion Controller 2",
      category: "Motion Controller",
      quantity: 1,
      specifications: "Hand tracking, gesture recognition, 150° field of view, 120 FPS tracking, sub-millimeter accuracy",
      description: "Advanced hand tracking controller for precise gesture recognition in AR/VR applications",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 3,
      name: "XREAL Air 2 Ultra",
      category: "AR Developer Glasses",
      quantity: 1,
      specifications: "Spatial computing, 6DOF tracking, 1080p display, 52° FOV, 500 nits brightness",
      description: "Professional AR glasses for spatial computing and immersive development experiences",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 4,
      name: "XREAL Beam Pro Handheld Controller",
      category: "AR Support Device",
      quantity: 1,
      specifications: "6.5\" 1080 x 2400 LCD 60Hz Display, 6GB RAM + 128GB Storage, Snapdragon Spatial Companion Processor, Wi-Fi 6 & Bluetooth 5.2",
      description: "Handheld controller for XREAL AR glasses with advanced processing capabilities",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 5,
      name: "SenseGlove Nova",
      category: "Haptic Gloves",
      quantity: 1,
      specifications: "Force feedback, finger tracking, wireless connectivity, 4 hours battery life",
      description: "Advanced haptic gloves providing realistic touch feedback in virtual environments",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 6,
      name: "bHaptics TactSuit Air (16 motor)",
      category: "Haptic Suit",
      quantity: 1,
      specifications: "16 vibration motors, wireless connectivity, 4+ hours battery life, full body haptic feedback",
      description: "Full-body haptic suit providing immersive tactile feedback for VR experiences",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 7,
      name: "Full Performance Capture (with Headcam)",
      category: "Motion Capture Suit",
      quantity: 1,
      specifications: "Full body motion tracking, headcam integration, real-time capture, professional grade",
      description: "Complete motion capture system for realistic character animation and movement tracking",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    }
  ];

  // ROBOTICS LABS Equipment
  const roboticsLabs = [
    {
      id: 8,
      name: "Intel RealSense Depth Camera D455",
      category: "Depth Camera",
      quantity: 1,
      specifications: "Stereo depth camera with up to 10m range, global shutter, integrated RGB sensor, 1280x720 @ 30fps",
      description: "Professional depth sensing camera for robotics navigation and object detection",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 9,
      name: "Waveshare WAVEGO (PI4 Kit)",
      category: "Quadruped Robot",
      quantity: 1,
      specifications: "12-DOF bionic quadruped with Raspberry Pi 4, ROS support, 3D printed body",
      description: "Advanced quadruped robot platform for locomotion research and development",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 10,
      name: "Elephant Robotics myCobot 280 Pi",
      category: "Robotic Arm",
      quantity: 1,
      specifications: "6-DOF, 250g payload, 280mm reach, ROS/Python support, Raspberry Pi integration",
      description: "Compact robotic arm perfect for pick-and-place operations and educational projects",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 11,
      name: "Pixhawk 2.4.8 Flight Controller Kit",
      category: "Flight Controller",
      quantity: 1,
      specifications: "Complete kit with controller, GPS, power module, and telemetry radios for drone development",
      description: "Professional flight controller system for autonomous drone and UAV development",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 12,
      name: "YDLIDAR G4 (2D)",
      category: "LiDAR Sensor",
      quantity: 1,
      specifications: "360° 2D LiDAR with 16m range, 12Hz scanning frequency, ROS compatible",
      description: "High-precision 2D LiDAR sensor for mapping, navigation, and obstacle detection",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 13,
      name: "TurtleBot 4 Lite",
      category: "Mobile Robot",
      quantity: 1,
      specifications: "iRobot Create 3 base, Raspberry Pi 4, OAK-D-Lite RGBD camera, RPLidar A1",
      description: "Complete mobile robot platform for autonomous navigation and SLAM research",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 14,
      name: "NVIDIA Jetson AGX Orin Developer Kit (64GB)",
      category: "AI Computing Platform",
      quantity: 1,
      specifications: "64GB unified memory, 2048-core NVIDIA Ampere GPU, 12-core ARM Cortex-A78AE CPU",
      description: "High-performance AI computing platform for edge robotics and autonomous systems",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 15,
      name: "EMOTIV EPOC X",
      category: "EEG Headset",
      quantity: 1,
      specifications: "14-channel wireless EEG headset with saline electrodes, research-grade, 8-hour battery",
      description: "Professional EEG headset for brain-computer interface research and development",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 16,
      name: "OPENBCI CYTON + DAISY BIOSENSING BOARDS",
      category: "Biosensing Platform",
      quantity: 1,
      specifications: "16-channels of scientifically validated EEG, ECG, and EMG data, wireless connectivity",
      description: "Advanced biosensing platform for comprehensive physiological data collection",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    }
  ];

  // AGENTIC AI LABS Equipment
  const agenticAiLabs = [
    {
      id: 17,
      name: "ANT PC Ultra 285K Pro",
      category: "AI Workstation",
      quantity: 1,
      specifications: "Intel 285K + RTX Pro 4000 24GB, Professional AI system, 64GB RAM, 2TB NVMe SSD",
      description: "High-performance AI workstation optimized for machine learning and deep learning workloads",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 18,
      name: "LG 27QN600-B Monitor",
      category: "Primary Display",
      quantity: 1,
      specifications: "27\" 1440p IPS 99% sRGB, Professional workstation display, 75Hz refresh rate",
      description: "High-resolution professional monitor for AI development and data visualization",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 19,
      name: "LG 24MP450-B Monitor",
      category: "Secondary Display",
      quantity: 1,
      specifications: "24\" 1080p IPS FreeSync, Secondary display for monitoring training progress",
      description: "Secondary monitor for system monitoring and multi-tasking during AI development",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    }
  ];

  // EMBEDDED LABS Equipment
  const embeddedLabs = [
    {
      id: 20,
      name: "Oscilloscope and Signal Generator",
      category: "Test Equipment",
      quantity: 1,
      specifications: "Digital storage oscilloscope with built-in signal generator, 100MHz bandwidth",
      description: "Essential test equipment for embedded system development and debugging",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 21,
      name: "SIGLENT SPD3303C Programmable DC Power Supply",
      category: "Power Supply",
      quantity: 3,
      specifications: "32V / 3.2A dual channel programmable power supply with digital display",
      description: "Precision power supply for embedded system testing and development",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 22,
      name: "Soldering and Desoldering Station",
      category: "Fabrication Tools",
      quantity: 1,
      specifications: "Professional soldering station with temperature control and desoldering capabilities",
      description: "Complete soldering workstation for PCB assembly and repair",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 23,
      name: "STM32 Development Boards Set",
      category: "Microcontroller Boards",
      quantity: 4,
      specifications: "STM32 F4, F7, WL series boards for various embedded applications",
      description: "Complete STM32 development board collection for embedded system prototyping",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 24,
      name: "ESP32 Development Boards",
      category: "IoT Development",
      quantity: 5,
      specifications: "ESP32 S3, ESP32 + OLED boards for IoT and wireless applications",
      description: "WiFi-enabled microcontroller boards for IoT development and prototyping",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 25,
      name: "FPGA Development Boards",
      category: "Digital Logic",
      quantity: 4,
      specifications: "Nexys4 DDR Artix-7, ZYBO Z7-10, Trenz Electronic TE0712 FPGA boards",
      description: "Advanced FPGA development platforms for digital logic and high-speed processing",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 26,
      name: "Voltera V-One PCB Printer",
      category: "PCB Fabrication",
      quantity: 1,
      specifications: "Desktop PCB printer for rapid prototyping, two-layer boards, Gerber file support",
      description: "Revolutionary desktop PCB printer for rapid prototyping and small-batch production",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    }
  ];

  // FULL STACK LABS Equipment
  const fullStackLabs = [
    {
      id: 27,
      name: "Development Workstation Setup",
      category: "Computer Workstation",
      quantity: 2,
      specifications: "12th gen Intel/AMD processor, 32GB RAM, dual monitor setup, mechanical keyboard",
      description: "Complete development workstation optimized for full-stack development",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 28,
      name: "GPU Processing Unit 16GB",
      category: "Graphics Processing",
      quantity: 1,
      specifications: "High-end GPU with 16GB VRAM for AI/ML workloads and graphics processing",
      description: "Powerful GPU for machine learning, graphics rendering, and parallel processing",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 29,
      name: "Software Licenses & Subscriptions",
      category: "Software",
      quantity: 1,
      specifications: "Domain subscriptions, API credits, database setup costs, development tools",
      description: "Complete software stack including development tools, APIs, and cloud services",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    }
  ];

  // IDEA LABS Equipment
  const ideaLabs = [
    {
      id: 30,
      name: "Laser Cutter",
      category: "Fabrication Equipment",
      quantity: 1,
      specifications: "High precision laser cutting for prototyping, various materials support",
      description: "Professional laser cutting system for precise prototyping and manufacturing",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 31,
      name: "3D Printer",
      category: "Additive Manufacturing",
      quantity: 3,
      specifications: "High resolution 3D printing for rapid prototyping, multiple materials",
      description: "Advanced 3D printing systems for rapid prototyping and product development",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 32,
      name: "3D Scanner",
      category: "3D Scanning",
      quantity: 1,
      specifications: "High-precision 3D scanning for reverse engineering and digitization",
      description: "Professional 3D scanner for capturing real-world objects and creating digital models",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 33,
      name: "CNC Router",
      category: "CNC Machining",
      quantity: 1,
      specifications: "Computer-controlled routing for wood, plastic, and soft metal materials",
      description: "Precision CNC router for creating complex parts and prototypes",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 34,
      name: "Vinyl Cutter",
      category: "Cutting Equipment",
      quantity: 1,
      specifications: "Precision vinyl cutting for signage, decals, and prototyping",
      description: "Professional vinyl cutter for creating custom graphics and prototypes",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 35,
      name: "Mini Desktop Lathe cum Milling",
      category: "Machining Tools",
      quantity: 1,
      specifications: "Combined lathe and milling machine for small precision parts",
      description: "Compact machining center for creating precision metal and plastic parts",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 36,
      name: "PCB Milling Machine",
      category: "PCB Fabrication",
      quantity: 1,
      specifications: "Desktop PCB milling for rapid prototyping and small batch production",
      description: "Precision PCB milling machine for creating custom circuit boards",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    },
    {
      id: 37,
      name: "Smart Board",
      category: "Interactive Display",
      quantity: 1,
      specifications: "Interactive whiteboard for collaborative design and presentation",
      description: "Large interactive display for team collaboration and design sessions",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      status: "Available"
    }
  ];

  // Combine all equipment by lab
  const allLabs = [
    {
      id: 'ar-vr',
      name: 'AR/VR Labs',
      icon: <Cpu className="w-8 h-8 text-purple-600" />,
      description: 'Immersive technology development and testing',
      equipment: arVrLabs,
      color: 'purple'
    },
    {
      id: 'robotics',
      name: 'Robotics Labs',
      icon: <Bot className="w-8 h-8 text-orange-600" />,
      description: 'Advanced robotics and automation systems',
      equipment: roboticsLabs,
      color: 'orange'
    },
    {
      id: 'agentic-ai',
      name: 'Agentic AI Labs',
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      description: 'Artificial intelligence and machine learning',
      equipment: agenticAiLabs,
      color: 'blue'
    },
    {
      id: 'embedded',
      name: 'Embedded Labs',
      icon: <Wifi className="w-8 h-8 text-cyan-600" />,
      description: 'IoT and embedded system development',
      equipment: embeddedLabs,
      color: 'cyan'
    },
    {
      id: 'fullstack',
      name: 'Full Stack Labs',
      icon: <Code className="w-8 h-8 text-green-600" />,
      description: 'Web and application development',
      equipment: fullStackLabs,
      color: 'green'
    },
    {
      id: 'idea',
      name: 'Idea Labs',
      icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
      description: 'Prototyping and fabrication facilities',
      equipment: ideaLabs,
      color: 'indigo'
    }
  ];

  // Get all equipment for search
  const allEquipment = allLabs.flatMap(lab => lab.equipment);

  // Filter equipment based on search and lab
  const filteredEquipment = allEquipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.specifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedLab === 'all') return matchesSearch;
    
    const lab = allLabs.find(l => l.id === selectedLab);
    return matchesSearch && lab && lab.equipment.includes(item);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Explore Our <span className="text-blue-600">Infrastructure</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              State-of-the-art lab equipment and facilities across 6 specialized domains. 
              From cutting-edge AR/VR technology to advanced robotics and AI workstations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {allLabs.map((lab) => (
                <div key={lab.id} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  {lab.icon}
                  <span className="text-sm font-medium text-gray-700">{lab.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lab Categories Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Lab Facilities</span>
            </h2>
            <p className="text-lg text-gray-600">
              Six specialized laboratories equipped with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allLabs.map((lab) => (
              <div key={lab.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  {lab.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{lab.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{lab.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{lab.equipment.length} equipment items</span>
                  <Link
                    href={`/labs/${lab.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    View Equipment
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
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
                  placeholder="Search equipment, specifications, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Lab Filter */}
            <div className="lg:w-64">
              <select
                value={selectedLab}
                onChange={(e) => setSelectedLab(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Labs ({allEquipment.length})</option>
                {allLabs.map(lab => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name} ({lab.equipment.length})
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
            {selectedLab !== 'all' && ` in ${allLabs.find(l => l.id === selectedLab)?.name}`}
          </p>
        </div>

        {/* Equipment Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredEquipment.map((item) => {
            const lab = allLabs.find(l => l.equipment.includes(item));
            return (
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
                        {item.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        <strong>Specs:</strong> {item.specifications.substring(0, 100)}...
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-xs text-gray-400">
                          {lab?.name}
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
                          <span className="text-xs text-gray-400">
                            {lab?.name}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {item.description}
                      </p>
                      <div className="text-sm text-gray-500 mb-3">
                        <strong>Specifications:</strong> {item.specifications}
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
            );
          })}
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
              Try adjusting your search terms or lab filter
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Access Our Infrastructure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us to learn more about our lab facilities and equipment availability
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

export default ProductsPage;