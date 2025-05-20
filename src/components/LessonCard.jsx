const LessonCard = ({ title, level, category, duration, language, image, description, progress, id }) => {
  const levelColors = { A1: 'bg-primary', A2: 'bg-success', B1: 'bg-warning', B2: 'bg-danger', C1: 'bg-dark' };
  const categoryColors = {
    Лексика: 'bg-primary',
    Граматика: 'bg-danger',
    Читання: 'bg-info',
    Культура: 'bg-dark',
    'Розмовна мова': 'bg-warning',
  };

  return (
    <div style={styles.lessonCard}>
      <h3>{title}</h3>
      <div className="lesson-meta mb-2">
        <span className={`badge ${levelColors[level] || 'bg-secondary'} me-1`}>{level}</span>
        <span className={`badge ${categoryColors[category] || 'bg-secondary'} me-1`}>{category}</span>
        <span className="badge bg-secondary me-1">{duration}</span>
        <span className="badge bg-info">{language}</span>
      </div>
      <img src={image} alt={title} style={styles.lessonImage} />
      <p className="mt-2">{description}</p>
      <ProgressBar progress={progress} />
      <div style={styles.lessonMedia}>
        <a href={`video-lesson.html?id=${id}`} className="btn btn-primary">Відео</a>
        <a href={`audio-lesson.html?id=${id}`} className="btn btn-secondary">Аудіо</a>
        <a href={`text-lesson.html?id=${id}`} className="btn btn-info text-white">Текст</a>
      </div>
    </div>
  );
};

