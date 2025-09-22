import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, DollarSign, Star, Users } from 'lucide-react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'retail', name: 'Retail Gigs' },
    { id: 'field', name: 'Field Gigs' },
    { id: 'event', name: 'Event Gigs' },
    { id: 'restaurant', name: 'Restaurant Gigs' },
    { id: 'delivery', name: 'Delivery Gigs' },
    { id: 'support', name: 'Customer Support' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'hyderabad', name: 'Hyderabad' },
    { id: 'chennai', name: 'Chennai' },
    { id: 'remote', name: 'Remote' }
  ];

  useEffect(() => {
    // Mock job data
    const mockJobs = [
      {
        id: 1,
        title: 'Retail Store Assistant - Weekend Shift',
        description: 'Looking for a reliable retail assistant for weekend shifts at our electronics store. Must have good communication skills and customer service experience.',
        category: 'retail',
        location: 'Mumbai',
        budget: '₹500 - ₹800 per day',
        duration: '2 days',
        posted: '2 hours ago',
        proposals: 12,
        client: {
          name: 'TechMart Electronics',
          rating: 4.8,
          totalSpent: '₹50k+'
        },
        skills: ['Customer Service', 'Retail', 'Communication']
      },
      {
        id: 2,
        title: 'Field Survey Executive',
        description: 'Conduct market research surveys in assigned areas. Must be comfortable with door-to-door visits and data collection.',
        category: 'field',
        location: 'Delhi',
        budget: '₹300 - ₹500 per survey',
        duration: '1 week',
        posted: '4 hours ago',
        proposals: 8,
        client: {
          name: 'Market Research Co.',
          rating: 4.6,
          totalSpent: '₹25k+'
        },
        skills: ['Survey', 'Field Work', 'Data Collection']
      },
      {
        id: 3,
        title: 'Event Staff for Wedding',
        description: 'Need experienced event staff for a wedding ceremony. Responsibilities include guest assistance, setup, and coordination.',
        category: 'event',
        location: 'Bangalore',
        budget: '₹1,000 - ₹1,500 per day',
        duration: '1 day',
        posted: '6 hours ago',
        proposals: 15,
        client: {
          name: 'Wedding Planners Inc.',
          rating: 4.9,
          totalSpent: '₹75k+'
        },
        skills: ['Event Management', 'Customer Service', 'Coordination']
      },
      {
        id: 4,
        title: 'Restaurant Server - Peak Hours',
        description: 'Urgent need for experienced servers during peak dining hours. Must be available for evening shifts.',
        category: 'restaurant',
        location: 'Hyderabad',
        budget: '₹400 - ₹600 per shift',
        duration: 'Ongoing',
        posted: '1 day ago',
        proposals: 20,
        client: {
          name: 'Fine Dining Restaurant',
          rating: 4.7,
          totalSpent: '₹30k+'
        },
        skills: ['Serving', 'Customer Service', 'Food Service']
      },
      {
        id: 5,
        title: 'Last Mile Delivery Partner',
        description: 'Join our delivery network and earn by delivering packages in your area. Flexible timings and good earning potential.',
        category: 'delivery',
        location: 'Chennai',
        budget: '₹200 - ₹400 per delivery',
        duration: 'Flexible',
        posted: '2 days ago',
        proposals: 25,
        client: {
          name: 'QuickDeliver Logistics',
          rating: 4.5,
          totalSpent: '₹100k+'
        },
        skills: ['Delivery', 'Driving', 'Time Management']
      },
      {
        id: 6,
        title: 'Customer Support Representative',
        description: 'Provide customer support via phone and chat. Work from home opportunity with flexible hours.',
        category: 'support',
        location: 'Remote',
        budget: '₹15,000 - ₹25,000 per month',
        duration: '1 month',
        posted: '3 days ago',
        proposals: 18,
        client: {
          name: 'TechSupport Solutions',
          rating: 4.8,
          totalSpent: '₹200k+'
        },
        skills: ['Customer Support', 'Communication', 'Problem Solving']
      }
    ];

    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location.toLowerCase() === selectedLocation);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, selectedCategory, selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Gig</h1>
          <p className="text-lg text-gray-600">
            Discover local opportunities that match your skills and schedule
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for jobs, skills, or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {job.title}
                </h3>
                <span className="text-sm text-gray-500 ml-2">{job.posted}</span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  {job.budget}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  {job.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-red-600" />
                  {job.location}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${job.client.name}&background=14a800&color=fff`}
                    alt={job.client.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{job.client.name}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {job.client.rating}
                      <span className="ml-1">({job.client.totalSpent})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {job.proposals} proposals
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
