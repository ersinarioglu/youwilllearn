import React from 'react';
import { useVideoContext } from '../context/VideoContext';
import VideoList from '../components/video/VideoList';
import AddVideoForm from '../components/video/AddVideoForm';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { selectedVideo } = useVideoContext();

  return (
    <div className="home-page">
      <div className="welcome-banner">
        <h1>Welcome to YouWillLearn</h1>
        <p>A platform to share and watch educational videos</p>
      </div>
      
      <div className="home-content">
        <AddVideoForm />
        <VideoList />
      </div>
      
    
    </div>
  );
};

export default HomePage; 