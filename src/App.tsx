import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClassesSchedule from './pages/ClassesSchedule/ClassesSchedule';
import Statistics from './pages/Statistics/Statistics';
import Profile from './pages/Profile/Profile';
import Auth from './pages/Auth/Auth';

const App: React.FC = () => {
  // Temporariamente, vamos considerar o usuário como não autenticado
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/aulas" /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/auth" 
          element={isAuthenticated ? <Navigate to="/aulas" /> : <Auth />} 
        />
        <Route 
          path="/aulas" 
          element={isAuthenticated ? <ClassesSchedule /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/estatisticas" 
          element={isAuthenticated ? <Statistics /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/perfil" 
          element={isAuthenticated ? <Profile onBack={() => window.history.back()} /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
