import React, { useState } from 'react';
import { useVideoContext } from '../context/VideoContext';
import VideoPlayer from '../components/video/VideoPlayer';
import CommentsList from '../components/comments/CommentsList';
import AddCommentForm from '../components/comments/AddCommentForm';
import './VideoPage.css';

const VideoPage: React.FC = () => {
  const { selectedVideo, comments, isLoading, clearSelectedVideo, editVideo } = useVideoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editError, setEditError] = useState('');

  const handleBackClick = () => {
    clearSelectedVideo();
  };

  const handleEditClick = () => {
    if (selectedVideo) {
      setEditTitle(selectedVideo.title);
      setEditDescription(selectedVideo.description);
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditError('');
  };

  const handleSaveEdit = async () => {
    if (!selectedVideo) return;
    
    if (!editTitle.trim()) {
      setEditError('Title is required');
      return;
    }
    
    const success = await editVideo(selectedVideo.id, {
      title: editTitle,
      description: editDescription
    });
    
    if (success) {
      setIsEditing(false);
      setEditError('');
      clearSelectedVideo();
    } else {
      setEditError('Failed to update video. Please try again.');
    }
  };

  // Arrow Left SVG Icon
  const ArrowLeftIcon = (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 448 512" 
      height="1em" 
      width="1em" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
    </svg>
  );

  // Edit SVG Icon
  const EditIcon = (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 576 512" 
      height="1em" 
      width="1em" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
    </svg>
  );

  if (!selectedVideo) {
    return (
      <div className="video-page-empty">
        <h2>No video selected</h2>
        <button className="back-button" onClick={handleBackClick}>
          {ArrowLeftIcon} Go to Videos
        </button>
      </div>
    );
  }

  return (
    <div className="video-page">
      <div className="video-section">
        <button className="back-button" onClick={handleBackClick}>
          {ArrowLeftIcon} Back to Videos
        </button>
        
        <VideoPlayer url={selectedVideo.video_url} title={selectedVideo.title} />
        
        <div className="video-details">
          {!isEditing ? (
            <>
              <div className="video-title-container">
                <h1 className="video-title">{selectedVideo.title}</h1>
                <button className="edit-button" onClick={handleEditClick} title="Edit Video">
                  {EditIcon}
                </button>
              </div>
              <div className="video-meta">
                <span>Uploaded by: {selectedVideo.user_id}</span>
                <span>Added: {new Date(selectedVideo.created_at).toLocaleDateString()}</span>
              </div>
              <p className="video-description">{selectedVideo.description}</p>
            </>
          ) : (
            <div className="edit-video-form">
              <h2>Edit Video</h2>
              {editError && <div className="edit-error">{editError}</div>}
              
              <div className="form-group">
                <label htmlFor="edit-title">Title *</label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Enter video title"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Enter video description"
                  rows={4}
                  disabled={isLoading}
                />
              </div>
              
              <div className="edit-buttons">
                <button 
                  className="cancel-button"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  className="save-button"
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="comments-section">
        <h2 className="comments-title">Comments</h2>
        <CommentsList comments={comments} isLoading={isLoading} />
        <AddCommentForm />
      </div>
    </div>
  );
};

export default VideoPage; 