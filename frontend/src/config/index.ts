export const API_URL = 'http://localhost:5000';

export const ROLES = {
  ADMIN: 'Admin RH',
  EMPLOYEE: 'Employee',
  MANAGER: 'Manager'
};

export const PRIVACY_OPTIONS = {
  PUBLIC: 'public',
  FRIENDS: 'friends',
  PRIVATE: 'private'
} as const;

export type PrivacyOption = typeof PRIVACY_OPTIONS[keyof typeof PRIVACY_OPTIONS]; 