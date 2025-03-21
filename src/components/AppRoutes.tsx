import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ClassesSchedule from '../pages/ClassesSchedule/ClassesSchedule';
import Statistics from '../pages/Statistics/Statistics';
import Profile from '../pages/Profile/Profile';
import Payments from '../pages/Payments/Payments';
import Dashboard from '../pages/Dashboard/Dashboard';
import Auth from '../pages/Auth/Auth';
import ResetPassword from '../pages/Auth/ResetPassword';
import Layout from './Layout/Layout';
import { useAuthContext } from '../contexts/AuthContext';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext();

  const handleTabChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" replace />} />
      <Route path="/login" element={<Navigate to="/inicio" replace />} />
      <Route path="/reset-password" element={<Navigate to="/inicio" replace />} />
      <Route 
        path="/inicio" 
        element={
          <Layout 
            title="Início"
            activeTab="inicio"
            onTabChange={handleTabChange}
            userName={user?.name || ''}
            userBelt={user?.belt || 'branca'}
            userStripes={user?.stripes || 0}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          >
            <Dashboard />
          </Layout>
        } 
      />
      <Route 
        path="/aulas" 
        element={
          <Layout 
            title="Aulas"
            activeTab="aulas"
            onTabChange={handleTabChange}
            userName={user?.name || ''}
            userBelt={user?.belt || 'branca'}
            userStripes={user?.stripes || 0}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          >
            <ClassesSchedule />
          </Layout>
        } 
      />
      <Route 
        path="/estatisticas" 
        element={
          <Layout 
            title="Estatísticas"
            activeTab="estatisticas"
            onTabChange={handleTabChange}
            userName={user?.name || ''}
            userBelt={user?.belt || 'branca'}
            userStripes={user?.stripes || 0}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          >
            <Statistics />
          </Layout>
        } 
      />
      <Route 
        path="/perfil" 
        element={
          <Layout 
            title="Perfil"
            activeTab="perfil"
            onTabChange={handleTabChange}
            userName={user?.name || ''}
            userBelt={user?.belt || 'branca'}
            userStripes={user?.stripes || 0}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          >
            <Profile onBack={() => window.history.back()} />
          </Layout>
        } 
      />
      <Route 
        path="/pagamentos" 
        element={
          <Layout 
            title="Pagamentos"
            activeTab="pagamentos"
            onTabChange={handleTabChange}
            userName={user?.name || ''}
            userBelt={user?.belt || 'branca'}
            userStripes={user?.stripes || 0}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          >
            <Payments />
          </Layout>
        } 
      />
      <Route path="*" element={<Navigate to="/inicio" replace />} />
    </Routes>
  );
};

export default AppRoutes; 