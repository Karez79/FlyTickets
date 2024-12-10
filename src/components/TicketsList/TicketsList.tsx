import { useState, useEffect, useRef } from 'react';
import Filter from '../Filter/Filter';
import Ticket from '../Ticket/Ticket';
import './TicketsList.css';
import ticketsData from '../../data/tickets.json';

const ITEMS_PER_BATCH = 10;

type Currency = 'RUB' | 'USD' | 'EUR';

interface TicketsListProps {
  exchangeRates: Record<Currency, number>;
  isRatesLoading: boolean;
}

export default function TicketsList({ exchangeRates, isRatesLoading }: TicketsListProps) {
  const [filteredTickets, setFilteredTickets] = useState(
    ticketsData.tickets.sort((a, b) => a.price - b.price)
  );
  const [items, setItems] = useState(filteredTickets.slice(0, ITEMS_PER_BATCH));
  const [hasMore, setHasMore] = useState(filteredTickets.length > ITEMS_PER_BATCH);
  const [currency, setCurrency] = useState<Currency>('RUB');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const lastBatchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    updatePrices(currency);
  }, [currency, exchangeRates]);

  const handleFiltersChange = (filters: number[]) => {
    applyFilters(filters);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  const updatePrices = (currency: Currency) => {
    const rate = exchangeRates[currency];
    const updatedTickets = ticketsData.tickets.map((ticket) => ({
      ...ticket,
      price: Math.round(ticket.price * rate),
    }));
    setFilteredTickets(updatedTickets.sort((a, b) => a.price - b.price));
    setItems(updatedTickets.slice(0, ITEMS_PER_BATCH));
    setHasMore(updatedTickets.length > ITEMS_PER_BATCH);
  };

  const applyFilters = (filters: number[]) => {
    const rate = exchangeRates[currency];
    const filtered = ticketsData.tickets
      .filter((ticket) => {
        if (filters.length === 0) return true;
        return filters.includes(ticket.stops);
      })
      .map((ticket) => ({
        ...ticket,
        price: Math.round(ticket.price * rate),
      }))
      .sort((a, b) => a.price - b.price);

    setFilteredTickets(filtered);
    setItems(filtered.slice(0, ITEMS_PER_BATCH));
    setHasMore(filtered.length > ITEMS_PER_BATCH);
  };

  const loadMore = () => {
    const nextItems = filteredTickets.slice(items.length, items.length + ITEMS_PER_BATCH);
    setItems((prevItems) => [...prevItems, ...nextItems]);

    if (items.length + nextItems.length >= filteredTickets.length) {
      setHasMore(false);
    }

    setTimeout(() => {
      lastBatchRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="ticket-list">
      <div className="content-container">
        <Filter
          onFiltersChange={handleFiltersChange}
          onCurrencyChange={handleCurrencyChange}
          currentCurrency={currency}
        />
        <div className="ticket-container">
          {items.map((ticket, index) => (
            <div
              key={index}
              className="fade-in"
              ref={index === items.length - 1 ? lastBatchRef : null}
            >
              <Ticket
                ticket={ticket}
                currencySymbol={currency === 'RUB' ? '₽' : currency === 'USD' ? '$' : '€'}
                isLoadingRates={isRatesLoading}
              />
            </div>
          ))}
          <div className="load-more-container">
            <button
              className={`load-more-button ${!hasMore ? 'disabled' : ''}`}
              onClick={loadMore}
              disabled={!hasMore}
            >
              {hasMore ? 'Показать еще' : 'Все билеты загружены'}
            </button>
          </div>
        </div>
      </div>
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}
