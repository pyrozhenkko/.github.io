import React from "react";

const PremiumPlanSection = () => {
  return (
    <section className="my-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Вивчайте українську ефективніше з преміум-планом</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h4>Переваги преміум-аккаунту:</h4>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Необмежений доступ до всіх уроків та матеріалів
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Персональний план навчання
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Завдання з перевіркою від носіїв мови
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Щотижневі відеозустрічі з викладачем
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Доступ до розширеної бібліотеки матеріалів
                </li>
              </ul>
            </div>
            <div className="col-md-4 text-center">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Місячна підписка</h5>
                  <h2 className="my-3">299 грн</h2>
                  <p className="card-text text-muted">на місяць</p>
                  <button className="btn btn-primary btn-lg w-100">
                    Отримати преміум
                  </button>
                </div>
              </div>
              <p className="text-muted mt-2">Можна скасувати у будь-який момент</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumPlanSection;
