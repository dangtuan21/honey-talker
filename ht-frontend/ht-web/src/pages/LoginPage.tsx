import React, { useState } from 'react';
import { LoginCredentials, User } from '../types/auth';
import { DEMO_USERS, Role, userStorage } from '../common/constants';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Hardcoded credentials validation using constants
    if (credentials.username === DEMO_USERS.ADMIN.username && credentials.password === DEMO_USERS.ADMIN.password) {
      const adminUser: User = {
        id: DEMO_USERS.ADMIN.id,
        username: DEMO_USERS.ADMIN.username,
        role: Role.ADMIN
      };
      userStorage.setUser(adminUser);
      // Redirect to chat after successful login
      window.location.href = '/';
    } else if (credentials.username === DEMO_USERS.USER.username && credentials.password === DEMO_USERS.USER.password) {
      const regularUser: User = {
        id: DEMO_USERS.USER.id,
        username: DEMO_USERS.USER.username,
        role: Role.USER
      };
      userStorage.setUser(regularUser);
      // Redirect to chat after successful login
      window.location.href = '/';
    } else {
      setError(`Invalid credentials. Try ${DEMO_USERS.ADMIN.username}/${DEMO_USERS.ADMIN.password} or ${DEMO_USERS.USER.username}/${DEMO_USERS.USER.password}`);
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Honey Talker AI</h1>
          <p className="mt-2 text-gray-600">University Assistant Chat System</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={credentials.username}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 font-medium mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-500">
              <div><span className="font-medium">Admin:</span> {DEMO_USERS.ADMIN.username} / {DEMO_USERS.ADMIN.password}</div>
              <div><span className="font-medium">User:</span> {DEMO_USERS.USER.username} / {DEMO_USERS.USER.password}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Welcome to Honey Talker AI - Your university assistant
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Please log in to access the chat system
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
