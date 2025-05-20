import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer mt-5 py-4 bg-light border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Про платформу</h5>
            <p>Сучасна платформа для вивчення мов. Різноманітні уроки, практичні завдання та персоналізований підхід.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Швидкі посилання</h5>
            <ul className="list-unstyled">
              <li><Link to="/lessons" className="text-decoration-none">Уроки</Link></li>
              <li><Link to="/progress" className="text-decoration-none">Мій прогрес</Link></li>
              <li><Link to="/practice" className="text-decoration-none">Практика</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Зв'язатися з нами</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope"></i> info@ukrmova.com</li>
              <li><i className="bi bi-telephone"></i> +380-00-000-000</li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0">© 2025 Українська мова онлайн. Всі права захищені.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

