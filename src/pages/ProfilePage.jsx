// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    photoURL: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            username: currentUser.displayName || data.username || '',
            email: currentUser.email || data.email || '',
            photoURL: currentUser.photoURL || data.photoURL || ''
          });
        }
      } catch (error) {
        console.error("Помилка отримання даних користувача:", error);
        setMessage({ text: 'Помилка завантаження даних профілю', type: 'danger' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    
    setUpdating(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Оновлення імені в Firebase Auth
      if (userData.username !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: userData.username
        });
      }
      
      // Оновлення даних у Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        username: userData.username
      });
      
      setMessage({ text: 'Профіль успішно оновлено', type: 'success' });
    } catch (error) {
      console.error("Помилка при оновленні профілю:", error);
      setMessage({ text: 'Помилка при оновленні профілю: ' + error.message, type: 'danger' });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Профіль користувача</h2>
      
      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMessage({ text: '', type: '' })}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                {userData.photoURL ? (
                  <img 
                    src={userData.photoURL} 
                    alt="Фото профілю" 
                    className="rounded-circle img-fluid"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div 
                    className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-circle mx-auto"
                    style={{ width: '150px', height: '150px' }}
                  >
                    <i className="bi bi-person-fill" style={{ fontSize: '4rem' }}></i>
                  </div>
                )}
              </div>
              
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Ім'я користувача</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    value={userData.email}
                    disabled
                  />
                </div>
                
                <div className="d-grid mt-4">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleUpdateProfile}
                    disabled={updating}
                  >
                    {updating ? 'Збереження...' : 'Зберегти зміни'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;