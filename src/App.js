import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

import Header from './components/Header';
import Navigation from './components/Navigation';
import PremiumPlanSection from './components/PremiumPlanSection';
import Some from './components/Some';
import Footer from './components/Footer';

import LessonsPage from './pages/LessonsPage';
import ProgressPage from './pages/ProgressPage';
import PracticePage from './pages/PracticePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthProvider } from './components/Auth/AuthContext';
import ProfilePage from './pages/ProfilePage';
function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="App">
      <Header />
      {!isAuthPage && <Navigation />}

      <main className={(!isAuthPage && !isProfilePage) ? "container my-4" : ""}>
        <Routes>
          {/* Публічні маршрути */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Приватні маршрути */}
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="/progress" element={
            <PrivateRoute>
              <ProgressPage />
            </PrivateRoute>
          } />

          {/* Інші маршрути */}
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/practice" element={<PracticePage />} />

          {/* За замовчуванням */}
          <Route path="*" element={<Navigate to="/lessons" replace />} />
        </Routes>
      </main>

      {/* Додаткові секції тільки для НЕ auth-сторінок і НЕ profile */}
      {!isAuthPage && !isProfilePage && <PremiumPlanSection />}
      {!isAuthPage && !isProfilePage && <Some />}

      <Footer />
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
