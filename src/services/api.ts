import axios from 'axios';

// Base URL for API
const API_URL = 'https://take-home-assessment-423502.uc.r.appspot.com/api';

// User ID for creating videos
export const USER_ID = 'ersin_arioglu';

// Types
export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  video_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

// API functions
export const getVideos = async (): Promise<Video[]> => {
  try {
    const response = await axios.get(`${API_URL}/videos`, { 
      params: { user_id: USER_ID }
    });
    
    // Check if response.data is an array, if not, look for videos property or return empty array
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && response.data.videos && Array.isArray(response.data.videos)) {
      return response.data.videos;
    } else {
      console.error('Unexpected API response format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

export const getVideo = async (id: string): Promise<Video | null> => {
  try {
    const response = await axios.get(`${API_URL}/videos/single`, {
        params: { video_id: id }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    return null;
  }
};

export const createVideo = async (videoData: Omit<Video, 'id' | 'created_at'>): Promise<Video | null> => {
  try {
    const response = await axios.post(`${API_URL}/videos`, {
      user_id: USER_ID,
      title: videoData.title,
      description: videoData.description,
      video_url: videoData.video_url
    });
    return response.data;
  } catch (error) {
    console.error('Error creating video:', error);
    return null;
  }
};

export const editVideo = async (videoId: string, videoData: Omit<Video, 'id' | 'created_at'>): Promise<Video | null> => {
    try {
      const response = await axios.put(`${API_URL}/videos`, {
        video_id: videoId,
        title: videoData.title,
        description: videoData.description,
      });
      return response.data;
    } catch (error) {
      console.error('Error editing video:', error);
      return null;
    }
  };

export const getComments = async (videoId: string): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${API_URL}/videos/comments`, {
        params: { video_id: videoId }
    });
    
    // Check if response.data is an array, if not, look for comments property or return empty array
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && response.data.comments && Array.isArray(response.data.comments)) {
      return response.data.comments;
    } else {
      console.error('Unexpected API response format for comments:', response.data);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching comments for video ${videoId}:`, error);
    return [];
  }
};

export const createComment = async (
  videoId: string,
  commentData: Omit<Comment, 'id' | 'video_id' | 'created_at'>
): Promise<Comment | null> => {
  try {
    // Sending data directly in the request body
    const response = await axios.post(`${API_URL}/videos/comments`, {
      user_id: commentData.user_id,
      content: commentData.content,
      video_id: videoId
    });
    return response.data;
  } catch (error) {
    console.error(`Error creating comment for video ${videoId}:`, error);
    return null;
  }
}; 