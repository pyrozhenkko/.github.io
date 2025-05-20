const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const path = require('path');

// Инициализация Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-react-867b8.firebaseio.com"
});

const db = admin.firestore();
const app = express();

// Розширена конфігурація CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Базовые заголовки безопасности
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// API маршруты
app.get('/api/test', (req, res) => {
  res.json({ message: 'Сервер работает!' });
});

app.get('/api/lessons', async (req, res) => {
  try {
    const snapshot = await db.collection('lessons').get();
    
    // Якщо колекція пуста, повертаємо демо-дані
    if (snapshot.empty) {
      console.log('Колекція уроків порожня, повертаємо демо-дані');
      const demoLessons = [
        {
          id: 'demo1',
          title: 'Базовий словниковий запас',
          level: 'A1',
          category: 'Лексика',
          duration: '30 хв',
          language: 'Українська',
          image: 'https://via.placeholder.com/300x200?text=Vocabulary',
          description: 'Вивчення основних слів та фраз для початківців.',
          formats: ['video', 'text']
        },
        {
          id: 'demo2',
          title: 'Теперішній час дієслів',
          level: 'B1',
          category: 'Граматика',
          duration: '45 хв',
          language: 'Англійська',
          image: 'https://via.placeholder.com/300x200?text=Grammar',
          description: 'Правила використання теперішнього часу в англійській мові.',
          formats: ['audio', 'interactive']
        },
        {
          id: 'demo3',
          title: 'Культура Німеччини',
          level: 'A2',
          category: 'Культура',
          duration: '60 хв',
          language: 'Німецька',
          image: 'https://via.placeholder.com/300x200?text=Culture',
          description: 'Огляд культурних особливостей та традицій Німеччини.',
          formats: ['video', 'text']
        },
        {
          id: 'demo4',
          title: 'Розмовні вправи',
          level: 'B2',
          category: 'Розмовна мова',
          duration: '40 хв',
          language: 'Французька',
          image: 'https://via.placeholder.com/300x200?text=Speaking',
          description: 'Практичні вправи для розвитку розмовних навичок.',
          formats: ['audio', 'interactive']
        },
        {
          id: 'demo5',
          title: 'Читання оповідань',
          level: 'C1',
          category: 'Читання',
          duration: '50 хв',
          language: 'Українська',
          image: 'https://via.placeholder.com/300x200?text=Reading',
          description: 'Читання та аналіз коротких оповідань українською мовою.',
          formats: ['text']
        }
      ];
      
      return res.json(demoLessons);
    }
    
    const lessons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(lessons);
  } catch (error) {
    console.error('Ошибка получения уроков:', error);
    res.status(500).json({ error: 'Не удалось загрузить уроки' });
  }
});

// Додаємо маршрут для фільтрації уроків
app.post('/api/lessons/filter', async (req, res) => {
  try {
    const { levels, categories, formats, languages } = req.body;
    
    let query = db.collection('lessons');
    
    // Спроба фільтрації - це спрощений підхід, у реальному додатку 
    // потрібно використовувати більш складну логіку для складних фільтрів
    if (levels && levels.length > 0) {
      query = query.where('level', 'in', levels);
    }
    
    if (categories && categories.length > 0 && categories.length === 1) {
      query = query.where('category', '==', categories[0]);
    }
    
    if (languages && languages.length > 0 && languages.length === 1) {
      query = query.where('language', '==', languages[0]);
    }
    
    const snapshot = await query.get();
    
    if (snapshot.empty) {
      // Якщо немає результатів, виконуємо локальну фільтрацію на демо-даних
      const demoLessons = [
        {
          id: 'demo1',
          title: 'Базовий словниковий запас',
          level: 'A1',
          category: 'Лексика',
          duration: '30 хв',
          language: 'Українська',
          image: 'https://via.placeholder.com/300x200?text=Vocabulary',
          description: 'Вивчення основних слів та фраз для початківців.',
          formats: ['video', 'text']
        },
        {
          id: 'demo2',
          title: 'Теперішній час дієслів',
          level: 'B1',
          category: 'Граматика',
          duration: '45 хв',
          language: 'Англійська',
          image: 'https://via.placeholder.com/300x200?text=Grammar',
          description: 'Правила використання теперішнього часу в англійській мові.',
          formats: ['audio', 'interactive']
        },
        {
          id: 'demo3',
          title: 'Культура Німеччини',
          level: 'A2',
          category: 'Культура',
          duration: '60 хв',
          language: 'Німецька',
          image: 'https://via.placeholder.com/300x200?text=Culture',
          description: 'Огляд культурних особливостей та традицій Німеччини.',
          formats: ['video', 'text']
        },
        {
          id: 'demo4',
          title: 'Розмовні вправи',
          level: 'B2',
          category: 'Розмовна мова',
          duration: '40 хв',
          language: 'Французька',
          image: 'https://via.placeholder.com/300x200?text=Speaking',
          description: 'Практичні вправи для розвитку розмовних навичок.',
          formats: ['audio', 'interactive']
        },
        {
          id: 'demo5',
          title: 'Читання оповідань',
          level: 'C1',
          category: 'Читання',
          duration: '50 хв',
          language: 'Українська',
          image: 'https://via.placeholder.com/300x200?text=Reading',
          description: 'Читання та аналіз коротких оповідань українською мовою.',
          formats: ['text']
        }
      ];
      
      // Фільтрація на стороні сервера
      const filtered = demoLessons.filter(lesson => {
        if (levels && levels.length > 0 && !levels.includes(lesson.level)) {
          return false;
        }
        if (categories && categories.length > 0 && !categories.includes(lesson.category)) {
          return false;
        }
        if (languages && languages.length > 0 && !languages.includes(lesson.language)) {
          return false;
        }
        if (formats && formats.length > 0) {
          const hasFormat = lesson.formats.some(format => formats.includes(format));
          if (!hasFormat) return false;
        }
        return true;
      });
      
      return res.json(filtered);
    }
    
    let lessons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Додаткова фільтрація для складних випадків
    if (formats && formats.length > 0) {
      lessons = lessons.filter(lesson => {
        return lesson.formats && lesson.formats.some(format => formats.includes(format));
      });
    }
    
    // Додаткова фільтрація для категорій, якщо їх більше одного
    if (categories && categories.length > 1) {
      lessons = lessons.filter(lesson => categories.includes(lesson.category));
    }
    
    // Додаткова фільтрація для мов, якщо їх більше одного
    if (languages && languages.length > 1) {
      lessons = lessons.filter(lesson => languages.includes(lesson.language));
    }
    
    res.json(lessons);
  } catch (error) {
    console.error('Помилка фільтрації уроків:', error);
    res.status(500).json({ error: 'Не вдалося відфільтрувати уроки' });
  }
});

// Додаємо обслуговування React додатку в режимі виробництва
if (process.env.NODE_ENV === 'production') {
  // Шлях до статичних файлів React
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Всі запити, які не обробляються API маршрутами, перенаправляються на React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  // В режимі розробки показуємо повідомлення для кореневого маршруту
  app.get('/', (req, res) => {
    res.send('Сервер працює в режимі розробки. Використовуйте React додаток на порту 3000.');
  });
}
// POST маршрут для збереження пройденого уроку
app.post('/api/completedLessons', async (req, res) => {
  try {
    const { lessonId, userEmail, completedAt } = req.body;

    // Перевірка, чи всі необхідні дані присутні
    if (!lessonId || !userEmail || !completedAt) {
      return res.status(400).json({ error: 'Необхідно вказати lessonId, userEmail та completedAt' });
    }

    const docRef = await db.collection('completedLessons').add({
      lessonId,
      userEmail,
      completedAt,
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Помилка збереження пройденого уроку:', error);
    res.status(500).json({ error: 'Не вдалося зберегти пройдений урок' });
  }
});

// DELETE маршрут для видалення статусу пройденого уроку
app.delete('/api/completedLessons/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: 'Необхідно вказати userEmail' });
    }

    const snapshot = await db.collection('completedLessons')
      .where('lessonId', '==', lessonId)
      .where('userEmail', '==', userEmail)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'Запис про пройдений урок не знайдено' });
    }

    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    res.status(200).json({ message: 'Статус пройденого уроку видалено' });
  } catch (error) {
    console.error('Помилка видалення пройденого уроку:', error);
    res.status(500).json({ error: 'Не вдалося видалити статус пройденого уроку' });
  }
});
app.get('/api/completedLessons', async (req, res) => {
  try {
    const { userEmail, startDate, endDate } = req.query;

    if (!userEmail) {
      return res.status(400).json({ error: 'Необхідно вказати userEmail' });
    }

    let query = db.collection('completedLessons').where('userEmail', '==', userEmail);

    // Фільтрація за датою
    if (startDate) {
      query = query.where('completedAt', '>=', startDate);
    }
    if (endDate) {
      query = query.where('completedAt', '<=', endDate);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const completedLessons = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Додаємо інформацію про уроки з колекції 'lessons'
    const lessonPromises = completedLessons.map(async (completed) => {
      const lessonSnapshot = await db.collection('lessons').doc(completed.lessonId).get();
      if (lessonSnapshot.exists) {
        return {
          ...completed,
          lessonDetails: { id: lessonSnapshot.id, ...lessonSnapshot.data() },
        };
      }
      return completed;
    });

    const results = await Promise.all(lessonPromises);
    res.status(200).json(results);
  } catch (error) {
    console.error('Помилка отримання пройдених уроків:', error);
    res.status(500).json({ error: 'Не вдалося отримати пройдені уроки' });
  }
});
// Обработка 404 для несуществующих маршрутов
app.use((req, res) => {
  res.status(404).send('Сторінка не знайдена');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Для доступу до API використовуйте http://localhost:${PORT}/api/lessons`);
  console.log(`Для доступу до React додатку використовуйте http://localhost:3000`);
});