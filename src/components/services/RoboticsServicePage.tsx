'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, CheckCircle, Users, Shield, Zap, DollarSign, TrendingUp, Lightbulb, Cpu, MapPin, Package, Target, Award, Clock, BarChart, Settings, Eye, Navigation } from 'lucide-react';

const RoboticsServicePage = () => {
  const topProjects = [
    {
      title: "AI-Driven Smart Manufacturing Arm",
      complexity: "8/10",
      timeline: "16-20 weeks",
      budget: "$3,000 - $6,000",
      description: "Develop an intelligent work cell for Industry 4.0 applications using the Cobot Pi 280 collaborative arm. This project moves beyond simple pick-and-place to create a system that uses AI for advanced tasks. The arm will leverage computer vision for automated quality inspection on a simulated assembly line and use reinforcement learning to continuously optimize its own movements for speed and efficiency.",
      hardware: "Cobot Pi 280 (6-DOF Arm), Raspberry Pi Controller, Vision Camera, Custom End-Effectors",
      software: "ROS 2 + Python (SDK) + Computer Vision (YOLO) + Reinforcement Learning Frameworks",
      icon: <Cpu className="w-8 h-8 text-blue-600" />,
      color: "blue",
      learningOutcomes: [
        "Advanced Kinematics: Master motion planning and control for a 6-DOF robotic arm",
        "AI for Automation: Integrate AI models for intelligent decision-making in manufacturing tasks",
        "Computer Vision: Implement quality inspection and object recognition using AI vision models",
        "Reinforcement Learning: Apply reinforcement learning techniques to optimize a robot's physical tasks",
        "ROS 2 Integration: Utilize open-source APIs and the Robot Operating System (ROS 2) for complex control"
      ],
      applications: [
        "Smart manufacturing and Industry 4.0 initiatives",
        "Automated quality inspection and control on assembly lines",
        "Automated lab assistants for pick-and-place tasks",
        "Healthcare applications like automated medicine dispensing"
      ]
    },
    {
      title: "Multi-Robot Warehouse Management System",
      complexity: "8/10",
      timeline: "24-32 weeks",
      budget: "$25,000 - $40,000",
      description: "Scale a single service robot concept into a coordinated fleet for a large-scale warehouse environment. This system replaces basic line-following with advanced SLAM (Simultaneous Localization and Mapping) for dynamic, autonomous navigation. The robots, equipped with load-handling mechanisms, will be coordinated by a central fleet management system that handles task scheduling and path optimization.",
      hardware: "Fleet of mobile robots, LiDAR/Vision Sensors, Robotic Arms/Conveyors, IoT Gateway, Cloud Servers",
      software: "ROS 2 + SLAM Navigation + Fleet Management Algorithms + Cloud IoT Platform",
      icon: <Package className="w-8 h-8 text-green-600" />,
      color: "green",
      learningOutcomes: [
        "Autonomous Navigation: Implement SLAM for dynamic navigation in large-scale layouts",
        "Robotic Manipulation: Integrate robotic arms or conveyors for autonomous loading and unloading of goods",
        "Fleet Management: Design and deploy systems for multi-robot coordination and task scheduling",
        "IoT Integration: Build a cloud-based monitoring system for real-time tracking of inventory and robot status",
        "Systems Engineering: Learn to scale a single-robot prototype into a robust, multi-agent system"
      ],
      applications: [
        "E-commerce fulfillment and logistics centers",
        "Automated inventory management",
        "Manufacturing floor material transport",
        "Smart factory and supply chain automation"
      ]
    },
    {
      title: "Smart Campus Delivery Robot",
      complexity: "7/10",
      timeline: "12-16 weeks",
      budget: "$5,000 - $8,000",
      description: "Using the TurtleBot 4 open-source platform, create an autonomous robot for food and package delivery within a campus environment. The robot will utilize its built-in LiDAR and camera to perform SLAM, allowing it to navigate complex indoor spaces without predefined lines. Delivery locations will be marked with QR codes or AprilTags, which the robot will identify using its vision system to ensure precise drop-offs.",
      hardware: "TurtleBot 4 Platform, LiDAR, RGB-D Camera, IMU, QR/AprilTag Markers",
      software: "ROS 2 Navigation Stack + SLAM Algorithms + Computer Vision (OpenCV)",
      icon: <Navigation className="w-8 h-8 text-purple-600" />,
      color: "purple",
      learningOutcomes: [
        "ROS 2 Programming: Gain hands-on experience with nodes, topics, and services in ROS 2",
        "SLAM Implementation: Apply SLAM algorithms for autonomous mapping and navigation in a real-world environment",
        "Multi-Sensor Fusion: Learn to combine data from lidar, cameras, and IMUs for robust localization",
        "Computer Vision: Use vision-based object recognition to identify location markers for navigation tasks",
        "Path Planning: Explore and implement obstacle avoidance and path planning algorithms"
      ],
      applications: [
        "Last-mile delivery services",
        "Logistics within hospitals, hotels, and offices",
        "Automated food service and hospitality",
        "Warehouse 'follow-me' picking assistants"
      ]
    }
  ];

  const successMetrics = [
    {
      project: "AI-Driven Manufacturing Arm",
      metrics: [
        "Achieve >95% accuracy in defect detection using the vision system",
        "Reduce task completion time by 15% using reinforcement learning optimization",
        "Publication of the AI model for robotic arm control"
      ]
    },
    {
      project: "Multi-Robot Warehouse System",
      metrics: [
        "Successfully map a 1,000 sq. ft. area using SLAM with less than 5% error",
        "Achieve a 95% success rate for coordinated, multi-robot delivery tasks without collision",
        "Develop a novel task scheduling algorithm for a robotic fleet"
      ]
    },
    {
      project: "Smart Campus Delivery Robot",
      metrics: [
        "Attain a 99% recognition rate for QR/AprilTag location markers under various lighting conditions",
        "Complete 10 consecutive autonomous deliveries to different locations without human intervention",
        "Contribution to the open-source TurtleBot 4 navigation stack"
      ]
    }
  ];

  const implementationRequirements = [
    {
      aspect: "Technical Complexity",
      manufacturing: "AI/ML + Kinematics + Vision",
      warehouse: "SLAM + Fleet Mgmt. + IoT",
      delivery: "SLAM + Sensor Fusion + Vision"
    },
    {
      aspect: "Team Size & Prerequisites",
      manufacturing: "3-4 students: AI/ML, Python, ROS",
      warehouse: "5-7 students: ROS, networking, cloud",
      delivery: "2-4 students: ROS, Linux, Python"
    },
    {
      aspect: "Industry Mentorship",
      manufacturing: "Automation Engineers",
      warehouse: "Robotics/Logistics Engineers",
      delivery: "ROS Developers"
    },
    {
      aspect: "Certification Potential",
      manufacturing: "ROS-I Certification, NVIDIA AI",
      warehouse: "AWS/Azure IoT Certification",
      delivery: "ROS Developer Certification"
    },
    {
      aspect: "Career Paths",
      manufacturing: "Robotics Automation Engineer",
      warehouse: "Fleet Operations Specialist",
      delivery: "Autonomous Systems Developer"
    },
    {
      aspect: "Market Demand",
      manufacturing: "Very High (Industry 4.0)",
      warehouse: "Extremely High (Logistics)",
      delivery: "High (Service Robotics)"
    }
  ];

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

      {/* Top Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top 3 Most Complex <span className="text-orange-600">Robotics Projects</span>
            </h2>
            <p className="text-xl text-gray-600">
              Advanced robotics projects that push the boundaries of autonomous systems and industrial automation
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
              Success <span className="text-orange-600">Metrics</span>
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
                      <Target className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Implementation <span className="text-orange-600">Requirements</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive comparison of project requirements and career outcomes
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Aspect</th>
                  <th className="px-6 py-4 text-left font-semibold">AI-Driven Mfg. Arm</th>
                  <th className="px-6 py-4 text-left font-semibold">Warehouse Mgmt. System</th>
                  <th className="px-6 py-4 text-left font-semibold">Smart Campus Delivery</th>
                </tr>
              </thead>
              <tbody>
                {implementationRequirements.map((req, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{req.aspect}</td>
                    <td className="px-6 py-4 text-gray-700">{req.manufacturing}</td>
                    <td className="px-6 py-4 text-gray-700">{req.warehouse}</td>
                    <td className="px-6 py-4 text-gray-700">{req.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
