// src/components/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/lessons" className="nav-link">Уроки</Link>
            </li>
            <li className="nav-item">
              <Link to="/progress" className="nav-link">Мій прогрес</Link>
            </li>
            <li className="nav-item">
              <Link to="/practice" className="nav-link">Практика</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">Профіль</Link>
            </li>
          </ul>
          <form className="d-flex ms-auto">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Пошук уроків..." aria-label="Search" />
              <button className="btn btn-outline-primary" type="submit"><i className="bi bi-search"></i></button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}