import React from 'react';
import { VideoProvider, useVideoContext } from './context/VideoContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import './App.css';

const AppContent: React.FC = () => {
  const { selectedVideo } = useVideoContext();
  
  return selectedVideo ? <VideoPage /> : <HomePage />;
};

const App: React.FC = () => {
  return (
    <VideoProvider>
      <Layout>
        <AppContent />
      </Layout>
    </VideoProvider>
  );
};

export default App;
