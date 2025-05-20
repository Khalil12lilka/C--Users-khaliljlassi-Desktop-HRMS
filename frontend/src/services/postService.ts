import { API_URL } from '../config';
import { Post, Comment } from '../types/post';

const API_ENDPOINTS = {
  posts: '/api/posts',
};

const fetchApi = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }

  return response.json();
};

export const postService = {
  getPosts: () => fetchApi<Post[]>(`${API_ENDPOINTS.posts}`),
  
  createPost: (data: { content: string }) => fetchApi<Post>(`${API_ENDPOINTS.posts}`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  updatePost: (postId: string, data: { content: string }) => fetchApi<Post>(`${API_ENDPOINTS.posts}/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  deletePost: (postId: string) => fetchApi<void>(`${API_ENDPOINTS.posts}/${postId}`, {
    method: 'DELETE'
  }),
  
  getComments: (postId: string) => fetchApi<Comment[]>(`${API_ENDPOINTS.posts}/${postId}/comments`),
  
  addComment: (postId: string, content: string) => fetchApi<Comment>(`${API_ENDPOINTS.posts}/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content })
  }),
  
  addReaction: (postId: string, type: string) => fetchApi<void>(`${API_ENDPOINTS.posts}/${postId}/reactions`, {
    method: 'POST',
    body: JSON.stringify({ type })
  })
}; 