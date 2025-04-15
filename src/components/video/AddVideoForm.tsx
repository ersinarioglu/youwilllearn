import React, { useState } from 'react';
import { useVideoContext } from '../../context/VideoContext';
import { USER_ID } from '../../services/api';
import './AddVideoForm.css';

const AddVideoForm: React.FC = () => {
  const { addVideo, isLoading } = useVideoContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Basic validation
    if (!title.trim()) {
      setErrorMessage('Title is required');
      return;
    }
    
    if (!url.trim()) {
      setErrorMessage('Video URL is required');
      return;
    }
    
    try {
      // Validate URL format
      new URL(url);
    } catch (error) {
      setErrorMessage('Please enter a valid URL');
      return;
    }
    
    const success = await addVideo({
      title,
      description,
      video_url: url,
      user_id: USER_ID
    });
    
    if (success) {
      // Reset form
      setTitle('');
      setDescription('');
      setUrl('');
      setIsFormVisible(false);
    } else {
      setErrorMessage('Failed to add video. Please try again.');
    }
  };
  
  return (
    <div className="add-video-container">
      {!isFormVisible ? (
        <button 
          className="add-video-button"
          onClick={() => setIsFormVisible(true)}
        >
          + Add New Video
        </button>
      ) : (
        <div className="add-video-form-container">
          <h2 className="add-video-title">Add New Video</h2>
          
          <form className="add-video-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="add-video-error">{errorMessage}</div>
            )}
            
            <div className="form-group">
              <label htmlFor="video-title">Title *</label>
              <input
                id="video-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="video-description">Description</label>
              <textarea
                id="video-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description"
                rows={4}
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="video-url">Video URL *</label>
              <input
                id="video-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                required
                disabled={isLoading}
              />
              <small className="form-help">
                Enter a valid video URL (YouTube, Vimeo, or direct video link)
              </small>
            </div>
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setIsFormVisible(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Video'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddVideoForm; 