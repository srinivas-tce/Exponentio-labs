'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ExternalLink, Eye, Cpu, Bot, Wifi, Lightbulb, Code, Zap, Shield, Users, RocketIcon, CheckCircle, ArrowRight } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  serial_number: string;
  category: string;
  status: string;
  condition: string;
  purchase_date: string;
  cost: number;
  image_url?: string;
  lab_id: string;
  lab_name: string;
  lab_description: string;
  lab_location: string;
  lab_capacity: number;
  assigned_to_user?: {
    name: string;
  } | null;
  last_checked_at: string;
  created_at: string;
  updated_at: string;
}

interface Lab {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  capacity: number;
  thumbnail_url: string;
  equipment: Equipment[];
  icon: React.ReactNode;
}

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lab configurations
  const labConfigs = [
    {
      id: 'fullstack',
      name: 'Full Stack Development Lab',
      icon: <Code className="w-5 h-5 text-blue-600" />,
      apiEndpoint: '/api/labs/fullstack'
    },
    {
      id: 'agentic-ai',
      name: 'Agentic AI Development Lab',
      icon: <Bot className="w-5 h-5 text-purple-600" />,
      apiEndpoint: '/api/labs/agentic-ai'
    },
    {
      id: 'ar-vr',
      name: 'AR/VR & Metaverse Lab',
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      apiEndpoint: '/api/labs/ar-vr'
    },
    {
      id: 'embedded-iot',
      name: 'Embedded IoT Development Lab',
      icon: <Wifi className="w-5 h-5 text-cyan-600" />,
      apiEndpoint: '/api/labs/embedded-iot'
    },
    {
      id: 'idea-labs',
      name: 'Innovation & Idea Labs',
      icon: <Lightbulb className="w-5 h-5 text-yellow-600" />,
      apiEndpoint: '/api/labs/idea-labs'
    },
    {
      id: 'robotics',
      name: 'Robotics & Automation Lab',
      icon: <Zap className="w-5 h-5 text-red-600" />,
      apiEndpoint: '/api/labs/robotics'
    }
  ];

  useEffect(() => {
    const fetchLabsData = async () => {
      try {
        const labPromises = labConfigs.map(async (config) => {
          const response = await fetch(config.apiEndpoint);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${config.name}`);
          }
          const data = await response.json();
          
          return {
            id: config.id,
            name: config.name,
            description: data.lab.description,
            category: data.lab.category,
            location: data.lab.location,
            capacity: data.lab.capacity,
            thumbnail_url: data.lab.thumbnail_url,
            equipment: data.equipment.map((item: any) => ({
              id: item.id,
              name: item.name,
              serial_number: item.serial_number,
              category: item.category,
              status: item.status,
              condition: item.condition,
              purchase_date: item.purchase_date,
              cost: item.cost,
              image_url: item.image_url,
              lab_id: item.lab_id,
              lab_name: config.name,
              lab_description: data.lab.description,
              lab_location: data.lab.location,
              lab_capacity: data.lab.capacity,
              assigned_to_user: item.assigned_to_user,
              last_checked_at: item.last_checked_at,
              created_at: item.created_at,
              updated_at: item.updated_at
            })),
            icon: config.icon
          };
        });

        const labData = await Promise.all(labPromises);
        setLabs(labData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch lab data');
      } finally {
        setLoading(false);
      }
    };

    fetchLabsData();
  }, []);

  // Get all equipment for search
  const allEquipment = labs.flatMap(lab => lab.equipment);

  // Filter equipment based on search and lab
  const filteredEquipment = allEquipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.lab_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedLab === 'all') return matchesSearch;
    
    const lab = labs.find(l => l.id === selectedLab);
    return matchesSearch && lab && lab.equipment.includes(item);
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'requested':
        return 'text-yellow-600 bg-yellow-100';
      case 'allocated':
        return 'text-blue-600 bg-blue-100';
      case 'under_maintenance':
        return 'text-orange-600 bg-orange-100';
      case 'retired':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading equipment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Shield className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Equipment</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Explore Our <span className="text-blue-600">Infrastructure</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              State-of-the-art lab equipment and facilities across 6 specialized domains. 
              From cutting-edge AR/VR technology to advanced robotics and AI workstations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {labs.map((lab) => (
                <div key={lab.id} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  {lab.icon}
                  <span className="text-sm font-medium text-gray-700">{lab.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lab Categories Overview */}
      <section className="hidden py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Lab Facilities</span>
            </h2>
            <p className="text-xl text-gray-600">
              Specialized laboratories equipped with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labs.map((lab) => (
              <div key={lab.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  {lab.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{lab.name}</h3>
                  <p className="text-gray-600 mb-4">{lab.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{lab.location}</span>
                    <span>{lab.equipment.length} equipment items</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedLab}
                onChange={(e) => setSelectedLab(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Labs</option>
                {labs.map((lab) => (
                  <option key={lab.id} value={lab.id}>{lab.name}</option>
                ))}
              </select>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Available Equipment
            </h2>
            <p className="text-gray-600">
              {filteredEquipment.length} equipment items found
            </p>
          </div>

          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredEquipment.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center" style={{ display: item.image_url ? 'none' : 'flex' }}>
                    <Zap className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{item.category}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Serial: {item.serial_number}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Lab: {item.lab_name}
                    </span>
                    <div className="flex gap-2">
                      <Link 
                        href={`/equipment/${item.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredEquipment.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No equipment found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or lab filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Access Our Infrastructure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us to learn more about our lab facilities and equipment availability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Lab Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;