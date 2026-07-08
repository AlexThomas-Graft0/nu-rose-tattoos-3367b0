'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface GalleryImage {
  id: string;
  category: 'Tattoo' | 'Piercing' | 'Removal';
  image_url: string;
  alt_text: string;
  description: string | null;
  created_at: string;
}

export default function GalleryManager({ onUpdateStats }: { onUpdateStats: () => void }) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [category, setCategory] = useState<'Tattoo' | 'Piercing' | 'Removal'>('Tattoo');
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setImages(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setCategory('Tattoo');
    setImageUrl('');
    setAltText('');
    setDescription('');
    setIsFormOpen(false);
    setError(null);
    setSuccess(null);
  };

  const openEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setCategory(img.category);
    setImageUrl(img.image_url);
    setAltText(img.alt_text);
    setDescription(img.description || '');
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    if (!imageUrl.startsWith('https://')) {
      setError('Image URL must start with https://');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      category,
      image_url: imageUrl,
      alt_text: altText,
      description: description || null,
    };

    try {
      if (editingId) {
        const { error: updateError } = await supabase
          .from('gallery_images')
          .update(payload)
          .eq('id', editingId);
        if (updateError) throw updateError;
        setSuccess('Image updated successfully');
      } else {
        const { error: insertError } = await supabase
          .from('gallery_images')
          .insert([payload]);
        if (insertError) throw insertError;
        setSuccess('Image added successfully');
        onUpdateStats();
      }
      
      await fetchImages();
      setTimeout(() => resetForm(), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save image');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    setError(null);
    try {
      const { error: deleteError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);
        
      if (deleteError) throw deleteError;
      setImages((prev) => prev.filter((img) => img.id !== id));
      onUpdateStats();
    } catch (err: any) {
      setError(err.message || 'Failed to delete image');
    }
  };

  if (isLoading && !isFormOpen && images.length === 0) {
    return <div className="py-12 text-center text-gray-500">Loading gallery...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Gallery Images</h2>
        {!isFormOpen && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Image
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
            {editingId ? 'Edit Image' : 'Add New Image'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (HTTPS only)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (Accessibility)</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="A detailed description of the image"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Style, artist, or context"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
              {isSubmitting ? 'Saving...' : 'Save Image'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col">
            <div className="aspect-square bg-gray-100 relative group overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.image_url} 
                alt={img.alt_text} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Image+Error' }}
              />
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                {img.category}
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 truncate" title={img.alt_text}>
                  {img.alt_text}
                </p>
                {img.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2" title={img.description}>
                    {img.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openEdit(img)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {images.length === 0 && !isFormOpen && (
        <div className="py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          No images in the gallery yet.
        </div>
      )}
    </div>
  );
}