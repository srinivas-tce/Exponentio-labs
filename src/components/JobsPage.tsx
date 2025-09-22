'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, DollarSign, Star, Filter } from 'lucide-react';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Retail Store Assistant',
      company: 'TechMart Electronics',
      location: 'Mumbai, Maharashtra',
      type: 'Part-time',
      duration: '2 weeks',
      pay: '₹500/day',
      rating: 4.8,
      description: 'Assist customers with product inquiries and maintain store displays.',
      skills: ['Customer Service', 'Retail', 'Communication'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Event Promoter',
      company: 'EventPro Solutions',
      location: 'Delhi, NCR',
      type: 'Gig',
      duration: '1 week',
      pay: '₹800/day',
      rating: 4.6,
      description: 'Promote upcoming tech conference and engage with potential attendees.',
      skills: ['Marketing', 'Communication', 'Events'],
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'Field Surveyor',
      company: 'DataCollect India',
      location: 'Bangalore, Karnataka',
      type: 'Contract',
      duration: '1 month',
      pay: '₹600/day',
      rating: 4.9,
      description: 'Conduct market research surveys in designated areas.',
      skills: ['Research', 'Data Collection', 'Field Work'],
      posted: '3 days ago'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Jobs', count: jobs.length },
    { id: 'retail', name: 'Retail', count: 1 },
    { id: 'event', name: 'Events', count: 1 },
    { id: 'field', name: 'Field Work', count: 1 }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'retail' && job.title.includes('Retail')) ||
                           (selectedCategory === 'event' && job.title.includes('Event')) ||
                           (selectedCategory === 'field' && job.title.includes('Field'));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Gig
            </h1>
            <p className="text-xl text-gray-600">
              Discover exciting opportunities that match your skills and schedule
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
                  placeholder="Search jobs, companies, or skills..."
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
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} job opportunities
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-2">{job.company}</p>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                        <Clock className="w-4 h-4 ml-4 mr-1" />
                        {job.duration}
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{job.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.pay}
                    </div>
                    <span className="text-sm text-gray-500">Posted {job.posted}</span>
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
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

export default JobsPage;
