export type PostPrivacy = 'public' | 'friends' | 'private';
export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
export interface Post {
  id: number;
  authorId: number;
  authorName: string;
  authorAvatar?: string;
  content: string;
  images?: string[];
  privacy: PostPrivacy;
  createdAt: string;
  reactions: {
    type: ReactionType;
    count: number;
  }[];
  commentsCount: number;
  sharesCount: number;
}
export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  reactions: {
    type: ReactionType;
    count: number;
  }[];
}