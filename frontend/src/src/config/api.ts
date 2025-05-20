const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const API_ENDPOINTS = {
  employees: `${API_URL}/employees`,
  absences: `${API_URL}/absences`,
  performance: `${API_URL}/performance`,
  reports: `${API_URL}/reports`
};
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};