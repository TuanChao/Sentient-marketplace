import React from 'react';
import Navbar from '../components/common/Navbar';
import Chatbot from '../components/ui/Chatbot';
import './Layout.css';
import '../styles/pages-dark.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Chatbot />
    </div>
  );
};

export default Layout;