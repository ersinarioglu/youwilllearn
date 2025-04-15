import React from 'react';
import { Comment } from '../../services/api';
import './CommentsList.css';

interface CommentsListProps {
  comments: Comment[];
  isLoading: boolean;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, isLoading }) => {
  if (isLoading) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  if (!comments || !Array.isArray(comments) || comments.length === 0) {
    return <div className="no-comments">No comments yet. Be the first to comment!</div>;
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div className="comment-item" key={comment.id}>
          <div className="comment-header">
            <div className="comment-user">{comment.user_id}</div>
            <div className="comment-date">
              {new Date(comment.created_at).toLocaleDateString()} at{' '}
              {new Date(comment.created_at).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
          <div className="comment-content">{comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList; 