import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types/auth';

interface SidebarProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAutoHidden, setIsAutoHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-hide sidebar after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const resetAutoHide = () => {
      setIsAutoHidden(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!isHovering && isOpen) {
          setIsAutoHidden(true);
        }
      }, 3000); // Auto-hide after 3 seconds
    };

    if (isOpen) {
      resetAutoHide();
    }

    return () => clearTimeout(timeout);
  }, [isOpen, isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsAutoHidden(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Don't auto-hide immediately when user leaves
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // Auto-hide after navigation
    setTimeout(() => {
      setIsAutoHidden(true);
    }, 1000);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isAutoHidden && !isHovering ? 'w-12' : 'w-64'}
          lg:relative lg:translate-x-0
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className={`font-bold text-lg text-gray-900 ${isAutoHidden && !isHovering ? 'hidden' : 'block'}`}>
              Menu
            </h2>
            <button
              onClick={onToggle}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className={`p-4 border-b border-gray-200 ${isAutoHidden && !isHovering ? 'hidden' : 'block'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className={isAutoHidden && !isHovering ? 'hidden' : 'block'}>
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {/* Chat */}
            <li>
              <button
                onClick={() => handleNavigation('/')}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                  ${isActive('/') 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className={isAutoHidden && !isHovering ? 'hidden' : 'block'}>Chat</span>
              </button>
            </li>

            {/* Admin Menu Items */}
            {user?.role === 'admin' && (
              <>
                <li className={isAutoHidden && !isHovering ? 'hidden' : 'block'}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin
                  </div>
                </li>
                
                {/* Knowledge Manager */}
                <li>
                  <button
                    onClick={() => handleNavigation('/knowledge-manager')}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                      ${isActive('/knowledge-manager') 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className={isAutoHidden && !isHovering ? 'hidden' : 'block'}>Knowledge</span>
                  </button>
                </li>

                {/* Manage Organization */}
                <li>
                  <button
                    onClick={() => handleNavigation('/manage-organization')}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                      ${isActive('/manage-organization') 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className={isAutoHidden && !isHovering ? 'hidden' : 'block'}>Organizations</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 ${isAutoHidden && !isHovering ? 'hidden' : 'block'}`}>
          <button
            onClick={() => {
              // Handle logout
              window.location.reload();
            }}
            className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className={isAutoHidden && !isHovering ? 'hidden' : 'block'}>Logout</span>
          </button>
        </div>

        {/* Auto-hide indicator */}
        {isAutoHidden && !isHovering && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <div className="w-1 h-8 bg-blue-500 rounded-r-full"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
