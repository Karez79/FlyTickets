import './LoadingAnimation.css';

export default function LoadingAnimation() {
  const messages = ['Загружаем билеты...', 'Ищем адекватные цены...'];

  return (
    <main className="loading-animation">
      <div className="loading-animation__container">
        <div className="loading-animation__airplane">
          <img
            src="https://i.ibb.co/Fn6J7KH/biplan.png"
            alt="biplan"
            className="loading-animation__img"
          />
        </div>
        <div className="loading-animation__text">
          {messages.map((message, index) => (
            <p key={index} className={`loading-animation__message loading-animation__message--${index}`}>
              {message}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
