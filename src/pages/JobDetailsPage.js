import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Star, Users, Calendar, Shield, CheckCircle, ArrowLeft } from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock job data - in real app, fetch from API
    const mockJob = {
      id: parseInt(id),
      title: 'Retail Store Assistant - Weekend Shift',
      description: 'We are looking for a reliable and customer-focused retail assistant to join our team for weekend shifts at our electronics store. The ideal candidate will have excellent communication skills and previous customer service experience.',
      fullDescription: `We are a leading electronics retailer with multiple stores across the city. We are currently looking for weekend staff to help us serve our customers during our busiest times.

**Responsibilities:**
- Assist customers with product inquiries and purchases
- Maintain store cleanliness and organization
- Process transactions at the cash register
- Stock shelves and manage inventory
- Provide excellent customer service

**Requirements:**
- Previous retail or customer service experience preferred
- Good communication skills in English and Hindi
- Ability to work weekends (Saturday and Sunday)
- Friendly and approachable personality
- Basic computer skills

**Benefits:**
- Competitive hourly rate
- Flexible scheduling
- Opportunity for growth
- Friendly work environment`,
      category: 'retail',
      location: 'Mumbai, Maharashtra',
      budget: '₹500 - ₹800 per day',
      duration: '2 days',
      posted: '2 hours ago',
      proposals: 12,
      client: {
        name: 'TechMart Electronics',
        rating: 4.8,
        totalSpent: '₹50k+',
        memberSince: '2020',
        completedJobs: 45,
        avatar: 'https://ui-avatars.com/api/?name=TechMart+Electronics&background=14a800&color=fff'
      },
      skills: ['Customer Service', 'Retail', 'Communication', 'Cash Handling'],
      requirements: [
        'Previous retail experience preferred',
        'Good communication skills',
        'Available for weekend shifts',
        'Basic computer skills'
      ],
      benefits: [
        'Competitive pay',
        'Flexible scheduling',
        'Growth opportunities',
        'Friendly environment'
      ]
    };

    setTimeout(() => {
      setJob(mockJob);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-500">
            ← Back to all jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/jobs"
          className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-red-600" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  {job.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  {job.budget}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                  Posted {job.posted}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700">{job.fullDescription}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Client Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Client</h3>
              <div className="flex items-center mb-4">
                <img
                  src={job.client.avatar}
                  alt={job.client.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{job.client.name}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {job.client.rating}
                    <span className="ml-2">({job.client.totalSpent})</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Member since {job.client.memberSince}</div>
                <div>{job.client.completedJobs} jobs completed</div>
              </div>
            </div>

            {/* Job Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Proposals:</span>
                  <span className="font-medium">{job.proposals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">{job.posted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{job.category}</span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                Apply for this Job
              </button>
              <p className="text-sm text-gray-600 text-center">
                You'll be able to submit your proposal after applying
              </p>
            </div>

            {/* Safety Info */}
            <div className="bg-green-50 rounded-lg p-6 mt-6">
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-800">Safe & Secure</h3>
              </div>
              <p className="text-sm text-green-700">
                All payments are protected by our secure escrow system. You'll only be paid when the client is satisfied with your work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
