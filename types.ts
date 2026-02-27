export type PostType = 'text' | 'chat' | 'image';

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  isRight: boolean;
}

export interface Post {
  id: string;
  type: PostType;
  emoji: string;
  title: string;
  quote: string;
  content: string[]; // Array of paragraphs
  chatMessages?: ChatMessage[];
  imageUrl?: string;
  imageCaption?: string;
  interludePhrase?: string; // New field for the connecting phrase
  isVisible?: boolean; // For animation purposes
}

export interface SiteConfig {
  coupleName: string;
  subtitle: string;
  avatarLetter: string;
  musicTitle: string;
  musicArtist: string;
  musicLyric: string;
  mediaUrl: string; // Supports SoundCloud or YouTube
  proposalText: string;
}