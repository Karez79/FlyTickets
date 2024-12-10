import './Filter.css';
import { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';

type Currency = 'RUB' | 'USD' | 'EUR';

interface FilterProps {
  onFiltersChange: (filters: number[]) => void;
  onCurrencyChange: (currency: Currency) => void;
  currentCurrency: Currency;
}

const currencyLabels: Record<Currency, string> = {
  RUB: 'RUB',
  USD: 'USD',
  EUR: 'EUR',
};

export default function Filter({ onFiltersChange, onCurrencyChange, currentCurrency }: FilterProps) {
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateFilterState = () => {
      if (window.innerWidth > 1024) {
        setIsFilterOpen(true); // Открыть фильтр на десктопе
      } else {
        setIsFilterOpen(false); // Закрыть фильтр на мобильных
      }
    };

    updateFilterState();
    window.addEventListener('resize', updateFilterState);

    return () => window.removeEventListener('resize', updateFilterState);
  }, []);

  const handleStopChange = (stops: number) => {
    const updatedStops = stops === -1
      ? []
      : selectedStops.includes(stops)
      ? selectedStops.filter((stop) => stop !== stops)
      : [...selectedStops, stops];
    setSelectedStops(updatedStops);
    onFiltersChange(updatedStops);
  };

  const handleOnlyClick = (stop: number) => {
    setSelectedStops([stop]);
    onFiltersChange([stop]);
  };

  const handleCurrencyClick = (currency: Currency) => {
    onCurrencyChange(currency);
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <div className={`filter ${isFilterOpen ? 'filter--open' : ''}`}>
      <div className="filter__toggle" onClick={toggleFilter}>
        <FaFilter className="filter__toggle-icon" />
        <span className="filter__toggle-label">Фильтры</span>
      </div>
      <div className="filter__content">
        <div className="filter__section">
          <h4 className="filter__title">Валюта</h4>
          <div className="filter__buttons">
            {(['RUB', 'USD', 'EUR'] as Currency[]).map((currency) => (
              <button
                key={currency}
                className={`filter__button ${
                  currentCurrency === currency ? 'filter__button--active' : ''
                }`}
                onClick={() => handleCurrencyClick(currency)}
              >
                {currencyLabels[currency]}
              </button>
            ))}
          </div>
        </div>
        <div className="filter__section">
          <h4 className="filter__title">Количество пересадок</h4>
          <div className="filter__checkboxes">
            {['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'].map(
              (label, index) => (
                <label
                  key={`stop-${index}`}
                  className={`filter__checkbox ${
                    selectedStops.includes(index - 1) ? 'filter__checkbox--selected' : ''
                  }`}
                >
                  <span>
                    <input
                      type="checkbox"
                      checked={
                        index === 0
                          ? selectedStops.length === 0
                          : selectedStops.includes(index - 1)
                      }
                      onChange={() =>
                        index === 0 ? handleStopChange(-1) : handleStopChange(index - 1)
                      }
                    />
                    {label}
                  </span>
                  {index > 0 && selectedStops.includes(index - 1) && selectedStops.length > 1 && (
                    <a
                      className="filter__link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnlyClick(index - 1);
                      }}
                    >
                      ТОЛЬКО
                    </a>
                  )}
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
