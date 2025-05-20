import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const showMessage = from !== '/';

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {showMessage && (
            <div className="alert alert-info mb-4">
              Щоб перейти на сторінку "{from}", спочатку увійдіть у свій обліковий запис.
            </div>
          )}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;