import React from 'react';
import './VideoPlayer.css';

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (videoUrl: string): string => {
    if (!videoUrl) return '';
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    
    return (match && match[7].length === 11) ? match[7] : '';
  };

  // Enhanced parameters to disable related videos, annotations, and other distracting elements
  const embedUrl = `https://www.youtube.com/embed/${getYouTubeVideoId(url)}?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&disablekb=0&iv_load_policy=3`;

  return (
    <div className="video-player-container">
      <h2 className="player-title">{title}</h2>
      <div className="player-wrapper">
        <iframe
          className="youtube-player"
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer; 