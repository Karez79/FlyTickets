import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <video
        autoPlay
        loop
        muted
        className="not-found__video"
        src="src/assets/404.mp4"
      >
        Ваш браузер не поддерживает видео.
      </video>
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Страница не найдена</p>
        <button
          className="not-found__button"
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}
