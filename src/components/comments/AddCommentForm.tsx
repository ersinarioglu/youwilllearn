import React, { useState } from 'react';
import { useVideoContext } from '../../context/VideoContext';
import './AddCommentForm.css';

const AddCommentForm: React.FC = () => {
  const { addComment, isLoading, selectedVideo } = useVideoContext();
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!content.trim()) {
      setErrorMessage('Comment cannot be empty');
      return;
    }

    if (!userId.trim()) {
      setErrorMessage('User ID is required');
      return;
    }

    if (!selectedVideo) {
      setErrorMessage('No video selected');
      return;
    }

    const success = await addComment(content, userId);

    if (success) {
      // Reset form
      setContent('');
      setErrorMessage('');
    } else {
      setErrorMessage('Failed to add comment. Please try again.');
    }
  };

  if (!selectedVideo) {
    return null;
  }

  return (
    <div className="add-comment-container">
      <h3 className="add-comment-title">Add a Comment</h3>
      <form className="add-comment-form" onSubmit={handleSubmit}>
        {errorMessage && <div className="comment-error">{errorMessage}</div>}

        <div className="comment-form-group">
          <label htmlFor="user-id">Your User ID *</label>
          <input
            id="user-id"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            disabled={isLoading}
            required
          />
        </div>

        <div className="comment-form-group">
          <label htmlFor="comment-content">Comment *</label>
          <textarea
            id="comment-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
            disabled={isLoading}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-comment-button"
          disabled={isLoading}
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm; 