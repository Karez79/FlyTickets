import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import TicketsList from "../TicketsList/TicketsList";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { fetchExchangeRates } from "../Api/exchangeRates";

type Currency = "RUB" | "USD" | "EUR";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRatesLoading, setIsRatesLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>({
    RUB: 1,
    USD: 0,
    EUR: 0,
  });

  useEffect(() => {
    const loadExchangeRates = async () => {
      setIsRatesLoading(true);

      const rates = await fetchExchangeRates();
      setExchangeRates(rates);

      setTimeout(() => {
        setIsRatesLoading(false);
        setIsLoading(false);
      }, 2000);
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
          <a
            href="https://fly-tickets.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/biplan.png" alt="Logo" className="app__icon" />
          </a>
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
