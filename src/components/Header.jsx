import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import React, { useEffect } from 'react';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log('Користувач залогінений:', currentUser.email);
    } else {
      console.log('Користувач НЕ залогінений');
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Помилка при виході з акаунту:', error);
    }
  };

  return (
    <header className="bg-primary text-white py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <Link to="/lessons">
              <h1 className="mb-0 text-white text-decoration-none">Language Platform</h1>
            </Link>
            <p className="mb-0">Вивчайте мови де завгодно і коли завгодно</p>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <div className="d-flex justify-content-md-end gap-2">
              <button className="btn btn-light btn-sm">
                <i className="bi bi-translate me-1"></i> Змінити мову
              </button>

              {currentUser ? (
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-1"></i> Вийти
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-light btn-sm">
                    <i className="bi bi-person-circle me-1"></i> Увійти
                  </Link>
                  <Link to="/register" className="btn btn-success btn-sm">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Реєстрація
                  </Link>
                  
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
