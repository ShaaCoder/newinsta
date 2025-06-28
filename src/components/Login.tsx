import React, { useState } from 'react';
import { Instagram, Zap, BarChart3, Calendar, Users, AlertCircle } from 'lucide-react';
import { instagramApi } from '../services/instagramApi';
import toast from 'react-hot-toast';

interface LoginProps {
  onLogin: (code: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInstagramLogin = async () => {
    setIsLoading(true);
    try {
      const authUrl = await instagramApi.getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to initiate Instagram login');
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Schedule posts at optimal times for maximum engagement'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track performance with detailed insights and metrics'
    },
    {
      icon: Zap,
      title: 'Content Publishing',
      description: 'Publish directly to Instagram with full API integration'
    },
    {
      icon: Users,
      title: 'Audience Insights',
      description: 'Understand your audience demographics and behavior'
    }
  ];

  const requirements = [
    'Instagram Business or Creator Account',
    'Connected to a Facebook Page',
    'Facebook App with Instagram Business API access',
    'Approved permissions for content publishing'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-600">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <Instagram className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              InstaAuto Pro
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Professional Instagram Business API Integration
            </p>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              Advanced Instagram automation with full Business API access for content publishing, 
              analytics, and audience management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Features */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Professional Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-purple-200 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Requirements */}
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-lg font-semibold text-white">Requirements</h3>
                </div>
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3 text-purple-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Login Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Connect Your Business Account
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-purple-100">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm">Full Instagram Business API access</span>
                </div>
                <div className="flex items-center space-x-3 text-purple-100">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm">Direct content publishing</span>
                </div>
                <div className="flex items-center space-x-3 text-purple-100">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm">Advanced analytics & insights</span>
                </div>
                <div className="flex items-center space-x-3 text-purple-100">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm">Comment & message management</span>
                </div>
              </div>

              <button
                onClick={handleInstagramLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Instagram className="w-5 h-5" />
                    <span>Connect Business Account</span>
                  </>
                )}
              </button>

              <div className="mt-6 p-4 bg-blue-500 bg-opacity-20 rounded-lg border border-blue-400 border-opacity-30">
                <p className="text-sm text-blue-100 text-center">
                  <strong>Note:</strong> This connects to Instagram Business API with advanced permissions for professional use.
                </p>
              </div>

              <p className="text-sm text-purple-200 text-center mt-4">
                By connecting your account, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-purple-300">
              Trusted by 10,000+ businesses and content creators worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
