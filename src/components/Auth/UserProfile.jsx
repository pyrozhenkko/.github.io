// src/components/Auth/UserProfile.js
import React from 'react';
import { useAuth } from './AuthContext';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  
  if (!currentUser) {
    return null;
  }
  
  const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || 'Користувач';
  
  // Отримуємо першу літеру імені для аватару
  const userInitial = displayName.charAt(0).toUpperCase();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Помилка при виході:', error);
    }
  };
  
  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-light dropdown-toggle d-flex align-items-center" 
        type="button" 
        id="userMenu" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        <div className="user-avatar me-2">{userInitial}</div>
        {displayName}
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
        <li><button className="dropdown-item">Профіль</button></li>
        <li><button className="dropdown-item">Налаштування</button></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={handleLogout}>Вийти</button></li>
      </ul>
    </div>
  );
};

export default UserProfile;