import React from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Chatbot from '../components/ui/Chatbot';
import './Layout.css';
import '../styles/pages-dark.css';

interface LayoutProps {
  children: React.ReactNode;
  showSidebarFilters?: boolean;
  filters?: any;
  onFiltersChange?: (filters: any) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebarFilters = false,
  filters,
  onFiltersChange
}) => {
  return (
    <div className="main-layout">
      <Navbar />
      <Sidebar
        showFilters={showSidebarFilters}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
      <main className="main-content">
        {children}
      </main>
      <Chatbot />
    </div>
  );
};

export default Layout;