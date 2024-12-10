import './Ticket.css';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { useNavigate } from 'react-router-dom';
import { FaPlane } from 'react-icons/fa';

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
  currencySymbol: string;
  isLoadingRates: boolean;
}

function getCarrierLogo(carrier: string): string {
  const defaultLogo = '/plane-icon.svg'; // Логотип-заглушка
  const carrierLogos: Record<string, string> = {
    TK: '/tk.png',
    S7: '/s7.png',
    SU: '/su.png',
    BA: '/ba.png',
  };
  return carrierLogos[carrier] || defaultLogo;
}

function getLogoClass(carrier: string): string {
  const logoClasses: Record<string, string> = {
    SU: 'ticket__logo--su', 
    BA: 'ticket__logo--ba', 
  };
  return logoClasses[carrier] || '';
}

function getStopsText(stops: number): string {
  if (stops === 0) return 'Без пересадок';
  if (stops === 1) return `${stops} пересадка`;
  if (stops > 1 && stops < 5) return `${stops} пересадки`;
  return `${stops} пересадок`;
}

export default function Ticket({
  ticket,
  currencySymbol,
  isLoadingRates,
}: TicketProps) {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/not-found');
  };

  const logoClass = getLogoClass(ticket.carrier);

  return (
    <div className="ticket">
      <div className="ticket__left">
        <img
          src={getCarrierLogo(ticket.carrier)}
          alt={`${ticket.carrier} logo`}
          className={`ticket__logo ${logoClass}`}
        />
        <button
          className="ticket__buy-button"
          onClick={handleBuyClick}
          disabled={isLoadingRates}
        >
          {isLoadingRates ? (
            <LoadingAnimation />
          ) : (
            <>
              Купить за {ticket.price} {currencySymbol}
            </>
          )}
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
              <span className="ticket__plane">
                <FaPlane />
              </span>
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
