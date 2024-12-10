import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TicketsList from '../TicketsList/TicketsList';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { fetchExchangeRates } from '../Api/exchangeRates';

type Currency = 'RUB' | 'USD' | 'EUR';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRatesLoading, setIsRatesLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>({
    RUB: 1, // Базовая валюта
    USD: 0,  // Инициализируем с 0, будет заменено
    EUR: 0,  // Инициализируем с 0, будет заменено
  });

  useEffect(() => {
    const loadExchangeRates = async () => {
      setIsRatesLoading(true);

      // Загрузка курсов валют
      const rates = await fetchExchangeRates();
      setExchangeRates(rates);

      // Задержка для показа анимации загрузки
      setTimeout(() => {
        setIsRatesLoading(false);
        setIsLoading(false);
      }, 2000); // Задержка в 2 секунды
    };

    loadExchangeRates();
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <img src="/biplan.png" alt="Logo" className="app__icon" />
        </header>
        <main className="app__main">
          <Routes>
            <Route
              path="/"
              element={
                <TicketsList
                  exchangeRates={exchangeRates}
                  isRatesLoading={isRatesLoading}
                />
              }
            />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
