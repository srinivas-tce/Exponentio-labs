'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Code, 
  Bot, 
  Wifi, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  RocketIcon,
  Users,
  Shield,
  Zap,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: <Cpu className="w-12 h-12 text-blue-600" />,
      title: 'Agentic AI Development',
      slug: 'agentic-ai-development',
      description: 'Building intelligent, autonomous systems that think, act, and adapt.',
      features: ['Autonomous Systems', 'Smart Decision-Making', 'Predictive AI', 'Adaptive Models'],
      benefits: [
        'Reduce manual intervention by 80%',
        'Intelligent automation for complex workflows',
        'Real-time decision making capabilities',
        'Scalable AI solutions for enterprise needs'
      ]
    },
    {
      icon: <Code className="w-12 h-12 text-green-600" />,
      title: 'Full Stack Development',
      slug: 'full-stack-development',
      description: 'End-to-end web and app solutions, from idea to deployment.',
      features: ['Frontend & Backend', 'API Development', 'Database Integration', 'Responsive Design'],
      benefits: [
        'Complete digital transformation',
        'Cross-platform compatibility',
        'Scalable architecture design',
        'Modern tech stack implementation'
      ]
    },
    {
      icon: <img src="https://www.inevitable-infotech.com/wp-content/uploads/2024/05/AR-VR-Testing-Services_Vector-Image.svg" className="w-50 h-12 text-purple-600" />,
      title: 'AR / VR & Metaverse',
      slug: 'ar-vr-metaverse',
      description: 'Immersive experiences that blend reality with imagination.',
      features: ['AR Apps', 'VR Experiences', 'Metaverse Integration', '3D Simulations'],
      benefits: [
        'Immersive user experiences',
        'Virtual training and education',
        'Metaverse-ready applications',
        'Interactive 3D environments'
      ]
    },
    {
      icon: <Bot className="w-12 h-12 text-orange-600" />,
      title: 'Robotics',
      slug: 'robotics',
      description: 'Smart machines engineered for precision and efficiency.',
      features: ['Automation', 'Industrial Robotics', 'AI-Powered Robotics', 'Robotic Design'],
      benefits: [
        'Industrial automation solutions',
        'Precision manufacturing systems',
        'AI-driven robotic intelligence',
        'Custom robotic applications'
      ]
    },
    {
      icon: <Wifi className="w-12 h-12 text-cyan-600" />,
      title: 'Embedded & IoT',
      slug: 'embedded-iot',
      description: 'Connected devices driving real-time insights and automation.',
      features: ['IoT Devices', 'Embedded Systems', 'Sensor Networks', 'Automation Solutions'],
      benefits: [
        'Smart device connectivity',
        'Real-time data monitoring',
        'Automated control systems',
        'Edge computing solutions'
      ]
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-indigo-600" />,
      title: 'Idea Labs',
      slug: 'idea-labs',
      description: 'From spark to prototype, we transform bold ideas into reality.',
      features: ['Prototyping', 'Innovation', 'Product Design', 'MVP Development'],
      benefits: [
        'Rapid prototyping capabilities',
        'Innovation consulting',
        'Product design and development',
        'MVP to market acceleration'
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Expert Team',
      description: 'Skilled young technologists trained on industry-updated tools and technologies.'
    },
    {
      icon: <RocketIcon className="w-8 h-8 text-green-600" />,
      title: 'Fast Delivery',
      description: 'From idea to MVP in record time with our accelerated development process.'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: 'Quality Assurance',
      description: 'Rigorous testing and quality control to ensure robust, scalable solutions.'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: 'Cutting-Edge Tech',
      description: 'Latest technologies and frameworks for future-ready applications.'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-red-600" />,
      title: 'Cost Effective',
      description: 'Competitive pricing without compromising on quality or innovation.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: 'Scalable Solutions',
      description: 'Built to grow with your business from startup to enterprise scale.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From cutting-edge AI to immersive AR/VR experiences, we provide comprehensive technology solutions 
              that transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/#about"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive <span className="text-orange-600">Technology Solutions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our range of specialized services designed to meet your unique needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <ArrowRight className="w-4 h-4 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">Exponential Labs</span>?
            </h2>
            <p className="text-xl text-gray-600">
              The edge that makes us your perfect innovation partner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your project and find the perfect solution for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
