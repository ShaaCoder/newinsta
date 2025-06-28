import React, { useState } from 'react';
import { Calendar, Clock, Image, Tag, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const SchedulePost: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleSchedulePost = async () => {
    if (!selectedFiles.length || !caption || !scheduledDate || !scheduledTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Post scheduled successfully!');
      
      // Reset form
      setSelectedFiles([]);
      setCaption('');
      setScheduledDate('');
      setScheduledTime('');
      setHashtags('');
    } catch (error) {
      toast.error('Failed to schedule post');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schedule Post</h1>
        <p className="text-gray-600">Create and schedule your Instagram posts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Post Composer */}
        <div className="space-y-6">
          {/* Media Upload */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Image className="w-5 h-5 mr-2" />
              Media
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload" className="cursor-pointer">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Click to upload images or videos
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, MP4 up to 10MB
                </p>
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">{file.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Caption</h3>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your caption here..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={2200}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {caption.length}/2200 characters
              </span>
            </div>
          </div>

          {/* Hashtags */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Hashtags
            </h3>
            <textarea
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#photography #nature #sunset"
              className="w-full h-20 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">
              Separate hashtags with spaces. Max 30 hashtags.
            </p>
          </div>
        </div>

        {/* Schedule Settings */}
        <div className="space-y-6">
          {/* Date & Time */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <Clock className="w-4 h-4 inline mr-1" />
                Best time to post: 6-9 PM on weekdays
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            
            <div className="border border-gray-200 rounded-lg p-4 max-w-sm mx-auto">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="font-semibold text-sm">Your Username</span>
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(selectedFiles[0])}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                {caption && (
                  <p className="text-sm">
                    <span className="font-semibold">Your Username</span> {caption}
                  </p>
                )}
                {hashtags && (
                  <p className="text-sm text-blue-600">{hashtags}</p>
                )}
              </div>
            </div>
          </div>

          {/* Schedule Button */}
          <button
            onClick={handleSchedulePost}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePost;