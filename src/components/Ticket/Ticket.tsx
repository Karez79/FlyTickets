import './Ticket.css';

interface TicketProps {
  ticket: {
    origin_name: string;
    destination_name: string;
    departure_time: string;
    arrival_time: string;
    stops: number;
    price: number;
    carrier: string;
    departure_date: string;
    arrival_date: string;
    origin: string;
    destination: string;
  };
  onBuyClick: () => void; // Добавляем обработчик клика для кнопки
}

// Функция для формирования текста пересадок
function getStopsText(stops: number): string {
  if (stops === 0) return 'Без пересадок';
  if (stops === 1) return `${stops} пересадка`;
  if (stops > 1 && stops < 5) return `${stops} пересадки`;
  return `${stops} пересадок`;
}

export default function Ticket({ ticket, onBuyClick }: TicketProps) {
  return (
    <div className="ticket">
      <div className="ticket__left">
        <img
          src={`/assets/${ticket.carrier.toLowerCase()}.png`}
          alt={`${ticket.carrier} logo`}
          className="ticket__logo"
        />
        <button className="ticket__buy-button" onClick={onBuyClick}>
          Купить за {ticket.price} ₽
        </button>
      </div>
      <div className="ticket__separator"></div>
      <div className="ticket__right">
        <div className="ticket__info">
          <div className="ticket__time">
            {ticket.departure_time}
            <div className="ticket__details">
              {ticket.origin}, {ticket.origin_name}
              <br />
              {ticket.departure_date}
            </div>
          </div>
          <div className="ticket__route">
            <span className="ticket__stops">{getStopsText(ticket.stops)}</span>
            <div className="ticket__line">
              <div className="ticket__line-segment"></div>
              <span className="ticket__plane">✈</span>
            </div>
          </div>
          <div className="ticket__time">
            {ticket.arrival_time}
            <div className="ticket__details">
              {ticket.destination}, {ticket.destination_name}
              <br />
              {ticket.arrival_date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
