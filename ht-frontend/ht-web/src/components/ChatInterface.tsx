import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { User } from '../types/auth';
import { DEMO_USERS, Role, userStorage } from '../common/constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatResponse {
  reply: string;
  model: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
  retrieved_chunks: number;
}

interface ChatInterfaceProps {
  user?: User | null;
  onLogout?: () => void;
  showSidebar?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user: propUser, onLogout: propOnLogout, showSidebar = true }) => {
  // Get user from sessionStorage, fallback to guest for development
  const storedUser = userStorage.getUser();
  const guestUser: User = {
    id: DEMO_USERS.GUEST.id,
    username: DEMO_USERS.GUEST.username,
    role: Role.GUEST
  };
  
  const [user, setUser] = useState<User | null>(propUser || storedUser || guestUser);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orgId, setOrgId] = useState('test_org');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Sync user state with prop changes
  useEffect(() => {
    if (propUser) {
      setUser(propUser);
    } else {
      // If no prop user, check sessionStorage
      const currentUser = userStorage.getUser();
      setUser(currentUser || guestUser);
    }
  }, [propUser]);

  const handleLogout = () => {
    setUser(null);
    setMessages([]);
    userStorage.clearUser();
    // Use prop logout function if provided, otherwise default behavior
    if (propOnLogout) {
      propOnLogout();
    } else {
      // Navigate to home page instead of login
      window.location.href = '/';
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8020/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          org_id: orgId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Show login page only if user is null (not for guests)
  if (!user) {
    return (
      <div className="flex h-screen bg-gray-50 justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to Chat</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access the chat interface.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Only show if enabled and for non-guest users */}
      {showSidebar && user.role !== Role.GUEST && (
        <Sidebar user={user} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
      )}

      {/* Main Content - Full width if no sidebar, with sidebar otherwise */}
      <div className={`${!showSidebar || user.role === Role.GUEST ? 'w-full' : 'flex-1'} flex flex-col`}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Menu Toggle Button - Only show if sidebar is enabled and for non-guest users */}
                {showSidebar && user.role !== Role.GUEST && (
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                )}
              </div>
              
              {user && user.role !== Role.GUEST && (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  {/* Logout button - Show when sidebar is disabled */}
                  {!showSidebar && (
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
              
              {/* Login button - Show for guest users */}
              {user && user.role === Role.GUEST && (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Organization Selector */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="max-w-4xl mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input
                type="text"
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter organization ID"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p className="text-lg">Welcome to Honey Talker AI!</p>
                  <p className="text-sm mt-2">Ask me anything about university services, facilities, or policies.</p>
                  {user.role === Role.ADMIN && (
                    <p className="text-sm mt-2 text-green-600">As an admin, you can manage knowledge base and organizations using the sidebar menu.</p>
                  )}
                  {user.role === Role.GUEST && (
                    <p className="text-sm mt-2 text-blue-600">You're chatting as a guest. Login to save your conversation history and access personalized features.</p>
                  )}
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-lg px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-200 px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your message..."
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
