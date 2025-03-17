import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClassesSchedule from './pages/ClassesSchedule/ClassesSchedule';
import Statistics from './pages/Statistics/Statistics';
import Profile from './pages/Profile/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/aulas" replace />} />
        <Route path="/aulas" element={<ClassesSchedule />} />
        <Route path="/estatisticas" element={<Statistics />} />
        <Route path="/perfil" element={<Profile onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
};

export default App;
