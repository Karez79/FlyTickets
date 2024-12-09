import './Filter.css';
import { useState } from 'react';

interface FilterProps {
  onFiltersChange: (filters: number[]) => void;
}

export default function Filter({ onFiltersChange }: FilterProps) {
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RUB');

  const handleStopChange = (stops: number) => {
    if (stops === -1) {
      // Сбрасываем все фильтры
      setSelectedStops([]);
      onFiltersChange([]);
    } else {
      const updatedStops = selectedStops.includes(stops)
        ? selectedStops.filter((stop) => stop !== stops)
        : [...selectedStops, stops];
      setSelectedStops(updatedStops);
      onFiltersChange(updatedStops);
    }
  };

  const handleOnlyClick = (stop: number) => {
    // Оставляем только выбранный чекбокс
    setSelectedStops([stop]);
    onFiltersChange([stop]);
  };

  return (
    <div className="filter">
      <div className="filter__section">
        <h4 className="filter__title">Валюта</h4>
        <div className="filter__buttons">
          {['RUB', 'USD', 'EUR'].map((currency) => (
            <button
              key={currency}
              className={`filter__button ${
                selectedCurrency === currency ? 'filter__button--active' : ''
              }`}
              onClick={() => setSelectedCurrency(currency)}
            >
              {currency}
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
                {index > 0 && selectedStops.length > 1 && selectedStops.includes(index - 1) && (
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
  );
}
