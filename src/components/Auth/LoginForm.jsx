import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetOption, setShowResetOption] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/lessons';
  const showRedirectMessage = location.state?.from;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Невірний email або пароль');
          setShowResetOption(true);
          break;
        case 'auth/too-many-requests':
          setError('Забагато спроб входу. Спробуйте пізніше');
          setShowResetOption(true);
          break;
        default:
          setError('Не вдалося увійти. ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Будь ласка, введіть email для відновлення паролю');
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError('');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('Користувача з таким email не знайдено');
          break;
        case 'auth/invalid-email':
          setError('Неправильний формат email');
          break;
        default:
          setError('Помилка відправки листа для скидання пароля: ' + err.message);
      }
    } finally {
      setResetLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Не вдалося увійти через Google. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h2>Вхід</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {resetSent && (
          <div className="alert alert-success">
            Інструкції для відновлення паролю надіслано на вашу електронну пошту.
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
          </div>
          <button
            disabled={loading}
            className="btn btn-primary w-100 mt-3"
            type="submit"
          >
            {loading ? 'Завантаження...' : 'Увійти'}
          </button>
        </form>

        <div className="mt-3">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-light w-100 border"
            disabled={loading}
          >
            <FcGoogle size={20} className="me-2" />
            Увійти через Google
          </button>
        </div>

        {showResetOption && !resetSent && (
          <div className="mt-3">
            <button
              onClick={handleResetPassword}
              className="btn btn-outline-secondary w-100"
              disabled={resetLoading}
            >
              {resetLoading ? 'Відправка...' : 'Відновити пароль'}
            </button>
          </div>
        )}

        <div className="auth-switch mt-3">
          <p>
            Ще не маєте акаунту?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/register', { state: { from: location.state?.from } });
              }}
            >
              Зареєструватися
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
