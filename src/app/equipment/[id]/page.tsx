'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, DollarSign, CheckCircle, AlertCircle, User, Building, Zap, Shield, Award, ExternalLink } from 'lucide-react';

interface EquipmentDetails {
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

const EquipmentDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const equipmentId = params.id as string;
  
  const [equipment, setEquipment] = useState<EquipmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Request form state
  const [requestForm, setRequestForm] = useState({
    purpose: '',
    start_date: '',
    end_date: '',
    quantity: 1
  });

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const response = await fetch(`/api/equipment/${equipmentId}`);
        if (!response.ok) {
          throw new Error('Equipment not found');
        }
        const data = await response.json();
        setEquipment(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch equipment details');
      } finally {
        setLoading(false);
      }
    };

    if (equipmentId) {
      fetchEquipmentDetails();
    }
  }, [equipmentId]);

  const handleRequestEquipment = async () => {
    if (!equipment) return;
    
    setRequestLoading(true);
    try {
      const response = await fetch('/api/equipment/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          equipment_id: equipment.id,
          purpose: requestForm.purpose,
          start_date: requestForm.start_date,
          end_date: requestForm.end_date,
          quantity: requestForm.quantity
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit equipment request');
      }

      setRequestSuccess(true);
      // Reset form
      setRequestForm({
        purpose: '',
        start_date: '',
        end_date: '',
        quantity: 1
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setRequestLoading(false);
    }
  };

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

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading equipment details...</p>
        </div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Equipment Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested equipment could not be found.'}</p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link
              href="/products"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Equipment Image */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                {equipment.image_url ? (
                  <img 
                    src={equipment.image_url} 
                    alt={equipment.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full flex items-center justify-center" style={{ display: equipment.image_url ? 'none' : 'flex' }}>
                  <Zap className="w-24 h-24 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(equipment.status)}`}>
                  {equipment.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(equipment.condition)}`}>
                  {equipment.condition}
                </span>
              </div>
            </div>

            {/* Equipment Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{equipment.name}</h1>
                <p className="text-xl text-gray-600">{equipment.category}</p>
                <p className="text-sm text-gray-500 mt-2">Serial: {equipment.serial_number}</p>
              </div>

              {/* Lab Information */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  Lab Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-medium">Lab:</span> {equipment.lab_name}</p>
                  <p className="text-gray-700"><span className="font-medium">Location:</span> {equipment.lab_location}</p>
                  <p className="text-gray-700"><span className="font-medium">Capacity:</span> {equipment.lab_capacity} students</p>
                  <p className="text-gray-600 text-sm">{equipment.lab_description}</p>
                </div>
              </div>

              {/* Equipment Specifications */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">Cost: RS. {equipment.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">Purchased: {new Date(equipment.purchase_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">Last Checked: {new Date(equipment.last_checked_at).toLocaleDateString()}</span>
                  </div>
                  {equipment.assigned_to_user && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">Assigned to: {equipment.assigned_to_user.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Equipment Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Request This Equipment
            </h2>
            <p className="text-xl text-gray-600">
              Submit a request to use this equipment for your project
            </p>
          </div>

          {requestSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">Request Submitted Successfully!</h3>
              <p className="text-green-700">Your equipment request has been submitted and will be reviewed by the lab facilitator.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={(e) => { e.preventDefault(); handleRequestEquipment(); }} className="space-y-6">
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Use *
                  </label>
                  <textarea
                    id="purpose"
                    value={requestForm.purpose}
                    onChange={(e) => setRequestForm({ ...requestForm, purpose: e.target.value })}
                    placeholder="Describe how you plan to use this equipment for your project..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="start_date"
                      value={requestForm.start_date}
                      onChange={(e) => setRequestForm({ ...requestForm, start_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="end_date"
                      value={requestForm.end_date}
                      onChange={(e) => setRequestForm({ ...requestForm, end_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max="1"
                      value={requestForm.quantity}
                      onChange={(e) => setRequestForm({ ...requestForm, quantity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <div className="text-sm text-gray-500">
                    * Required fields
                  </div>
                  <button
                    type="submit"
                    disabled={requestLoading || !requestForm.purpose || !requestForm.start_date || !requestForm.end_date}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {requestLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4 mr-2" />
                        Request Equipment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EquipmentDetailsPage;
