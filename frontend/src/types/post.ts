export type PostPrivacy = 'public' | 'friends' | 'private';
export type ReactionType = 'like' | 'love' | 'wow' | 'haha' | 'sad' | 'angry';

export interface Post {
  id: string;
  content: string;
  authorId: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  privacy: 'public' | 'friends' | 'private';
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
  reactions?: Reaction[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

export interface Reaction {
  id: string;
  type: string;
  userId: string;
  createdAt: string;
} 