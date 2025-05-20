// src/components/Auth/RegisterForm.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, signInWithGoogle } = useAuth(); // додано signInWithGoogle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !username) {
      return setError('Будь ласка, заповніть всі поля');
    }

    if (password !== confirmPassword) {
      return setError('Паролі не співпадають');
    }

    if (password.length < 6) {
      return setError('Пароль повинен містити щонайменше 6 символів');
    }

    try {
      setError('');
      setLoading(true);
      await register(email, password, username);
      navigate('/lessons');
    } catch (err) {
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setError('Користувач з таким email вже існує');
            break;
          case 'auth/invalid-email':
            setError('Невірний формат email');
            break;
          case 'auth/weak-password':
            setError('Пароль занадто слабкий');
            break;
          default:
            setError(`Помилка: ${err.message}`);
        }
      } else {
        setError('Сталася невідома помилка');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/lessons');
    } catch (err) {
      setError('Не вдалося увійти через Google. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h2>Реєстрація</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Ім'я користувача</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <small className="form-text text-muted">Мінімум 6 символів</small>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="confirm-password">Підтвердіть пароль</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? 'Завантаження...' : 'Зареєструватися'}
          </button>
        </form>

        <hr className="my-4" />

        <button
          className="btn btn-outline-danger w-100"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? 'Зачекайте...' : 'Увійти через Google'}
        </button>

        <div className="auth-switch mt-3">
          <p>
            Вже маєте акаунт?{' '}
            <Link to="/login" className="text-primary">
              Увійти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
