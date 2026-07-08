'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Enquiry {
  id: string;
  client_name: string;
  email: string;
  phone: string | null;
  service_type: 'Tattoo' | 'Piercing' | 'Removal' | 'General';
  description: string;
  reference_image_url: string | null;
  status: 'New' | 'Reviewed' | 'Contacted' | 'Archived';
  created_at: string;
}

export default function EnquiriesManager({ onUpdateStats }: { onUpdateStats: () => void }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setEnquiries(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: Enquiry['status']) => {
    setUpdatingId(id);
    setError(null);
    try {
      const { error: updateError } = await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (updateError) throw updateError;
      
      setEnquiries((prev) =>
        prev.map((enq) => (enq.id === id ? { ...enq, status: newStatus } : enq))
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'Contacted': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="py-12 text-center text-gray-500">Loading enquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Recent Enquiries</h2>
        <button onClick={fetchEnquiries} className="text-sm text-blue-600 hover:underline">
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {enquiries.length === 0 ? (
        <div className="py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          No enquiries found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{enq.client_name}</div>
                    <div className="text-gray-500">{enq.email}</div>
                    {enq.phone && <div className="text-gray-500">{enq.phone}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {enq.service_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs text-gray-600 truncate" title={enq.description}>
                      {enq.description}
                    </div>
                    {enq.reference_image_url && (
                      <a 
                        href={enq.reference_image_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-600 hover:underline text-xs mt-1 inline-block"
                      >
                        View Reference
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={enq.status}
                      onChange={(e) => updateStatus(enq.id, e.target.value as Enquiry['status'])}
                      disabled={updatingId === enq.id}
                      className={`text-xs font-medium rounded-full px-3 py-1 border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none ${getStatusColor(enq.status)} ${updatingId === enq.id ? 'opacity-50' : ''}`}
                    >
                      <option value="New">New</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                    {new Date(enq.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}