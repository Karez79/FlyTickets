import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TicketsList from '../TicketsList/TicketsList';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false); // Скрываем загрузку после 2 секунд
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />; // Показываем анимацию загрузки
  }

  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <img src="/assets/plane-icon.svg" alt="Plane icon" className="app__icon" />
        </header>
        <main className="app__main">
          <Routes>
            <Route path="/" element={<TicketsList />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
