const API_BASE_URL = 'http://localhost:5000'; // Backend URL

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  console.log('API Request:', {
    url: `${API_BASE_URL}${endpoint}`,
    method: options.method || 'GET',
    headers: options.headers,
  });

  const token = localStorage.getItem('token');
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    console.log('API Response status:', response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('API Error:', error);
      throw new Error(error.message || 'An error occurred');
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}; 