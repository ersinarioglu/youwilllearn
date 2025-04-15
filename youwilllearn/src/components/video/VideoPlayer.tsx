import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';
import './VideoPlayer.css';

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const playerRef = useRef<ReactPlayer>(null);
  
  const playbackRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setIsMuted(parseFloat(e.target.value) === 0);
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaybackRate(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    // Find the container element
    const container = document.querySelector('.player-wrapper');
    
    if (!container) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error('Error exiting fullscreen:', err);
      });
    } else {
      container.requestFullscreen().catch(err => {
        console.error('Error entering fullscreen:', err);
      });
    }
  };

  return (
    <div className="video-player-container">
      <h2 className="video-title">{title}</h2>
      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          url={url}
          className="react-player"
          width="100%"
          height="100%"
          playing={isPlaying}
          volume={isMuted ? 0 : volume}
          playbackRate={playbackRate}
          controls={false}
          config={{
            youtube: {
              playerVars: { showinfo: 1 }
            }
          }}
        />
      </div>
      
      <div className="controls">
        <button className="control-button" onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        <div className="volume-control">
          <button className="control-button" onClick={handleMuteToggle}>
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        
        <div className="playback-rate-control">
          <span>Speed:</span>
          <select 
            value={playbackRate} 
            onChange={handlePlaybackRateChange}
            className="playback-select"
          >
            {playbackRates.map(rate => (
              <option key={rate} value={rate}>
                {rate}x
              </option>
            ))}
          </select>
        </div>
        
        <button className="control-button fullscreen-button" onClick={handleFullscreen}>
          <FaExpand />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer; 