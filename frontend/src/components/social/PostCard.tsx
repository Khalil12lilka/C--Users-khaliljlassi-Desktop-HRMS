import React, { useState } from 'react';
import { Post } from '../../types/post';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trash2, MessageCircle, ThumbsUp, Share2 } from 'lucide-react';
import Button from '../common/Button';

interface PostCardProps {
  post: Post;
  onDelete: () => Promise<void>;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
      setIsDeleting(true);
      try {
        await onDelete();
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const canDelete = user && (user.id === post.authorId.id || user.role === 'Admin RH');

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {post.authorId.firstName[0]}{post.authorId.lastName[0]}
          </div>
          <div>
            <h3 className="font-semibold">
              {post.authorId.firstName} {post.authorId.lastName}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: fr })}
            </p>
          </div>
        </div>
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>

      <p className="mt-4 text-gray-800">{post.content}</p>

      <div className="mt-4 flex items-center space-x-4 text-gray-500">
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <ThumbsUp size={16} />
          <span>J'aime</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <MessageCircle size={16} />
          <span>Commenter</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <Share2 size={16} />
          <span>Partager</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard; 