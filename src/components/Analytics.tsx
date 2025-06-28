import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart,
  MessageCircle,
  Share,
  Calendar
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Analytics as AnalyticsType } from '../types/instagram';
import { instagramApi } from '../services/instagramApi';

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await instagramApi.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  const engagementData = [
    { name: 'Mon', likes: 400, comments: 24, shares: 12 },
    { name: 'Tue', likes: 300, comments: 18, shares: 8 },
    { name: 'Wed', likes: 600, comments: 35, shares: 20 },
    { name: 'Thu', likes: 800, comments: 42, shares: 25 },
    { name: 'Fri', likes: 450, comments: 28, shares: 15 },
    { name: 'Sat', likes: 350, comments: 22, shares: 10 },
    { name: 'Sun', likes: 280, comments: 16, shares: 8 },
  ];

  const audienceData = [
    { name: '18-24', value: 30, color: '#8b5cf6' },
    { name: '25-34', value: 45, color: '#ec4899' },
    { name: '35-44', value: 20, color: '#f59e0b' },
    { name: '45+', value: 5, color: '#10b981' },
  ];

  const topPostsData = [
    { name: 'Beach Sunset', engagement: 89, reach: 2400 },
    { name: 'Coffee Shop', engagement: 76, reach: 1800 },
    { name: 'City Architecture', engagement: 65, reach: 1600 },
    { name: 'Nature Walk', engagement: 58, reach: 1400 },
    { name: 'Food Photography', engagement: 52, reach: 1200 },
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your Instagram performance</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as 'day' | 'week' | 'month')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="day">Last 7 Days</option>
            <option value="week">Last 4 Weeks</option>
            <option value="month">Last 3 Months</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.reach.toLocaleString()}
              </p>
              <p className="text-green-500 text-sm flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% vs last {selectedPeriod}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Impressions</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.impressions.toLocaleString()}
              </p>
              <p className="text-green-500 text-sm flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.2% vs last {selectedPeriod}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Profile Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.profileViews.toLocaleString()}
              </p>
              <p className="text-green-500 text-sm flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15.3% vs last {selectedPeriod}
              </p>
            </div>
            <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-pink-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.engagementRate.toFixed(1)}%
              </p>
              <p className="text-green-500 text-sm flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3.2% vs last {selectedPeriod}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Over Time */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="likes" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="comments" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Audience Demographics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Audience Age Groups</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {audienceData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Posts</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topPostsData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" stroke="#888" />
            <YAxis dataKey="name" type="category" stroke="#888" width={100} />
            <Tooltip />
            <Bar dataKey="engagement" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Total Likes</h4>
              <p className="text-2xl font-bold text-gray-900">12,847</p>
            </div>
          </div>
          <p className="text-green-500 text-sm">+18% from last week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Total Comments</h4>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
          <p className="text-green-500 text-sm">+22% from last week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Share className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Total Shares</h4>
              <p className="text-2xl font-bold text-gray-900">456</p>
            </div>
          </div>
          <p className="text-green-500 text-sm">+12% from last week</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;