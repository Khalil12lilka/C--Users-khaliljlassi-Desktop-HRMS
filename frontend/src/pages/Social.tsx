import React, { useState, useEffect } from 'react';
import PostComposer from '../components/social/PostComposer';
import Post from '../components/social/Post';
import { Post as PostType } from '../types/post';
import { postService } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';

const Social: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [editingPost, setEditingPost] = useState<PostType | null>(null);
  const [deletingPost, setDeletingPost] = useState<PostType | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Debug logs
  console.log('Auth state:', { user });
  console.log('Posts state:', posts);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  // Fetch posts on component mount
  useEffect(() => {
    console.log('useEffect triggered, user:', user);
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching posts...');
      const fetchedPosts = await postService.getPosts();
      console.log('Fetched posts:', fetchedPosts);
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      console.error('Error in fetchPosts:', err);
      setError('Erreur lors du chargement des publications');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = async (content: string) => {
    if (!user) {
      setError('Vous devez être connecté pour publier');
      return;
    }
    try {
      const newPost = await postService.createPost({ content });
      setPosts([newPost, ...posts]);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la création de la publication');
      console.error('Error creating post:', err);
    }
  };

  // Suppression
  const handleDelete = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!user || !post || (user.role !== 'ADMIN_RH' && post.authorId.id !== user.id)) {
      setError('Vous n\'avez pas les droits pour supprimer cette publication');
      return;
    }
    setDeletingPost(post);
  };

  const confirmDelete = async () => {
    if (deletingPost) {
      try {
        await postService.deletePost(deletingPost.id);
        setPosts(posts.filter(p => p.id !== deletingPost.id));
        setDeletingPost(null);
        setError(null);
      } catch (err) {
        setError('Erreur lors de la suppression de la publication');
        console.error('Error deleting post:', err);
      }
    }
  };

  // Modification
  const handleEdit = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!user || !post || (user.role !== 'ADMIN_RH' && post.authorId.id !== user.id)) {
      setError('Vous n\'avez pas les droits pour modifier cette publication');
      return;
    }
    setEditingPost(post);
    setEditContent(post.content);
  };

  const confirmEdit = async () => {
    if (editingPost) {
      try {
        const updatedPost = await postService.updatePost(editingPost.id, { content: editContent });
        setPosts(posts.map(p => p.id === editingPost.id ? updatedPost : p));
        setEditingPost(null);
        setEditContent('');
        setError(null);
      } catch (err) {
        setError('Erreur lors de la modification de la publication');
        console.error('Error updating post:', err);
      }
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-6">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>Vous devez être connecté pour accéder au fil d'actualité.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <span className="sr-only">Fermer</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      <h1 className="text-2xl font-bold text-gray-800">Fil d'actualité</h1>
      <PostComposer onPost={handlePost} />
      <div className="space-y-6">
        {posts.map(post => (
          <Post 
            key={post.id} 
            post={post} 
            onReaction={async (type) => {
              try {
                await postService.addReaction(post.id, type);
                await fetchPosts(); // Refresh posts to get updated reactions
              } catch (err) {
                setError('Erreur lors de l\'ajout de la réaction');
                console.error('Error adding reaction:', err);
              }
            }} 
            onComment={async (content) => {
              try {
                await postService.addComment(post.id, content);
                await fetchPosts(); // Refresh posts to get updated comments
              } catch (err) {
                setError('Erreur lors de l\'ajout du commentaire');
                console.error('Error adding comment:', err);
              }
            }} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </div>

      {/* Modal de suppression */}
      {deletingPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Supprimer la publication ?</h2>
            <p className="mb-4">Cette action est irréversible.</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setDeletingPost(null)} 
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition */}
      {editingPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Modifier la publication</h2>
            <textarea
              className="w-full border rounded p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setEditingPost(null)} 
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmEdit} 
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Social;