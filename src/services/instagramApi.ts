import axios from 'axios';
import { InstagramAccount, InstagramMedia, Analytics } from '../types/instagram';

const API_BASE_URL = import.meta.env.VITE_META_API_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET;

class InstagramApiService {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  async getAuthUrl(): Promise<string> {
    const redirectUri = `${window.location.origin}/auth/instagram/callback`;
    const scope = 'user_profile,user_media';
    
    return `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    try {
      const redirectUri = `${window.location.origin}/auth/instagram/callback`;
      
      const response = await axios.post('https://api.instagram.com/oauth/access_token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.accessToken = response.data.access_token;
      return response.data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  async getUserProfile(): Promise<InstagramAccount> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        params: {
          fields: 'id,username,account_type,media_count,followers_count,follows_count',
          access_token: this.accessToken
        }
      });

      return {
        id: response.data.id,
        username: response.data.username,
        accountType: response.data.account_type,
        mediaCount: response.data.media_count || 0,
        followersCount: response.data.followers_count || 0,
        followsCount: response.data.follows_count || 0,
        profilePictureUrl: '/placeholder-avatar.jpg'
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async getUserMedia(limit: number = 20): Promise<InstagramMedia[]> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/me/media`, {
        params: {
          fields: 'id,media_type,media_url,permalink,caption,timestamp,like_count,comments_count,thumbnail_url',
          limit,
          access_token: this.accessToken
        }
      });

      return response.data.data.map((media: any) => ({
        id: media.id,
        mediaType: media.media_type,
        mediaUrl: media.media_url,
        permalink: media.permalink,
        caption: media.caption || '',
        timestamp: media.timestamp,
        likesCount: media.like_count || 0,
        commentsCount: media.comments_count || 0,
        thumbnailUrl: media.thumbnail_url
      }));
    } catch (error) {
      console.error('Error fetching user media:', error);
      throw error;
    }
  }

  async getAnalytics(): Promise<Analytics> {
    // Mock analytics data for demo
    return {
      reach: Math.floor(Math.random() * 10000) + 5000,
      impressions: Math.floor(Math.random() * 15000) + 8000,
      profileViews: Math.floor(Math.random() * 3000) + 1000,
      websiteClicks: Math.floor(Math.random() * 500) + 100,
      engagementRate: Math.random() * 10 + 2,
      period: 'week'
    };
  }

  async publishMedia(imageUrl: string, caption: string): Promise<boolean> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    try {
      // This is a simplified version - actual implementation would require proper media upload flow
      console.log('Publishing media:', { imageUrl, caption });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return Math.random() > 0.1; // 90% success rate for demo
    } catch (error) {
      console.error('Error publishing media:', error);
      return false;
    }
  }
}

export const instagramApi = new InstagramApiService();