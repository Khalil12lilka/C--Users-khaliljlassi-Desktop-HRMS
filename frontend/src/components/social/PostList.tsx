import React from 'react';
import { Post } from '../../types/post';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onDelete: (postId: string) => Promise<void>;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune publication pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={() => onDelete(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList; 