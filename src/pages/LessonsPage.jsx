import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useAuth } from '../components/Auth/AuthContext';


export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { currentUser } = useAuth();

  // Фільтри
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  
  // Тимчасові фільтри
  const [tempSelectedLevels, setTempSelectedLevels] = useState([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
  const [tempSelectedFormats, setTempSelectedFormats] = useState([]);
  const [tempSelectedLanguages, setTempSelectedLanguages] = useState([]);

  // Налаштування API URL для розробки та виробництва
  const API_URL = process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api';
  
  // Створюємо екземпляр axios з базовим URL та заголовками
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  // Отримання уроків через API
  const fetchLessons = async () => {
    try {
      setLoading(true);
      console.log(`Виконую запит до ${API_URL}/lessons`);
      
      try {
        const { data } = await api.get('/lessons');
        console.log("Отримані дані:", data);
        setLessons(data);
      } catch (apiError) {
        console.error("Помилка API:", apiError);
        
        if (apiError.response) {
          // Сервер відповів зі статусом, відмінним від 2xx
          console.error("Відповідь сервера з помилкою:", apiError.response.status, apiError.response.data);
        } else if (apiError.request) {
          // Запит було відправлено, але відповіді не отримано
          console.error("Немає відповіді від сервера:", apiError.request);
        }
        
        console.warn("API недоступний, використовуємо демо-дані");
        setLessons(demoLessons);
        setError("API недоступний. Відображаються демонстраційні дані.");
      }
    } catch (err) {
      console.error("Загальна помилка завантаження:", err);
      setError(`${err.message}. Відображаються демонстраційні дані.`);
      setLessons(demoLessons);
    } finally {
      setLoading(false);
    }
  };

  // Фільтрація уроків через API
  const fetchFilteredLessons = async () => {
    try {
      setLoading(true);

      // Якщо немає фільтрів, отримуємо всі уроки
      if (selectedLevels.length === 0 && 
          selectedCategories.length === 0 && 
          selectedFormats.length === 0 && 
          selectedLanguages.length === 0) {
        return fetchLessons();
      }

      const filterData = {
        levels: selectedLevels.length > 0 ? selectedLevels : null,
        categories: selectedCategories.length > 0 ? selectedCategories : null,
        formats: selectedFormats.length > 0 ? selectedFormats : null,
        languages: selectedLanguages.length > 0 ? selectedLanguages : null
      };

      console.log(`Виконую запит фільтрації до ${API_URL}/lessons/filter з параметрами:`, filterData);
      
      try {
        const { data } = await api.post('/lessons/filter', filterData);
        console.log("Отримані відфільтровані дані:", data);
        setLessons(data);
      } catch (apiError) {
        console.error("Помилка API фільтрації:", apiError);
        
        // На будь-яку помилку API використовуємо локальну фільтрацію
        console.warn("Використовуємо локальну фільтрацію на демо-даних через помилку API");
          
        // Локальна фільтрація демо-даних
        const filtered = demoLessons.filter(lesson => {
          if (selectedLevels.length > 0 && !selectedLevels.includes(lesson.level)) {
            return false;
          }
          if (selectedCategories.length > 0 && !selectedCategories.includes(lesson.category)) {
            return false;
          }
          if (selectedLanguages.length > 0 && !selectedLanguages.includes(lesson.language)) {
            return false;
          }
          if (selectedFormats.length > 0) {
            const hasSelectedFormat = lesson.formats.some(format => selectedFormats.includes(format));
            if (!hasSelectedFormat) return false;
          }
          return true;
        });
          
        setLessons(filtered);
        setError(`Помилка API: ${apiError.message}. Виконується локальна фільтрація на демо-даних.`);
      }
    } catch (err) {
      console.error("Загальна помилка фільтрації:", err);
      setError(`${err.message}. Використовуються демонстраційні дані.`);
      
      // При будь-якій помилці використовуємо демо-дані
      setLessons(demoLessons);
    } finally {
      setLoading(false);
    }
  };

  // Завантаження початкових даних
  useEffect(() => {
    fetchLessons();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Завантаження відфільтрованих даних при зміні фільтрів
  useEffect(() => {
    // Запускаємо фільтрацію лише якщо фільтри вже застосовані
    if (selectedLevels.length > 0 || 
        selectedCategories.length > 0 ||
        selectedFormats.length > 0 ||
        selectedLanguages.length > 0) {
      fetchFilteredLessons();
    }
  }, [selectedLevels, selectedCategories, selectedFormats, selectedLanguages]); // eslint-disable-line react-hooks/exhaustive-deps

  // Обробники фільтрів
  const handleTempLevelChange = (level) => {
    setTempSelectedLevels(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const applyFilters = () => {
    setSelectedLevels(tempSelectedLevels);
    setSelectedCategories(tempSelectedCategories);
    setSelectedFormats(tempSelectedFormats);
    setSelectedLanguages(tempSelectedLanguages);
  };

  const resetFilters = () => {
    setTempSelectedLevels([]);
    setTempSelectedCategories([]);
    setTempSelectedFormats([]);
    setTempSelectedLanguages([]);
    setSelectedLevels([]);
    setSelectedCategories([]);
    setSelectedFormats([]);
    setSelectedLanguages([]);
  };
// Add this near your other axios setup
const sendCompletionToFirebase = async (lessonId, isCompleted) => {
  try {

    if (!currentUser) {
      throw new Error('Користувач не авторизований');
    }

    const userEmail = currentUser.email; // Отримуємо email користувача
    const completionData = {
      lessonId,
      userEmail,
      completedAt: isCompleted ? new Date().toISOString() : null
    };

    if (isCompleted) {
      await api.post('/completedLessons', completionData);
    } else {
      await api.delete(`/completedLessons/${lessonId}`, {
        data: { userEmail } // Передаємо userEmail для DELETE запиту
      });
    }
  } catch (error) {
    console.error("Помилка оновлення статусу уроку в Firebase:", error);
    // Опціонально: відобразити помилку для користувача
    alert('Помилка: ' + error.message);
  }
};
  // Компонент картки уроку
  const LessonCard = ({ title, level, category, duration, language, image, description, progress, id, formats }) => {
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
      const lessonId = `lesson-${id}`;
      setIsCompleted(localStorage.getItem(lessonId) === 'completed');
    }, [id]);

const toggleCompletion = async () => {
  const lessonId = `lesson-${id}`;
  const newCompletedStatus = !isCompleted;
  
  try {
    // Update local storage
    if (newCompletedStatus) {
      localStorage.setItem(lessonId, 'completed');
    } else {
      localStorage.removeItem(lessonId);
    }
    
    // Update Firebase
    await sendCompletionToFirebase(id, newCompletedStatus, currentUser);
    
    // Update state
    setIsCompleted(newCompletedStatus);
  } catch (error) {
    console.error("Failed to update completion status:", error);
  }
};
    return (
      <div className="card" style={{ 
        marginBottom: '20px',
        opacity: isCompleted ? 0.8 : 1,
        borderLeft: isCompleted ? '5px solid #28a745' : '1px solid #ddd'
      }}>
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="d-flex flex-wrap gap-1 mb-2">
            <span className={`badge ${getLevelBadgeClass(level)}`}>{level}</span>
            <span className={`badge ${getCategoryBadgeClass(category)}`}>{category}</span>
            <span className="badge bg-secondary">{duration}</span>
            <span className="badge bg-info">{language}</span>
          </div>
          <p className="card-text">{description}</p>
          
          <button 
            className={`btn ${isCompleted ? 'btn-success' : 'btn-outline-success'} w-100 mb-3`}
            onClick={toggleCompletion}
          >
            {isCompleted ? '✓ Пройдено' : 'Відзначити як пройдений'}
          </button>
          
          <div className="d-flex flex-wrap gap-1">
            {formats.map(format => (
              <button key={format} className={`btn ${getFormatButtonClass(format)}`}>
                {format}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Допоміжні функції для стилів
  const getLevelBadgeClass = (level) => {
    const classes = {
      'A1': 'bg-primary',
      'A2': 'bg-success',
      'B1': 'bg-warning',
      'B2': 'bg-danger',
      'C1': 'bg-dark'
    };
    return classes[level] || 'bg-secondary';
  };

  const getCategoryBadgeClass = (category) => {
    const classes = {
      'Лексика': 'bg-primary',
      'Граматика': 'bg-danger',
      'Читання': 'bg-info',
      'Культура': 'bg-dark',
      'Розмовна мова': 'bg-warning'
    };
    return classes[category] || 'bg-secondary';
  };

  const getFormatButtonClass = (format) => {
    const classes = {
      'video': 'btn-primary',
      'audio': 'btn-secondary',
      'text': 'btn-info text-white',
      'interactive': 'btn-success'
    };
    return classes[format] || 'btn-outline-secondary';
  };

  // Компонент фільтрів
  const FilterCard = () => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const categories = ['Лексика', 'Граматика', 'Читання', 'Письмо', 'Розмовна мова', 'Культура'];
    const formats = ['video', 'audio', 'text', 'interactive'];
    const languages = ['Українська', 'Англійська', 'Німецька', 'Французька'];

    return (
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Фільтри</h5>
        </div>
        <div className="card-body">
          <h6>Рівень складності</h6>
          {levels.map(level => (
            <div key={level} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`level-${level}`}
                checked={tempSelectedLevels.includes(level)}
                onChange={() => handleTempLevelChange(level)}
              />
              <label className="form-check-label" htmlFor={`level-${level}`}>
                {level}
              </label>
            </div>
          ))}

          <hr />
          
          <h6>Категорії</h6>
          {categories.map(category => (
            <div key={category} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`cat-${category}`}
                checked={tempSelectedCategories.includes(category)}
                onChange={() => setTempSelectedCategories(prev => 
                  prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                )}
              />
              <label className="form-check-label" htmlFor={`cat-${category}`}>
                {category}
              </label>
            </div>
          ))}

          <hr />
          
          <h6>Формат</h6>
          {formats.map(format => (
            <div key={format} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`format-${format}`}
                checked={tempSelectedFormats.includes(format)}
                onChange={() => setTempSelectedFormats(prev => 
                  prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
                )}
              />
              <label className="form-check-label" htmlFor={`format-${format}`}>
                {format === 'video' ? 'Відео' : 
                 format === 'audio' ? 'Аудіо' : 
                 format === 'text' ? 'Текст' : 'Інтерактив'}
              </label>
            </div>
          ))}

          <hr />
          
          <h6>Мова</h6>
          {languages.map(language => (
            <div key={language} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`lang-${language}`}
                checked={tempSelectedLanguages.includes(language)}
                onChange={() => setTempSelectedLanguages(prev => 
                  prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
                )}
              />
              <label className="form-check-label" htmlFor={`lang-${language}`}>
                {language}
              </label>
            </div>
          ))}

          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={applyFilters}>
              Застосувати
            </button>
            <button className="btn btn-outline-secondary" onClick={resetFilters}>
              Скинути
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <FilterCard />
        </div>
        
        <div className="col-md-9">
          <h2>Уроки</h2>
          
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Завантаження...</span>
              </div>
              <p>Завантаження уроків...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">
              Помилка: {error}
            </div>
          ) : (
            <>
              {lessons.length === 0 ? (
                <div className="alert alert-warning">
                  Уроків за обраними критеріями не знайдено
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                  {lessons.map(lesson => (
                    <div key={lesson.id} className="col">
                      <LessonCard {...lesson} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}