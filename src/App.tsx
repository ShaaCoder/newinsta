import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SchedulePost from './components/SchedulePost';
import MediaLibrary from './components/MediaLibrary';
import Analytics from './components/Analytics';

function AppContent() {
  const { isAuthenticated, login, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Check for Instagram callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code && !isAuthenticated) {
      login(code).catch(console.error);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [login, isAuthenticated]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'schedule':
        return <SchedulePost />;
      case 'media':
        return <MediaLibrary />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Dashboard />; // Reuse dashboard for now
      case 'settings':
        return <Dashboard />; // Reuse dashboard for now
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;