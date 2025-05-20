import React, { useState } from 'react';
import { ThumbsUpIcon, MessageCircleIcon, ShareIcon, MoreHorizontalIcon, HeartIcon, GlobeIcon, UsersIcon, LockIcon, SendIcon } from 'lucide-react';
import { Post as PostType, ReactionType } from '../../types/post';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '../../contexts/AuthContext';

interface PostProps {
  post: PostType;
  onReaction: (type: ReactionType) => void;
  onComment: (content: string) => void;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}
const Post: React.FC<PostProps> = ({
  post,
  onReaction,
  onComment,
  onEdit,
  onDelete
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const privacyIcons = {
    public: <GlobeIcon size={16} />,
    friends: <UsersIcon size={16} />,
    private: <LockIcon size={16} />
  };
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      onComment(commentContent);
      setCommentContent('');
    }
  };
  const isOwner = user && user.name === post.authorName;
  return <div className="bg-white rounded-lg shadow relative">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {post.authorAvatar ? <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full rounded-full object-cover" /> : <UsersIcon size={20} />}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{post.authorName}</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <span>
                {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: fr
              })}
              </span>
              <span className="mx-1">•</span>
              <span className="flex items-center">
                {privacyIcons[post.privacy]}
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <button className="text-gray-400 hover:text-gray-600" onClick={() => setMenuOpen(v => !v)}>
          <MoreHorizontalIcon size={20} />
        </button>
          {menuOpen && isOwner && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => { setMenuOpen(false); onEdit && onEdit(post.id); }}
              >
                Modifier
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={() => { setMenuOpen(false); onDelete && onDelete(post.id); }}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>
      {/* Post Images */}
      {post.images && post.images.length > 0 && <div className={`grid gap-1 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
          {post.images.map((image, index) => <div key={index} className={`relative ${post.images!.length === 3 && index === 0 ? 'col-span-2' : ''}`}>
              <img src={image} alt={`Post image ${index + 1}`} className="w-full h-full object-cover" />
            </div>)}
        </div>}
      {/* Post Stats */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <ThumbsUpIcon size={16} className="text-blue-500" />
            <HeartIcon size={16} className="text-red-500 -ml-1" />
            <span className="ml-1">
              {post.reactions.reduce((acc, r) => acc + r.count, 0)}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>{post.commentsCount} commentaires</span>
          <span>{post.sharesCount} partages</span>
        </div>
      </div>
      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
        <button onClick={() => onReaction('like')} className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:bg-gray-50 rounded-lg">
          <ThumbsUpIcon size={20} />
          <span className="ml-2">J'aime</span>
        </button>
        <button onClick={() => setShowCommentInput(true)} className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:bg-gray-50 rounded-lg">
          <MessageCircleIcon size={20} />
          <span className="ml-2">Commenter</span>
        </button>
        <button className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:bg-gray-50 rounded-lg">
          <ShareIcon size={20} />
          <span className="ml-2">Partager</span>
        </button>
      </div>
      {/* Comment Input */}
      {showCommentInput && <div className="p-4 border-t border-gray-100">
          <form onSubmit={handleCommentSubmit} className="flex items-start space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <UsersIcon size={16} />
            </div>
            <div className="flex-1 relative">
              <input type="text" value={commentContent} onChange={e => setCommentContent(e.target.value)} placeholder="Écrivez un commentaire..." className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600">
                <SendIcon size={16} />
              </button>
            </div>
          </form>
        </div>}
    </div>;
};
export default Post;