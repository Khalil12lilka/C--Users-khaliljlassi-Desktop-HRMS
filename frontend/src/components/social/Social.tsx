import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import PostComposer from './PostComposer';
import PostList from './PostList';
import { postService } from '../../services/postService';
import { Post } from '../../types/post';
import Alert from '../common/Alert';

const Social: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading posts...');
      const fetchedPosts = await postService.getPosts();
      console.log('Fetched posts:', fetchedPosts);
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Erreur lors du chargement des publications');
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (content: string) => {
    if (!user) {
      setError('Vous devez être connecté pour publier');
      return;
    }
    try {
      console.log('Creating new post with content:', content);
      const newPost = await postService.createPost({ content });
      console.log('New post created:', newPost);
      setPosts([newPost, ...posts]);
      setError(null);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Erreur lors de la création de la publication');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Fil d'actualité</h1>
      
      {error && (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      )}

      <PostComposer onPost={handlePost} />

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des publications...</p>
        </div>
      ) : (
        <PostList 
          posts={posts} 
          onDelete={async (postId) => {
            try {
              await postService.deletePost(postId);
              setPosts(posts.filter(p => p.id !== postId));
            } catch (err) {
              setError('Erreur lors de la suppression de la publication');
            }
          }}
        />
      )}
    </div>
  );
};

export default Social; 