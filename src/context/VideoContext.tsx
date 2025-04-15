import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video, Comment, getVideos, getComments, createVideo, createComment, editVideo, USER_ID } from '../services/api';

// Context type interface
interface VideoContextType {
  videos: Video[];
  selectedVideo: Video | null;
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  selectVideo: (video: Video) => void;
  clearSelectedVideo: () => void;
  addVideo: (video: Omit<Video, 'id' | 'created_at'>) => Promise<boolean>;
  editVideo: (videoId: string, videoData: Partial<Omit<Video, 'id' | 'created_at'>>) => Promise<boolean>;
  addComment: (content: string, userId: string) => Promise<boolean>;
  refreshVideos: () => Promise<void>;
}

// Create context with default values
const VideoContext = createContext<VideoContextType | undefined>(undefined);

// Props interface for the provider
interface VideoProviderProps {
  children: ReactNode;
}

// Provider component
export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch videos on initial load
  useEffect(() => {
    refreshVideos();
  }, []);

  // Fetch comments when selected video changes
  useEffect(() => {
    if (selectedVideo) {
      fetchComments(selectedVideo.id);
    } else {
      setComments([]);
    }
  }, [selectedVideo]);

  // Function to refresh videos list
  const refreshVideos = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos);
      setError(null);
    } catch (err) {
      setError('Failed to fetch videos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch comments for a video
  const fetchComments = async (videoId: string): Promise<void> => {
    setIsLoading(true);
    try {
      const fetchedComments = await getComments(videoId);
      setComments(fetchedComments);
      setError(null);
    } catch (err) {
      setError('Failed to fetch comments');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to select a video
  const selectVideo = (video: Video): void => {
    setSelectedVideo(video);
  };

  // Function to clear the selected video
  const clearSelectedVideo = (): void => {
    setSelectedVideo(null);
  };

  // Function to add a new video
  const addVideo = async (videoData: Omit<Video, 'id' | 'created_at'>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newVideo = await createVideo({ 
        ...videoData, 
        user_id: USER_ID
      });
      
      if (newVideo) {
        await refreshVideos();
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to create video');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to edit a video
  const updateVideo = async (videoId: string, videoData: Partial<Omit<Video, 'id' | 'created_at'>>): Promise<boolean> => {
    if (!videoId) return false;
    
    setIsLoading(true);
    try {
      const updatedVideo = await editVideo(videoId, {
        title: videoData.title || '',
        description: videoData.description || '',
        video_url: videoData.video_url || '',
        user_id: USER_ID
      });
      
      if (updatedVideo) {
        await refreshVideos();
        // If we have a selected video and its ID matches the updated one, update it
        if (selectedVideo && selectedVideo.id === videoId) {
          setSelectedVideo(updatedVideo);
        }
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to update video');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a new comment
  const addComment = async (content: string, userId: string): Promise<boolean> => {
    if (!selectedVideo) return false;
    
    setIsLoading(true);
    try {
      const newComment = await createComment(selectedVideo.id, { 
        content, 
        user_id: userId 
      });
      
      if (newComment) {
        await fetchComments(selectedVideo.id);
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    videos,
    selectedVideo,
    comments,
    isLoading,
    error,
    selectVideo,
    clearSelectedVideo,
    addVideo,
    editVideo: updateVideo,
    addComment,
    refreshVideos
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};

// Custom hook to use the context
export const useVideoContext = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
}; 