import React from 'react';

export default function Some() {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">Що кажуть наші учні</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Олена"
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <h5 className="mb-0">Олена М.</h5>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                </div>
                <p className="card-text">
                  "Дуже зручна платформа, яка дозволяє вивчати українську у своєму темпі. Особливо подобаються інтерактивні вправи та аудіоматеріали для покращення вимови."
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Джон"
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <h5 className="mb-0">Джон С.</h5>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                  </div>
                </div>
                <p className="card-text">
                  "За два місяці використання сайту я зміг значно покращити свою українську. Тепер впевнено спілкуюся з колегами без перекладача. Чудові уроки та підтримка спільноти!"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Марія"
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <h5 className="mb-0">Марія К.</h5>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                    </div>
                  </div>
                </div>
                <p className="card-text">
                  "Як викладач української, рекомендую цю платформу своїм студентам для додаткової практики. Матеріали дуже якісні та відповідають сучасним методикам викладання."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}