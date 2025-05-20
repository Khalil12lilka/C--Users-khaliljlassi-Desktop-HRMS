import React, { useState } from 'react';
import { ImageIcon, UsersIcon, GlobeIcon, LockIcon, SendIcon, XIcon } from 'lucide-react';
import Button from '../common/Button';
import { PostPrivacy } from '../../types/post';

interface PostComposerProps {
  onPost: (content: string) => Promise<void>;
}

const PostComposer: React.FC<PostComposerProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState<PostPrivacy>('public');
  // Removed image upload for now

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await onPost(content);
    setContent('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <UsersIcon size={20} />
        </div>
        <div className="flex-1">
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Que souhaitez-vous partager ?"
            rows={3}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                disabled
              >
                <ImageIcon size={20} />
              </button>
              <select
                value={privacy}
                onChange={e => setPrivacy(e.target.value as PostPrivacy)}
                className="text-sm text-gray-600 border border-gray-200 rounded-md px-2 py-1"
              >
                <option value="public">Public</option>
                <option value="friends">Amis</option>
                <option value="private">Privé</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <SendIcon size={16} className="mr-2" />
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;