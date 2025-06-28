import React, { useState, useEffect } from 'react';
import { Grid, List, Search, Filter, Download, Eye } from 'lucide-react';
import { InstagramMedia } from '../types/instagram';
import { instagramApi } from '../services/instagramApi';

const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<InstagramMedia | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaData = await instagramApi.getUserMedia(50);
        setMedia(mediaData);
      } catch (error) {
        console.error('Error fetching media:', error);
        // Mock data for demo
        setMedia([
          {
            id: '1',
            mediaType: 'IMAGE',
            mediaUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
            permalink: 'https://instagram.com/p/example1',
            caption: 'Beautiful sunset at the beach 🌅',
            timestamp: '2024-01-15T18:30:00Z',
            likesCount: 234,
            commentsCount: 12
          },
          {
            id: '2',
            mediaType: 'IMAGE',
            mediaUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
            permalink: 'https://instagram.com/p/example2',
            caption: 'Coffee and productivity ☕',
            timestamp: '2024-01-14T09:15:00Z',
            likesCount: 156,
            commentsCount: 8
          },
          {
            id: '3',
            mediaType: 'IMAGE',
            mediaUrl: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg',
            permalink: 'https://instagram.com/p/example3',
            caption: 'Urban architecture inspiration 🏢',
            timestamp: '2024-01-13T14:45:00Z',
            likesCount: 189,
            commentsCount: 15
          },
          {
            id: '4',
            mediaType: 'IMAGE',
            mediaUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
            permalink: 'https://instagram.com/p/example4',
            caption: 'Nature therapy 🌿',
            timestamp: '2024-01-12T11:20:00Z',
            likesCount: 298,
            commentsCount: 23
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const filteredMedia = media.filter(item =>
    item.caption?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage your Instagram media</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedMedia(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.mediaUrl}
                    alt={item.caption || 'Instagram post'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
                    <Eye className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">View Details</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {item.caption || 'No caption'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(item.timestamp)}</span>
                    <div className="flex items-center space-x-3">
                      <span>❤️ {item.likesCount}</span>
                      <span>💬 {item.commentsCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedMedia(item)}
              >
                <img
                  src={item.mediaUrl}
                  alt={item.caption || 'Instagram post'}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.caption || 'No caption'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(item.timestamp)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>❤️ {item.likesCount}</span>
                  <span>💬 {item.commentsCount}</span>
                  <button className="text-purple-600 hover:text-purple-700">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Media Details</h3>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <img
                src={selectedMedia.mediaUrl}
                alt={selectedMedia.caption || 'Instagram post'}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Caption</h4>
                  <p className="text-gray-600">{selectedMedia.caption || 'No caption'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Likes</h4>
                    <p className="text-gray-600">{selectedMedia.likesCount}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Comments</h4>
                    <p className="text-gray-600">{selectedMedia.commentsCount}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Posted</h4>
                  <p className="text-gray-600">{formatDate(selectedMedia.timestamp)}</p>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={selectedMedia.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-purple-500 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    View on Instagram
                  </a>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;