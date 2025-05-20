// src/pages/PracticePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ProgressPage() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8">
          <section id="progress" className="progress-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Мій прогрес</h2>
              <div className="btn-group">
                <button type="button" className="btn btn-outline-primary active">Тиждень</button>
                <button type="button" className="btn btn-outline-primary">Місяць</button>
                <button type="button" className="btn btn-outline-primary">Рік</button>
              </div>
            </div>

            <ul className="nav nav-tabs mb-4" id="progressTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="overview-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#overview"
                  type="button"
                  role="tab"
                  aria-controls="overview"
                  aria-selected="true"
                >
                  Огляд
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="skills-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#skills"
                  type="button"
                  role="tab"
                  aria-controls="skills"
                  aria-selected="false"
                >
                  Навички
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="vocabulary-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#vocabulary"
                  type="button"
                  role="tab"
                  aria-controls="vocabulary"
                  aria-selected="false"
                >
                  Словник
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="achievements-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#achievements"
                  type="button"
                  role="tab"
                  aria-controls="achievements"
                  aria-selected="false"
                >
                  Досягнення
                </button>
              </li>
            </ul>

            <div className="tab-content" id="progressTabsContent">
              <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                <div className="row">
                  <div className="col-md-6">
                    <div className="progress-card">
                      <div className="d-flex justify-content-between">
                        <h3>Рівень володіння</h3>
                        <span className="badge bg-primary fs-5">B2</span>
                      </div>
                      <p>До рівня C1 залишилось: 35%</p>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: '65%' }}
                          aria-valuenow="65"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          B2
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <small>A1</small>
                        <small>A2</small>
                        <small>B1</small>
                        <small>B2</small>
                        <small>C1</small>
                        <small>C2</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="progress-card">
                      <h3>Статистика</h3>
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Днів вивчення
                          <span className="badge bg-primary rounded-pill">45</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Завершені уроки
                          <span className="badge bg-primary rounded-pill">12</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Загальний час
                          <span className="badge bg-primary rounded-pill">24 год</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Вивчені слова
                          <span className="badge bg-primary rounded-pill">320</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="progress-card mt-4">
                  <h3>Активність цього тижня</h3>
                  <div className="streak-calendar">
                    <div className="calendar-day day-completed">Пн</div>
                    <div className="calendar-day day-completed">Вт</div>
                    <div className="calendar-day day-completed">Ср</div>
                    <div className="calendar-day day-completed">Чт</div>
                    <div className="calendar-day day-missed">Пт</div>
                    <div className="calendar-day day-completed">Сб</div>
                    <div className="calendar-day day-current">Нд</div>
                  </div>
                  <div className="mt-3">
                    <p>
                      <i className="bi bi-fire text-danger"></i> Поточна серія: <strong>3 дні</strong> | Найдовша серія: <strong>30 днів</strong>
                    </p>
                    <p>Тижнева ціль: 5 годин</p>
                    <div className="weekly-goal">
                      <div className="weekly-goal-progress" style={{ width: '70%' }}></div>
                    </div>
                    <small>3.5 / 5 годин</small>
                  </div>
                </div>

                <div className="progress-card mt-4">
                  <h3>Таймер навчання</h3>
                  <div className="study-timer text-center">
                    <div className="timer-display display-4 mb-3">{formatTime(timer)}</div>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-success"
                        id="startTimer"
                        onClick={startTimer}
                        disabled={isRunning}
                      >
                        <i className="bi bi-play-fill"></i> Почати
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id="stopTimer"
                        onClick={stopTimer}
                        disabled={!isRunning}
                      >
                        <i className="bi bi-stop-fill"></i> Зупинити
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        id="resetTimer"
                        onClick={resetTimer}
                      >
                        <i className="bi bi-arrow-counterclockwise"></i> Скинути
                      </button>
                    </div>
                  </div>
                </div>

                <div className="progress-card mt-4">
                  <h3>Нещодавня активність</h3>
                  <div className="recent-activity-item">
                    <p className="mb-1"><strong>Урок завершено:</strong> "Умовний спосіб дієслів"</p>
                    <small className="text-muted">Сьогодні, 14:32 | Оцінка: 85%</small>
                  </div>
                  <div className="recent-activity-item">
                    <p className="mb-1"><strong>Практика:</strong> Аудіювання "Українські традиції"</p>
                    <small className="text-muted">Вчора, 19:15 | Тривалість: 25 хв</small>
                  </div>
                  <div className="recent-activity-item">
                    <p className="mb-1"><strong>Словник:</strong> Додано 15 нових слів</p>
                    <small className="text-muted">10.03.2025, 20:45</small>
                  </div>
                  <div className="recent-activity-item">
                    <p className="mb-1"><strong>Тест пройдено:</strong> "Відмінювання іменників"</p>
                    <small className="text-muted">09.03.2025, 10:30 | Оцінка: 92%</small>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="skills" role="tabpanel" aria-labelledby="skills-tab">
                <div className="progress-card">
                  <h3>Мовні навички</h3>
                  {[
                    { name: 'Говоріння', value: 70, color: 'bg-success' },
                    { name: 'Аудіювання', value: 65, color: 'bg-info' },
                    { name: 'Читання', value: 85, color: 'bg-warning' },
                    { name: 'Письмо', value: 60, color: 'bg-danger' },
                  ].map((skill) => (
                    <div className="skill-progress" key={skill.name}>
                      <div className="d-flex justify-content-between">
                        <h5>{skill.name}</h5>
                        <span>{skill.value}%</span>
                      </div>
                      <div className="progress">
                        <div
                          className={`progress-bar ${skill.color}`}
                          role="progressbar"
                          style={{ width: `${skill.value}%` }}
                          aria-valuenow={skill.value}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="progress-card mt-4">
                  <h3>Граматичні теми</h3>
                  {[
                    { name: 'Відмінювання іменників', value: 90 },
                    { name: 'Часи дієслів', value: 75 },
                    { name: 'Прийменники', value: 60 },
                    { name: 'Складносурядні речення', value: 45 },
                  ].map((topic) => (
                    <div className="skill-progress" key={topic.name}>
                      <div className="d-flex justify-content-between">
                        <h5>{topic.name}</h5>
                        <span>{topic.value}%</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${topic.value}%` }}
                          aria-valuenow={topic.value}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="recommendations-card mt-4">
                  <h4><i className="bi bi-lightbulb"></i> Рекомендації для покращення</h4>
                  <p>Базуючись на ваших результатах, ми рекомендуємо зосередитись на таких навичках:</p>
                  <ol>
                    <li>Більше практикуйте письмо — спробуйте щодня писати короткий текст українською</li>
                    <li>Тренуйте використання прийменників у різних контекстах</li>
                    <li>Приділіть увагу складним реченням та їх побудові</li>
                  </ol>
                  <a href="#" className="btn btn-primary mt-2">Отримати персоналізований план навчання</a>
                </div>
              </div>

              <div className="tab-pane fade" id="vocabulary" role="tabpanel" aria-labelledby="vocabulary-tab">
                <div className="progress-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>Мій словник</h3>
                    <div>
                      <span className="badge bg-primary">320 слів</span>
                      <button className="btn btn-sm btn-outline-success ms-2">
                        <i className="bi bi-plus-lg"></i> Додати слова
                      </button>
                    </div>
                  </div>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Пошук слів..."
                      aria-label="Пошук слів"
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                  <div className="mb-3">
                    <select className="form-select">
                      <option selected>Сортувати за...</option>
                      <option>Алфавітом (А-Я)</option>
                      <option>Алфавітом (Я-А)</option>
                      <option>Нещодавно додані</option>
                      <option>Складність (зростання)</option>
                      <option>Складність (спадання)</option>
                    </select>
                  </div>
                  <div className="vocabulary-list mt-4">
                    {[
                      { word: 'спілкування', translation: 'communication', status: 'Вивчено', statusColor: 'bg-success' },
                      { word: 'доброзичливість', translation: 'benevolence, goodwill', status: 'Вивчається', statusColor: 'bg-warning' },
                      { word: 'враження', translation: 'impression', status: 'Вивчено', statusColor: 'bg-success' },
                      { word: 'запропонувати', translation: 'to offer, to suggest', status: 'Повторити', statusColor: 'bg-danger' },
                      { word: 'розвиток', translation: 'development', status: 'Вивчено', statusColor: 'bg-success' },
                    ].map((item) => (
                      <div className="vocabulary-item" key={item.word}>
                        <div>
                          <strong>{item.word}</strong> - {item.translation}
                        </div>
                        <div>
                          <span className={`badge ${item.statusColor}`}>{item.status}</span>
                          <button className="btn btn-sm btn-outline-primary ms-1">
                            <i className="bi bi-volume-up"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <nav aria-label="..." className="mt-3">
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <a className="page-link">Попередня</a>
                      </li>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#">Наступна</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="progress-card mt-4">
                  <h3>Тематичні групи слів</h3>
                  <div className="row mt-3">
                    {[
                      { title: 'Подорожі', count: 42, progress: 75 },
                      { title: 'Їжа', count: 65, progress: 90 },
                      { title: 'Робота', count: 38, progress: 60 },
                      { title: 'Почуття', count: 29, progress: 45 },
                      { title: 'Технології', count: 34, progress: 70 },
                      { title: 'Природа', count: 51, progress: 80 },
                    ].map((group) => (
                      <div className="col-md-4 mb-3" key={group.title}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">
                              {group.title} <span className="badge bg-primary">{group.count}</span>
                            </h5>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${group.progress}%` }}
                                aria-valuenow={group.progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {group.progress}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="achievements" role="tabpanel" aria-labelledby="achievements-tab">
                <div className="progress-card">
                  <h3>Мої досягнення</h3>
                  <div className="row mt-3">
                    {[
                      { icon: '🏆', title: 'Послідовність 30 днів', desc: 'Вивчайте українську 30 днів поспіль', progress: 100, color: 'bg-success' },
                      { icon: '📚', title: 'Вивчено 3 теми', desc: 'Завершіть 3 тематичні модулі', progress: 100, color: 'bg-success' },
                      { icon: '🗣️', title: 'Перший діалог', desc: 'Проведіть перший діалог українською', progress: 100, color: 'bg-success' },
                      { icon: '💯', title: 'Ідеальний тест', desc: 'Отримайте 100% правильних відповідей в тесті', progress: 50, color: 'bg-warning' },
                      { icon: '📝', title: 'Письменник', desc: 'Напишіть 5 повних есе українською', progress: 40, color: 'bg-warning' },
                      { icon: '📘', title: 'Словниковий запас', desc: 'Вивчіть 500 слів', progress: 64, color: 'bg-info' },
                      { icon: '🎧', title: 'Слухач', desc: 'Прослухайте 10 годин аудіоматеріалів', progress: 70, color: 'bg-info' },
                      { icon: '🎭', title: 'Комунікатор', desc: 'Спілкуйтеся з 5 різними співрозмовниками', progress: 20, color: 'bg-secondary' },
                    ].map((achievement) => (
                      <div className="col-md-6 mb-3" key={achievement.title}>
                        <div className="card bg-light">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <span className="achievement-icon">{achievement.icon}</span>
                              <div>
                                <h5 className="card-title mb-1">{achievement.title}</h5>
                                <p className="card-text mb-1">{achievement.desc}</p>
                                <div className="progress mt-2">
                                  <div
                                    className={`progress-bar ${achievement.color}`}
                                    role="progressbar"
                                    style={{ width: `${achievement.progress}%` }}
                                    aria-valuenow={achievement.progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    {achievement.progress}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="progress-card mt-4">
                  <h3>Наступні цілі</h3>
                  <div className="row mt-3">
                    {[
                      { icon: '🌟', title: 'Досягнути рівня C1', desc: 'Залишилось 35%', button: 'Переглянути план' },
                      { icon: '📱', title: 'Серія 60 днів', desc: 'Прогрес: 45/60', button: 'Деталі' },
                      { icon: '🏅', title: 'Розмовна майстерність', desc: '10 годин розмовної практики', button: 'Почати' },
                    ].map((goal) => (
                      <div className="col-md-4 mb-3" key={goal.title}>
                        <div className="card">
                          <div className="card-body text-center">
                            <div className="display-4 mb-2">{goal.icon}</div>
                            <h5 className="card-title">{goal.title}</h5>
                            <p className="card-text text-muted">{goal.desc}</p>
                            <button className="btn btn-sm btn-outline-primary">{goal.button}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="col-lg-4">
          <div className="progress-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Рекомендації</h3>
              <button className="btn btn-sm btn-outline-primary">Оновити</button>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Сьогоднішній план</h5>
                <ul className="list-group list-group-flush">
                  {[
                    { icon: 'bi-book', color: 'text-primary', title: 'Урок: Умовний спосіб дієслів' },
                    { icon: 'bi-journal-text', color: 'text-warning', title: 'Практика: Письмо' },
                    { icon: 'bi-card-list', color: 'text-info', title: 'Повторення: 15 слів' },
                  ].map((plan) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center px-0"
                      key={plan.title}
                    >
                      <div>
                        <i className={`bi ${plan.icon} ${plan.color}`}></i> {plan.title}
                      </div>
                      <button className="btn btn-sm btn-outline-primary">Почати</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Наступні уроки</h5>
                <div className="list-group">
                  {[
                    {
                      title: 'Прийменники руху',
                      level: 'B2',
                      desc: 'Вивчіть правила використання прийменників для опису руху',
                      time: 'Приблизно 45 хв',
                    },
                    {
                      title: 'Складні речення',
                      level: 'B2',
                      desc: 'Навчіться будувати складні речення з кількома підрядними',
                      time: 'Приблизно 60 хв',
                    },
                    {
                      title: 'Професійна лексика',
                      level: 'B2+',
                      desc: 'Розширте словниковий запас для ділового спілкування',
                      time: 'Приблизно 50 хв',
                    },
                  ].map((lesson) => (
                    <a href="#" className="list-group-item list-group-item-action" key={lesson.title}>
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{lesson.title}</h6>
                        <small className="text-muted">{lesson.level}</small>
                      </div>
                      <p className="mb-1">{lesson.desc}</p>
                      <small>
                        <i className="bi bi-clock"></i> {lesson.time}
                      </small>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Корисні ресурси</h5>
                <div className="list-group">
                  {[
                    { icon: 'bi-newspaper', color: 'text-primary', title: 'Новини спрощеною українською', desc: 'Для рівнів B1-B2' },
                    { icon: 'bi-headphones', color: 'text-success', title: 'Подкасти українською', desc: 'Різні теми та рівні складності' },
                    { icon: 'bi-people', color: 'text-warning', title: 'Розмовні клуби', desc: 'Практика з носіями мови' },
                  ].map((resource) => (
                    <a href="#" className="list-group-item list-group-item-action" key={resource.title}>
                      <div className="d-flex align-items-center">
                        <i className={`bi ${resource.icon} ${resource.color} me-2`}></i>
                        <div>
                          <h6 className="mb-0">{resource.title}</h6>
                          <small>{resource.desc}</small>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Цитата дня</h5>
                <figure>
                  <blockquote className="blockquote">
                    <p>Хто не знає чужих мов, той нічого не знає і про свою.</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    Йоганн Вольфганг фон Гете
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="progress-card">
            <h3>Сертифікація</h3>
            <p>Підготуйтеся до міжнародного іспиту з української мови та отримайте офіційний сертифікат!</p>
            <div className="row">
              <div className="col-md-8">
                <h5>Ваша готовність до іспиту B2:</h5>
                <div className="progress mb-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '65%' }}
                    aria-valuenow="65"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    65%
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-group mb-3">
                      {[
                        { title: 'Граматика: 75%', icon: 'bi-check-circle-fill', color: 'text-success' },
                        { title: 'Лексика: 70%', icon: 'bi-check-circle-fill', color: 'text-success' },
                        { title: 'Аудіювання: 60%', icon: 'bi-exclamation-circle-fill', color: 'text-warning' },
                      ].map((item) => (
                        <li className="list-group-item" key={item.title}>
                          <i className={`bi ${item.icon} ${item.color} me-2`}></i> {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-group mb-3">
                      {[
                        { title: 'Читання: 80%', icon: 'bi-check-circle-fill', color: 'text-success' },
                        { title: 'Письмо: 55%', icon: 'bi-exclamation-circle-fill', color: 'text-warning' },
                        { title: 'Говоріння: 60%', icon: 'bi-exclamation-circle-fill', color: 'text-warning' },
                      ].map((item) => (
                        <li className="list-group-item" key={item.title}>
                          <i className={`bi ${item.icon} ${item.color} me-2`}></i> {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <button className="btn btn-primary">Підготуватися до іспиту</button>
                <p className="mt-2"><small>Наступний іспит: 15 квітня 2025</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <h3>Запросіть друзів до вивчення української!</h3>
              <p>Навчатися разом цікавіше та ефективніше. Запросіть друзів та отримайте бонусні дні преміум-доступу.</p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Електронна пошта друга"
                  aria-label="Електронна пошта друга"
                />
                <button className="btn btn-primary" type="button">
                  Запросити
                </button>
              </div>
              <p><small>або поділіться посиланням:</small></p>
              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-outline-primary"><i className="bi bi-facebook"></i></button>
                <button className="btn btn-outline-info"><i className="bi bi-telegram"></i></button>
                <button className="btn btn-outline-success"><i className="bi bi-whatsapp"></i></button>
                <button className="btn btn-outline-secondary"><i className="bi bi-envelope"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}