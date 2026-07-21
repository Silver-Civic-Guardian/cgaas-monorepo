import React, { useState, useEffect } from 'react';
import ChatUI from './components/ChatUI';
import Dashboard from './components/Dashboard';

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-800 text-white p-2 flex gap-4 justify-center text-sm">
        <button onClick={() => navigate('/')} className={currentRoute === '/' ? 'font-bold text-blue-400' : 'hover:text-gray-300'}>
          Citizen Chat
        </button>
        <button onClick={() => navigate('/dashboard')} className={currentRoute === '/dashboard' ? 'font-bold text-blue-400' : 'hover:text-gray-300'}>
          Admin Dashboard
        </button>
      </div>

      {currentRoute === '/dashboard' ? <Dashboard /> : <ChatUI />}
    </div>
  );
}

export default App;
