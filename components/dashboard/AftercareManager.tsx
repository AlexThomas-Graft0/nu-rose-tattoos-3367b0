'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface AftercareGuide {
  id: string;
  title: string;
  category: 'Tattoo' | 'Piercing' | 'Removal';
  content: string;
  created_at: string;
  updated_at: string;
}

export default function AftercareManager({ onUpdateStats }: { onUpdateStats: () => void }) {
  const [guides, setGuides] = useState<AftercareGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Tattoo' | 'Piercing' | 'Removal'>('Tattoo');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('aftercare_guides')
        .select('*')
        .order('category', { ascending: true });

      if (fetchError) throw fetchError;
      setGuides(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load guides');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Tattoo');
    setContent('');
    setIsFormOpen(false);
    setError(null);
    setSuccess(null);
  };

  const openEdit = (guide: AftercareGuide) => {
    setEditingId(guide.id);
    setTitle(guide.title);
    setCategory(guide.category);
    setContent(guide.content);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const payload = {
      title,
      category,
      content,
      updated_at: new Date().toISOString()
    };

    try {
      if (editingId) {
        const { error: updateError } = await supabase
          .from('aftercare_guides')
          .update(payload)
          .eq('id', editingId);
        if (updateError) throw updateError;
        setSuccess('Guide updated successfully');
      } else {
        const { error: insertError } = await supabase
          .from('aftercare_guides')
          .insert([{ ...payload, created_at: payload.updated_at }]);
        if (insertError) throw insertError;
        setSuccess('Guide added successfully');
        onUpdateStats();
      }
      
      await fetchGuides();
      setTimeout(() => resetForm(), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save guide');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this guide?')) return;
    
    setError(null);
    try {
      const { error: deleteError } = await supabase
        .from('aftercare_guides')
        .delete()
        .eq('id', id);
        
      if (deleteError) throw deleteError;
      setGuides((prev) => prev.filter((g) => g.id !== id));
      onUpdateStats();
    } catch (err: any) {
      setError(err.message || 'Failed to delete guide');
    }
  };

  if (isLoading && !isFormOpen && guides.length === 0) {
    return <div className="py-12 text-center text-gray-500">Loading guides...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Aftercare Guides</h2>
        {!isFormOpen && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Guide
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-md text-sm">
          {success}
        </div>
      )}

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">
            {editingId ? 'Edit Guide' : 'Add New Guide'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Standard Tattoo Aftercare"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Tattoo">Tattoo</option>
                <option value="Piercing">Piercing</option>
                <option value="Removal">Removal</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown or plain text)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Step-by-step instructions..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Guide'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {guides.map((guide) => (
          <div key={guide.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {guide.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-wrap">
                {guide.content}
              </p>
            </div>
            
            <div className="flex items-center gap-4 shrink-0 md:flex-col md:items-end border-t border-gray-100 md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0">
              <button
                onClick={() => openEdit(guide)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Edit Guide
              </button>
              <button
                onClick={() => handleDelete(guide.id)}
                className="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {guides.length === 0 && !isFormOpen && (
        <div className="py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          No aftercare guides created yet.
        </div>
      )}
    </div>
  );
}