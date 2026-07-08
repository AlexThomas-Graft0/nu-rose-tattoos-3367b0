'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import EnquiriesManager from '@/components/dashboard/EnquiriesManager';
import GalleryManager from '@/components/dashboard/GalleryManager';
import AftercareManager from '@/components/dashboard/AftercareManager';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'gallery' | 'aftercare'>('enquiries');
  const [stats, setStats] = useState({
    enquiries: 0,
    gallery: 0,
    aftercare: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const [enquiriesRes, galleryRes, aftercareRes] = await Promise.all([
        supabase.from('enquiries').select('id', { count: 'exact', head: true }),
        supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
        supabase.from('aftercare_guides').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        enquiries: enquiriesRes.count || 0,
        gallery: galleryRes.count || 0,
        aftercare: aftercareRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold font-sans tracking-tight">Nu Rose Owner Dashboard</h1>
            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-md font-medium">Admin</span>
          </div>
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            ← Back to Site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <span className="text-sm font-medium text-gray-500 mb-1">Total Enquiries</span>
            <span className="text-3xl font-bold text-gray-900">{isLoading ? '-' : stats.enquiries}</span>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <span className="text-sm font-medium text-gray-500 mb-1">Gallery Images</span>
            <span className="text-3xl font-bold text-gray-900">{isLoading ? '-' : stats.gallery}</span>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <span className="text-sm font-medium text-gray-500 mb-1">Aftercare Guides</span>
            <span className="text-3xl font-bold text-gray-900">{isLoading ? '-' : stats.aftercare}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 bg-gray-50/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'enquiries'
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Manage Enquiries
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'gallery'
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Manage Gallery
            </button>
            <button
              onClick={() => setActiveTab('aftercare')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'aftercare'
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Manage Aftercare Guides
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'enquiries' && <EnquiriesManager onUpdateStats={fetchStats} />}
            {activeTab === 'gallery' && <GalleryManager onUpdateStats={fetchStats} />}
            {activeTab === 'aftercare' && <AftercareManager onUpdateStats={fetchStats} />}
          </div>
        </div>
      </main>
    </div>
  );
}