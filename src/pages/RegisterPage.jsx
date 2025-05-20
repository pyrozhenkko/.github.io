// src/pages/RegisterPage.js
import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="container mt-5"> {/* Додали контейнер і відступ зверху */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};


export default RegisterPage;