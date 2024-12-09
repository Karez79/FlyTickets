import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from '../Filter/Filter';
import Ticket from '../Ticket/Ticket';
import './TicketsList.css';
import ticketsData from '../../data/tickets.json';

export default function TicketList() {
  const [filteredStops, setFilteredStops] = useState<number[]>([]);
  const navigate = useNavigate(); // Добавляем для перенаправления

  const handleFiltersChange = (filters: number[]) => {
    setFilteredStops(filters);
  };

  const handleBuyClick = () => {
    navigate('/not-a-real-page'); // Перенаправляем на несуществующую страницу
  };

  const filteredTickets = ticketsData.tickets.filter((ticket) => {
    if (filteredStops.length === 0) return true; // Показываем все билеты, если фильтры не выбраны
    return filteredStops.includes(ticket.stops);
  });

  return (
    <div className="ticket-list">
      <div className="content-container">
        <Filter onFiltersChange={handleFiltersChange} />
        <div className="ticket-container">
          {filteredTickets.map((ticket, index) => (
            <Ticket key={index} ticket={ticket} onBuyClick={handleBuyClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
