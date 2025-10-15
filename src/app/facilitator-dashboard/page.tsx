'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthStore } from '@/store/authStore';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Wrench, 
  ClipboardList,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Package,
  AlertCircle
} from 'lucide-react';

interface DashboardStats {
  totalLabs: number;
  totalGigs: number;
  openGigs: number;
  totalProposals: number;
  approvedProposals: number;
  totalEquipment: number;
  availableEquipment: number;
  pendingRequests: number;
}

interface Lab {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  capacity: number;
  thumbnail_url?: string;
}

interface Gig {
  id: string;
  title: string;
  description: string;
  status: string;
  application_deadline: string;
  max_applications: number;
  created_at: string;
  labs: {
    name: string;
    category: string;
  };
  proposals: any[];
}

interface EquipmentRequest {
  id: string;
  status: string;
  purpose: string;
  start_date: string;
  end_date: string;
  quantity: number;
  created_at: string;
  equipment: {
    name: string;
    serial_number: string;
    category: string;
  };
  users: {
    name: string;
    email: string;
  };
}

const FacilitatorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [equipmentRequests, setEquipmentRequests] = useState<EquipmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`/api/facilitator/dashboard?email=${encodeURIComponent(user?.email || '')}`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data.stats);
        setLabs(data.data.labs);
        setGigs(data.data.gigs);
        setEquipmentRequests(data.data.equipmentRequests);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'gigs', label: 'Gigs', icon: Briefcase },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
    { id: 'requests', label: 'Equipment Requests', icon: ClipboardList },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'requested': return 'text-yellow-600 bg-yellow-100';
      case 'in_use': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Labs</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalLabs || 0}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Gigs</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.openGigs || 0}</p>
            </div>
            <Briefcase className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Proposals</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalProposals || 0}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.pendingRequests || 0}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Assigned Labs */}
      {labs.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Your Assigned Labs</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {labs.map((lab) => (
                <div key={lab.id} className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900">{lab.name}</h4>
                  <p className="text-sm text-gray-600">{lab.category}</p>
                  <p className="text-xs text-gray-500 mt-1">{lab.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Capacity: {lab.capacity}</span>
                    {lab.location && <span className="ml-2">Location: {lab.location}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Gigs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Gigs</h3>
            <Link href="/facilitator-dashboard/gigs" className="text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {gigs.slice(0, 5).map((gig) => (
              <div key={gig.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{gig.title}</h4>
                  <p className="text-sm text-gray-600">{gig.labs.name}</p>
                  <p className="text-sm text-gray-500">{gig.proposals.length} proposals</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                    {gig.status}
                  </span>
                  <Link href={`/facilitator/gigs/${gig.id}`} className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Equipment Requests */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Equipment Requests</h3>
            <Link href="/facilitator-dashboard/requests" className="text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {equipmentRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{request.equipment.name}</h4>
                  <p className="text-sm text-gray-600">Requested by: {request.users.name}</p>
                  <p className="text-sm text-gray-500">Purpose: {request.purpose}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGigs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gigs Management</h2>
        <Link href="/facilitator-dashboard/gigs/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create New Gig</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="space-y-4">
            {gigs.map((gig) => (
              <div key={gig.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{gig.title}</h4>
                  <p className="text-sm text-gray-600">{gig.labs.name} • {gig.labs.category}</p>
                  <p className="text-sm text-gray-500">
                    {gig.proposals.length} proposals • 
                    {gig.proposals.filter(p => p.status === 'approved').length} approved
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                    {gig.status}
                  </span>
                  <Link href={`/facilitator-dashboard/gigs/${gig.id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <Link href="/facilitator-dashboard/team" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Manage Team</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <p className="text-gray-600">Team management features are available in the dedicated team page.</p>
          <Link href="/facilitator-dashboard/team" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Go to Team Management →
          </Link>
        </div>
      </div>
    </div>
  );

  const renderEquipment = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Equipment Management</h2>
        <Link href="/facilitator-dashboard/equipment" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Manage Equipment</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <p className="text-gray-600">Equipment management features are available in the dedicated equipment page.</p>
          <Link href="/facilitator-dashboard/equipment" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Go to Equipment Management →
          </Link>
        </div>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Equipment Requests</h2>
        <Link href="/facilitator-dashboard/requests" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Manage Requests</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <p className="text-gray-600">Equipment request management features are available in the dedicated requests page.</p>
          <Link href="/facilitator-dashboard/requests" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Go to Equipment Requests →
          </Link>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900">Facilitator Dashboard</h1>
            {user && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs capitalize">{user.role}</p>
                {labs.length > 0 && (
                  <p className="text-xs text-blue-600 mt-1">
                    {labs.length} lab{labs.length > 1 ? 's' : ''} assigned
                  </p>
                )}
              </div>
            )}
          </div>
          <nav className="mt-6">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                item.id === 'gigs' ? (
                  <Link
                    href="/facilitator-dashboard/gigs"
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                ) : item.id === 'team' ? (
                  <Link
                    href="/facilitator-dashboard/team"
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                ) : item.id === 'equipment' ? (
                  <Link
                    href="/facilitator-dashboard/equipment"
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                ) : item.id === 'requests' ? (
                  <Link
                    href="/facilitator-dashboard/requests"
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                )
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'gigs' && renderGigs()}
          {activeTab === 'team' && renderTeam()}
          {activeTab === 'equipment' && renderEquipment()}
          {activeTab === 'requests' && renderRequests()}
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default FacilitatorDashboard;
