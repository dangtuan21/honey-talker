// User Roles
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export type UserRole = Role;

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3020',
  ORGANIZATIONS: '/organizations',
  KNOWLEDGE: '/knowledge',
  CHAT: '/chat',
  LOGIN: '/login'
} as const;

// Application Constants
export const APP_CONFIG = {
  APP_NAME: 'Honey Talker AI',
  APP_DESCRIPTION: 'University Assistant Chat System',
  DEFAULT_ORG_ID: 'test_org'
} as const;

// Demo Users
export const DEMO_USERS = {
  ADMIN: {
    id: 'admin-1',
    username: 'admin1',
    password: 'admin1',
    role: Role.ADMIN
  },
  USER: {
    id: 'user-1',
    username: 'user1',
    password: 'user1',
    role: Role.USER
  },
  GUEST: {
    id: 'guest-1',
    username: 'guest',
    password: '',
    role: Role.GUEST
  }
} as const;

// User State Management
export const USER_STORAGE_KEY = 'honey_talker_user';

export const userStorage = {
  setUser: (user: any) => {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },
  
  getUser: () => {
    const stored = sessionStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },
  
  clearUser: () => {
    sessionStorage.removeItem(USER_STORAGE_KEY);
  }
};
