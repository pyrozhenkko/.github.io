// src/pages/PracticePage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function PracticePage() {
  return (
    <div className="main-section">
      <div className="container">
        <h1 className="text-center mb-4">Практика української мови</h1>
        <p className="text-center mb-5">Оберіть тип вправи для покращення ваших навичок</p>

        <div className="quick-test">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4>Випадковий тест</h4>
              <p>Хочете перевірити свої знання прямо зараз? Розпочніть випадковий тест з різних тем української мови та перевірте свій рівень!</p>
            </div>
            <div className="col-md-4 text-center">
              <button className="btn btn-warning btn-lg btn-fixed-size">Розпочати випадковий тест</button>
            </div>
          </div>
        </div>

        <div className="row">
          {[
            {
              title: 'Тестування',
              desc: 'Перевірте свої знання з різних тем та розділів української мови',
              items: ['Граматика', 'Лексика', 'Правопис'],
              buttonText: 'Почати тест',
              buttonClass: 'btn-primary',
            },
            {
              title: 'Діалоги',
              desc: 'Практикуйте розмовну українську мову в інтерактивних діалогах',
              items: ['Щоденні розмови', 'Ділова українська', 'Культурні теми'],
              buttonText: 'Розпочати діалог',
              buttonClass: 'btn-primary',
            },
            {
              title: 'Вправи',
              desc: 'Закріпіть вивчений матеріал за допомогою практичних завдань',
              items: ['Заповнення пропусків', 'Виправлення помилок', 'Переклад речень'],
              buttonText: 'Виконати вправи',
              buttonClass: 'btn-primary',
            },
          ].map((card) => (
            <div className="col-md-4 mb-4" key={card.title}>
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">{card.title}</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <p>{card.desc}</p>
                  <ul className="list-unstyled">
                    {card.items.map((item) => (
                      <li key={item}>
                        <i className="bi bi-check-circle"></i> {item}
                      </li>
                    ))}
                  </ul>
                  {card.link ? (
                    <Link to={card.link}>
                      <button className={`btn ${card.buttonClass} mt-auto btn-fixed-size`}>
                        {card.buttonText}
                      </button>
                    </Link>
                  ) : (
                    <button className={`btn ${card.buttonClass} mt-auto btn-fixed-size`}>
                      {card.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="progress-section">
          <h3 className="text-center mb-4">Ваш прогрес</h3>
          <div className="row text-center">
            {[
              { number: '78%', label: 'Загальний прогрес' },
              { number: '42', label: 'Пройдені уроки' },
              { number: '835', label: 'Вивчені слова' },
              { number: '12', label: 'Днів поспіль' },
            ].map((stat) => (
              <div className="col-md-3 mb-3" key={stat.label}>
                <div className="stats-card">
                  <div className="stats-number">{stat.number}</div>
                  <div>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <Link to="/progress">
              <button className="btn btn-success btn-fixed-size">Переглянути детальну статистику</button>
            </Link>
          </div>
        </div>

        <h3 className="text-center my-4">Рекомендовані теми</h3>
        <div className="row">
          {[
            {
              title: 'Правопис префіксів',
              desc: 'Вивчіть правила написання префіксів в українській мові. Закріпіть знання з допомогою інтерактивних вправ.',
            },
            {
              title: 'Наголоси в іменниках',
              desc: 'Складні випадки наголошування іменників. Слухайте правильну вимову та практикуйтеся.',
            },
          ].map((topic) => (
            <div className="col-md-6 mb-4" key={topic.title}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{topic.title}</h5>
                  <p className="card-text">{topic.desc}</p>
                  <button className="btn btn-outline-primary btn-fixed-size">Перейти до теми</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h4 className="text-center my-4">Популярні теги</h4>
        <div className="text-center mb-5">
          {[
            { tag: 'Граматика', color: 'bg-primary' },
            { tag: 'Лексика', color: 'bg-success' },
            { tag: 'Фразеологізми', color: 'bg-info' },
            { tag: 'Правопис', color: 'bg-warning' },
            { tag: 'Наголоси', color: 'bg-danger' },
            { tag: 'Синтаксис', color: 'bg-secondary' },
            { tag: 'Пунктуація', color: 'bg-dark' },
          ].map((tag) => (
            <span className={`badge ${tag.color} badge-lg`} key={tag.tag}>
              {tag.tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}