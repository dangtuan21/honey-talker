import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import Sidebar from '../components/Sidebar';
import { User } from '../types/auth';
import { DEMO_USERS, Role, userStorage } from '../common/constants';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [user, setUser] = useState<User | null>(userStorage.getUser() || DEMO_USERS.GUEST);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    setUser(DEMO_USERS.GUEST);
    userStorage.clearUser();
    // Stay on home page (already there)
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Only show for non-guest users */}
      {user?.role !== Role.GUEST && (
        <Sidebar user={user} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
      )}
      
      {/* Main Content - Full width for guests, with sidebar for logged in users */}
      <div className={`${user?.role === Role.GUEST ? 'w-full' : 'flex-1'} flex flex-col`}>
        {/* Chat Interface - Show for all users including guests */}
        <div className="flex-1 flex flex-col">
          <ChatInterface 
            user={user} 
            onLogout={handleLogout}
            showSidebar={false} // ChatInterface should not show its own sidebar when HomePage manages it
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
