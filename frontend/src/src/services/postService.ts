import { API_ENDPOINTS } from '../config/api';
import { fetchApi } from './api';
import { Post, Comment } from '../types/post';
export const postService = {
  getPosts: () => fetchApi<Post[]>(`${API_ENDPOINTS.posts}`),
  createPost: (data: FormData) => fetchApi<Post>(`${API_ENDPOINTS.posts}`, {
    method: 'POST',
    body: data
  }),
  getComments: (postId: number) => fetchApi<Comment[]>(`${API_ENDPOINTS.posts}/${postId}/comments`),
  addComment: (postId: number, content: string) => fetchApi<Comment>(`${API_ENDPOINTS.posts}/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      content
    })
  }),
  addReaction: (postId: number, type: string) => fetchApi<void>(`${API_ENDPOINTS.posts}/${postId}/reactions`, {
    method: 'POST',
    body: JSON.stringify({
      type
    })
  })
};