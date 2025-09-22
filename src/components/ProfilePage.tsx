'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, Star, Briefcase, Award } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '',
    location: '',
    bio: '',
    skills: ['React', 'JavaScript', 'Node.js'],
    experience: '',
    education: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSkillAdd = (skill: string) => {
    if (skill.trim() && !profileData.skills.includes(skill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skill.trim()]
      });
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '',
      location: '',
      bio: '',
      skills: ['React', 'JavaScript', 'Node.js'],
      experience: '',
      education: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=14a800&color=fff"
                  alt="John Doe"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="ml-6">
                  <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  <p className="text-blue-100 text-lg">{profileData.email}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-blue-100 ml-2">(25 jobs completed)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center disabled:opacity-50"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900">{profileData.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+91 98765 43210"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.phone || 'Not provided'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Mumbai, Maharashtra"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.location || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about yourself, your experience, and what makes you unique..."
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.bio || 'No bio provided'}</p>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profileData.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a skill"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSkillAdd(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          handleSkillAdd(input.value);
                          input.value = '';
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">4.8</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Jobs Completed:</span>
                      <span className="font-semibold">25</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Member Since:</span>
                      <span className="font-semibold">2024</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View My Applications
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Browse Jobs
                    </button>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      Update Availability
                    </button>
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

export default ProfilePage;
