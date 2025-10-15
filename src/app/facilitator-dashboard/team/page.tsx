'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { 
  ArrowLeft, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Users,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Facilitator {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  experience: number;
  specialization: string;
  thumbnail: string;
  created_at: string;
  facilitator_lab: {
    lab_id: string;
    labs: {
      name: string;
      category: string;
    };
  }[];
}

const TeamManagementPage: React.FC = () => {
  const [facilitators, setFacilitators] = useState<Facilitator[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFacilitator, setNewFacilitator] = useState({
    email: '',
    name: '',
    department: '',
    experience: 0,
    specialization: '',
    lab_ids: [] as string[]
  });
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.email) {
      fetchFacilitators();
    }
  }, [user]);

  const fetchFacilitators = async () => {
    try {
      const response = await fetch(`/api/facilitator/team?email=${encodeURIComponent(user?.email || '')}`);
      const data = await response.json();
      
      if (data.success) {
        setFacilitators(data.data);
      }
    } catch (error) {
      console.error('Error fetching facilitators:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFacilitator = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/facilitator/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFacilitator),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowAddForm(false);
        setNewFacilitator({
          email: '',
          name: '',
          department: '',
          experience: 0,
          specialization: '',
          lab_ids: []
        });
        fetchFacilitators();
      }
    } catch (error) {
      console.error('Error adding facilitator:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/facilitator-dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-2">Manage facilitators and their lab assignments</p>
              {user && (
                <p className="text-sm text-blue-600 mt-1">
                  Showing facilitators from your assigned labs only
                </p>
              )}
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Facilitator</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Facilitators</p>
                <p className="text-2xl font-bold text-gray-900">{facilitators.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Facilitators</p>
                <p className="text-2xl font-bold text-gray-900">{facilitators.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Lab Assignments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {facilitators.reduce((sum, f) => sum + f.facilitator_lab.length, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilitators List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Facilitators</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {facilitators.map((facilitator) => (
                <div key={facilitator.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      {facilitator.thumbnail ? (
                        <img src={facilitator.thumbnail} alt={facilitator.name} className="w-12 h-12 rounded-full" />
                      ) : (
                        <Users className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{facilitator.name}</h4>
                        <p className="text-sm text-gray-600">{facilitator.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{facilitator.department || 'No department'}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{facilitator.experience} years experience</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{facilitator.specialization || 'No specialization'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Assigned Labs:</p>
                      <div className="flex flex-wrap gap-2">
                        {facilitator.facilitator_lab.map((assignment) => (
                          <span
                            key={assignment.lab_id}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {assignment.labs.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Facilitator Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Add New Facilitator</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleAddFacilitator} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newFacilitator.email}
                    onChange={(e) => setNewFacilitator({ ...newFacilitator, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="facilitator@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFacilitator.name}
                    onChange={(e) => setNewFacilitator({ ...newFacilitator, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newFacilitator.department}
                    onChange={(e) => setNewFacilitator({ ...newFacilitator, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newFacilitator.experience}
                    onChange={(e) => setNewFacilitator({ ...newFacilitator, experience: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={newFacilitator.specialization}
                    onChange={(e) => setNewFacilitator({ ...newFacilitator, specialization: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Machine Learning, Web Development"
                  />
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Add Facilitator
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagementPage;
