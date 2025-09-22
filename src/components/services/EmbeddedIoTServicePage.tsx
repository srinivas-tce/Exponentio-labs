'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Wifi, CheckCircle, Users, Shield, Zap, DollarSign, TrendingUp, Lightbulb } from 'lucide-react';

const EmbeddedIoTServicePage = () => {
  const features = [
    "IoT Device Development",
    "Embedded System Design", 
    "Sensor Network Integration",
    "Edge Computing Solutions",
    "Wireless Connectivity",
    "Real-time Data Processing"
  ];

  const benefits = [
    "Smart device connectivity",
    "Real-time data monitoring", 
    "Automated control systems",
    "Edge computing solutions",
    "Reduced operational costs",
    "Enhanced efficiency and productivity"
  ];

  const process = [
    {
      step: "1",
      title: "Requirements & Analysis",
      description: "We analyze your IoT needs and design comprehensive embedded solutions"
    },
    {
      step: "2", 
      title: "Hardware & Software Design",
      description: "Develop custom embedded systems and IoT devices for your specific use case"
    },
    {
      step: "3",
      title: "Integration & Testing",
      description: "Integrate devices and conduct thorough testing to ensure reliability"
    },
    {
      step: "4",
      title: "Deployment & Monitoring",
      description: "Deploy solutions and provide ongoing monitoring and maintenance"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-100">
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
              <Wifi className="w-12 h-12 text-cyan-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                Embedded & <span className="text-cyan-600">IoT</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Connect devices and drive real-time insights with our embedded systems and IoT solutions. 
              Build the future of connected technology with smart, efficient systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">IoT Devices</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Embedded Systems</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Sensor Networks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We <span className="text-cyan-600">Deliver</span>
            </h2>
            <p className="text-xl text-gray-600">
              Connected technology solutions that drive insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="w-8 h-8 text-cyan-600" />
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
              Why Choose Our <span className="text-cyan-600">IoT Solutions</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Proven benefits that drive real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <ArrowRight className="w-6 h-6 text-cyan-500 mr-4 mt-1 flex-shrink-0" />
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
              Our <span className="text-cyan-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600">
              A systematic approach to IoT implementation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Connect Your Devices?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Let's discuss how our IoT solutions can transform your operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors">
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmbeddedIoTServicePage;
