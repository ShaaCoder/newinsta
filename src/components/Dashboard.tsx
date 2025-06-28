import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { Analytics } from '../types/instagram';
import { instagramApi } from '../services/instagramApi';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const engagementData = [
    { name: 'Mon', engagement: 65, reach: 2400 },
    { name: 'Tue', engagement: 59, reach: 1398 },
    { name: 'Wed', engagement: 80, reach: 9800 },
    { name: 'Thu', engagement: 81, reach: 3908 },
    { name: 'Fri', engagement: 56, reach: 4800 },
    { name: 'Sat', engagement: 55, reach: 3800 },
    { name: 'Sun', engagement: 40, reach: 4300 },
  ];

  const postPerformanceData = [
    { name: 'Last Week', posts: 12, likes: 2400, comments: 240 },
    { name: 'This Week', posts: 15, likes: 3200, comments: 320 },
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
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, @{user?.username}!
        </h1>
        <p className="text-purple-100">
          Here's what's happening with your Instagram account today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Followers</p>
              <p className="text-2xl font-bold text-gray-900">
                {user?.followersCount.toLocaleString()}
              </p>
              <p className="text-green-500 text-sm flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Weekly Reach</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.reach.toLocaleString()}
              </p>
              <p className="text-green-500 text-sm flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-500" />
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
                +3.2% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Scheduled Posts</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-blue-500 text-sm flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                Next: Tomorrow 2 PM
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Post Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="likes" fill="#ec4899" />
              <Bar dataKey="comments" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Post published successfully</p>
              <p className="text-xs text-gray-500">Beach sunset photo - 2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Post scheduled</p>
              <p className="text-xs text-gray-500">Coffee shop photo - Tomorrow at 9:00 AM</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Low engagement detected</p>
              <p className="text-xs text-gray-500">Consider posting at peak hours - 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;