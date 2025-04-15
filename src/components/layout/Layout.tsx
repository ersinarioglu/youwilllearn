import React, { ReactNode } from 'react';
import Header from './Header';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} YouWillLearn - Educational Video Platform</p>
          <p>Share knowledge, learn together</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 