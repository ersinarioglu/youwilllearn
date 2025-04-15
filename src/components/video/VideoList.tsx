import React from 'react';
import { useVideoContext } from '../../context/VideoContext';
import { Video } from '../../services/api';
import './VideoList.css';

// Extracts YouTube video ID from a URL
const getYouTubeVideoId = (url: string): string => {
  if (!url) return '';
  
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[7].length === 11) ? match[7] : '';
};

const VideoList: React.FC = () => {
  const { videos, selectVideo, selectedVideo, isLoading } = useVideoContext();

  const handleVideoSelect = (video: Video) => {
    selectVideo(video);
  };

  const getThumbnailUrl = (videoUrl: string): string => {
    const youtubeId = getYouTubeVideoId(videoUrl);
    if (youtubeId) {
      return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
    }
    // Add more video platform checks here if needed
    
    // Default placeholder
    return '';
  };

  if (isLoading && (!videos || videos.length === 0)) {
    return <div className="video-list-loading">Loading videos...</div>;
  }

  if (!videos || !Array.isArray(videos) || videos.length === 0) {
    return <div className="video-list-empty">No videos available. Add your first video!</div>;
  }

  return (
    <div className="video-list-container">
      <h2 className="video-list-title">Available Videos</h2>
      <div className="video-list">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`video-list-item ${selectedVideo?.id === video.id ? 'selected' : ''}`}
            onClick={() => handleVideoSelect(video)}
          >
            <div className="video-thumbnail">
              {getThumbnailUrl(video.video_url) ? (
                <img 
                  src={getThumbnailUrl(video.video_url)} 
                  alt={video.title}
                  className="thumbnail-image"
                />
              ) : (
                <div className="thumbnail-placeholder">
                  <svg 
                    stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 512 512" 
                    height="24" 
                    width="24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42z"></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="video-info">
              <h3 className="video-info-title">{video.title}</h3>
              <p className="video-info-description">{video.description.length > 100 
                ? `${video.description.substring(0, 100)}...` 
                : video.description}
              </p>
              <p className="video-info-meta">
                By: {video.user_id} • {new Date(video.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList; 