'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, Star, User, Calendar, CheckCircle } from 'lucide-react';

const JobDetailsPage = () => {
  const [isApplying, setIsApplying] = useState(false);

  const job = {
    id: 1,
    title: 'Retail Store Assistant',
    company: 'TechMart Electronics',
    location: 'Mumbai, Maharashtra',
    type: 'Part-time',
    duration: '2 weeks',
    pay: '₹500/day',
    rating: 4.8,
    description: 'We are looking for a friendly and energetic retail store assistant to join our team at TechMart Electronics. You will be responsible for assisting customers with product inquiries, maintaining store displays, and ensuring a positive shopping experience.',
    requirements: [
      'High school diploma or equivalent',
      'Previous retail experience preferred',
      'Excellent communication skills',
      'Ability to work flexible hours',
      'Customer service oriented'
    ],
    responsibilities: [
      'Greet customers and assist with product inquiries',
      'Maintain clean and organized store displays',
      'Process transactions at the cash register',
      'Handle customer complaints and returns',
      'Stock shelves and maintain inventory'
    ],
    skills: ['Customer Service', 'Retail', 'Communication', 'Sales'],
    posted: '2 days ago',
    applications: 12,
    companyInfo: {
      name: 'TechMart Electronics',
      description: 'Leading electronics retailer with 50+ stores across India',
      rating: 4.8,
      totalJobs: 25,
      established: '2015'
    }
  };

  const handleApply = () => {
    setIsApplying(true);
    // Simulate application process
    setTimeout(() => {
      setIsApplying(false);
      alert('Application submitted successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/jobs" className="text-blue-600 hover:text-blue-800">
            ← Back to Jobs
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{job.company}</p>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {job.duration}
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="w-5 h-5 mr-2" />
                    {job.pay}
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 mr-1" />
                    <span className="font-medium">{job.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 lg:mt-0 lg:ml-6">
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {isApplying ? 'Applying...' : 'Apply Now'}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  {job.applications} applications received
                </p>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.companyInfo.name}</h3>
                  <p className="text-gray-600 mb-4">{job.companyInfo.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span>Company Rating: {job.companyInfo.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Total Jobs: {job.companyInfo.totalJobs}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Established: {job.companyInfo.established}</span>
                    </div>
                  </div>
                </div>

                {/* Job Stats */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posted:</span>
                      <span className="font-medium">{job.posted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Applications:</span>
                      <span className="font-medium">{job.applications}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job Type:</span>
                      <span className="font-medium">{job.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{job.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
