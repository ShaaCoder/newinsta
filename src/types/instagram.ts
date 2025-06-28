export interface InstagramAccount {
  id: string;
  username: string;
  accountType: 'BUSINESS' | 'CREATOR';
  mediaCount: number;
  followersCount: number;
  followsCount: number;
  profilePictureUrl: string;
  biography?: string;
  website?: string;
}

export interface InstagramMedia {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  likesCount: number;
  commentsCount: number;
  thumbnailUrl?: string;
}

export interface ScheduledPost {
  id: string;
  accountId: string;
  mediaUrl: string;
  caption: string;
  scheduledTime: Date;
  status: 'pending' | 'published' | 'failed';
  mediaType: 'IMAGE' | 'VIDEO';
  hashtags: string[];
}

export interface Analytics {
  reach: number;
  impressions: number;
  profileViews: number;
  websiteClicks: number;
  engagementRate: number;
  period: 'day' | 'week' | 'month';
}