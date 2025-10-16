import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import MarketplacePage from '../pages/marketplace/MarketplacePage';
import CollectionsPage from '../pages/collections/CollectionsPage';
import StatsPage from '../pages/stats/StatsPage';
import CreatePage from '../pages/create/CreatePage';
import ProfilePage from '../pages/profile/ProfilePage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/collections/:id" element={<CollectionsPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;