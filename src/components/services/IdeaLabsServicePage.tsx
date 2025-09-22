'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle, Users, Shield, Zap, DollarSign, TrendingUp, RocketIcon } from 'lucide-react';

const IdeaLabsServicePage = () => {
  const features = [
    "Rapid Prototyping",
    "Innovation Consulting", 
    "Product Design & Development",
    "MVP Development",
    "Concept Validation",
    "Market Research & Analysis"
  ];

  const benefits = [
    "Rapid prototyping capabilities",
    "Innovation consulting", 
    "Product design and development",
    "MVP to market acceleration",
    "Reduced time to market",
    "Lower development risks"
  ];

  const process = [
    {
      step: "1",
      title: "Ideation & Research",
      description: "We help you refine your idea and conduct market research to validate concepts"
    },
    {
      step: "2", 
      title: "Design & Prototyping",
      description: "Create detailed designs and build rapid prototypes to test your concept"
    },
    {
      step: "3",
      title: "Development & Testing",
      description: "Develop your MVP and conduct comprehensive testing with real users"
    },
    {
      step: "4",
      title: "Launch & Scale",
      description: "Launch your product and provide support for scaling and growth"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100">
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
              <Lightbulb className="w-12 h-12 text-indigo-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                <span className="text-indigo-600">Idea Labs</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              From spark to prototype, we transform bold ideas into reality. Our Idea Labs service 
              accelerates innovation from concept to market-ready product with rapid prototyping and expert guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Prototyping</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Innovation</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Product Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We <span className="text-indigo-600">Deliver</span>
            </h2>
            <p className="text-xl text-gray-600">
              Innovation services that turn ideas into reality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="w-8 h-8 text-indigo-600" />
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
              Why Choose Our <span className="text-indigo-600">Idea Labs</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Proven benefits that drive real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <ArrowRight className="w-6 h-6 text-indigo-500 mr-4 mt-1 flex-shrink-0" />
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
              Our <span className="text-indigo-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600">
              A systematic approach to innovation and product development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Let's discuss how our Idea Labs can accelerate your innovation journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdeaLabsServicePage;
