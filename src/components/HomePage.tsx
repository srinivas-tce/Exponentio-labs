'use client';

import React from 'react';
import Link from 'next/link';
import BackgroundVideo from './BackgroundVideo';
import ContactForm from './ContactForm';
import { 
  Search, 
  Briefcase, 
  Users, 
  DollarSign, 
  Star, 
  Clock, 
  MapPin,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Store,
  MapPin as LocationIcon,
  Calendar,
  Utensils,
  Truck,
  Headphones,
  UserCheck,
  Award,
  Lock,
  Eye,
  MessageCircle
} from 'lucide-react';

const HomePage = () => {

  const stats = [
    { number: '50,000+', label: 'Professionals Registered' },
    { number: '15,000+', label: 'Pincodes Penetrated' },
    { number: '500+', label: 'Cities Penetrated' },
    { number: '28+', label: 'States and UT Penetrated' }
  ];

  const gigCategories = [
    {
      icon: <Store className="w-12 h-12 text-blue-600" />,
      title: 'Retail Gigs',
      description: 'Flexible staffing for retail stores, brand audits, and shelf management.',
      features: ['Weekend Support', 'Peak Season Staffing', 'Brand Audits', 'Shelf Management']
    },
    {
      icon: <LocationIcon className="w-12 h-12 text-green-600" />,
      title: 'Field Gigs',
      description: 'On-ground execution, surveys, and data collection across various locations.',
      features: ['Market Research', 'Data Collection', 'Field Surveys', 'Location Services']
    },
    {
      icon: <Calendar className="w-12 h-12 text-purple-600" />,
      title: 'Event Gigs',
      description: 'Event management, promotion, and support for various occasions.',
      features: ['Event Setup', 'Promotion', 'Crowd Management', 'Logistics Support']
    },
    {
      icon: <Utensils className="w-12 h-12 text-orange-600" />,
      title: 'Food & Beverage',
      description: 'Restaurant support, food delivery, and catering services.',
      features: ['Kitchen Support', 'Delivery', 'Catering', 'Food Service']
    },
    {
      icon: <Truck className="w-12 h-12 text-red-600" />,
      title: 'Logistics Gigs',
      description: 'Delivery, warehousing, and supply chain support services.',
      features: ['Last Mile Delivery', 'Warehouse Support', 'Inventory Management', 'Supply Chain']
    },
    {
      icon: <Headphones className="w-12 h-12 text-indigo-600" />,
      title: 'Customer Support',
      description: 'Remote and on-site customer service and support roles.',
      features: ['Call Center', 'Chat Support', 'Technical Support', 'Customer Service']
    }
  ];

  const reasons = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Vast Talent Pool',
      description: 'Access to 50,000+ verified gig workers across 28+ states and 500+ cities.'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: 'Quick Deployment',
      description: 'Get workers deployed within 24-48 hours for urgent requirements.'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Verified Workers',
      description: 'All workers are background verified with proper documentation.'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-purple-600" />,
      title: 'Cost Effective',
      description: 'Save up to 40% on staffing costs compared to traditional hiring.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-600" />,
      title: 'Scalable Solutions',
      description: 'Scale up or down based on your business requirements instantly.'
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: 'Quality Assurance',
      description: 'Maintain high service quality with our performance monitoring system.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Store Manager, Retail Chain',
      content: 'Exponentio Labs has been a game-changer for our research and development needs. The equipment and support are professional and reliable.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'Event Coordinator',
      content: 'Quick deployment and excellent service quality. Perfect for our event management needs.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Head',
      content: 'Cost-effective solution with reliable workers. Highly recommend for businesses of all sizes.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Post Your Requirement',
      description: 'Describe your gig needs, location, and timeline.'
    },
    {
      step: '2',
      title: 'Get Matched Workers',
      description: 'We match you with verified workers in your area.'
    },
    {
      step: '3',
      title: 'Deploy & Monitor',
      description: 'Workers are deployed and performance is monitored.'
    },
    {
      step: '4',
      title: 'Pay & Rate',
      description: 'Complete payment and rate the service quality.'
    }
  ];

  const featuredWorkers = [
    {
      name: 'Rajesh Kumar',
      skills: ['Retail Support', 'Customer Service'],
      rating: 4.9,
      completedJobs: 45,
      location: 'Mumbai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Priya Singh',
      skills: ['Event Management', 'Promotion'],
      rating: 4.8,
      completedJobs: 32,
      location: 'Delhi',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Amit Patel',
      skills: ['Field Research', 'Data Collection'],
      rating: 4.9,
      completedJobs: 28,
      location: 'Bangalore',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  const blogPosts = [
    {
      title: 'Where to Find On-field Gig',
      date: '20/06/2024',
      description: 'STOP THE TALENT HUNT!!! Tired of searching "Gig workers nearby me" on Google only to find dead ends?',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/blog/on-field-gig'
    },
    {
      title: 'Boost your gig profile',
      date: '02/06/2024',
      description: 'Are you struggling to land more gigs despite putting in endless hours crafting your profile?',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/blog/boost-profile'
    },
    {
      title: 'Life Lessons, Not Just Latte',
      date: '29/05/2024',
      description: 'Ever think a part-time job was just about folding clothes or slinging fries?',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/blog/life-lessons'
    }
  ];

  const companies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Facebook', logo: 'https://logo.clearbit.com/facebook.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
    { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com' },
    { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com' },
    { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
    { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
    { name: 'PayPal', logo: 'https://logo.clearbit.com/paypal.com' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Video */}
      <BackgroundVideo />

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Exponentio Labs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your one-stop platform for connecting with skilled gig workers and accessing cutting-edge lab equipment for your projects.
            </p>
          </div>
        </div>
      </section>

      {/* Gig Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Perfect Gig Worker!
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our diverse range of gig categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gigCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <ul className="space-y-2">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies that trust us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Companies that trust us</h2>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of logos */}
              {companies.map((company, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-16 w-auto opacity-100 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextSibling) {
                        (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="h-16 w-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hidden">
                    {company.name}
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companies.map((company, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-16 w-auto opacity-100 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextSibling) {
                        (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="h-16 w-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hidden">
                    {company.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Circles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="relative flex items-center justify-center">
              {/* First Circle - Pink */}
              <div className="w-48 h-48 bg-pink-500 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10 relative">
                <div className="text-4xl font-bold">39000+</div>
                <div className="text-sm font-medium text-center px-4">GIG WORKERS REGISTERED</div>
              </div>
              
              {/* Second Circle - Pink/Magenta */}
              <div className="w-48 h-48 bg-pink-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-20 relative -ml-8">
                <div className="text-4xl font-bold">7500+</div>
                <div className="text-sm font-medium text-center px-4">PINCODES PENETRATED</div>
              </div>
              
              {/* Third Circle - Dark Red */}
              <div className="w-48 h-48 bg-red-700 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-30 relative -ml-8">
                <div className="text-4xl font-bold">2000+</div>
                <div className="text-sm font-medium text-center px-4">CITIES PENETRATED</div>
              </div>
              
              {/* Fourth Circle - Darkest Red */}
              <div className="w-48 h-48 bg-red-800 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-40 relative -ml-8">
                <div className="text-4xl font-bold">34+</div>
                <div className="text-sm font-medium text-center px-4">STATES AND UT PENETRATED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons Why Employers Choose Exponentio Labs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Reasons Why Employers Choose Exponentio Labs
            </h2>
            <p className="text-xl text-gray-600">
              Discover what makes us the preferred choice for businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="mb-6 flex justify-center">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Blogs!
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest insights and tips
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <Link
                    href={post.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using Exponentio Labs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/jobs"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
