import { useState, useEffect } from "react";
import "./LoadingAnimation.css";

export default function LoadingAnimation() {
  const messages = ["Ищем адекватные цены...", "Загружаем билеты..."];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Меняем текст каждые 3 секунды

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="loading-animation">
      <div className="loading-animation__circle">
        <img
          src="/biplan.png"
          alt="biplan"
          className="loading-animation__plane"
        />
      </div>
      <div className="loading-animation__text">
        <p className="loading-animation__message">
          {messages[currentMessageIndex]}
        </p>
      </div>
    </div>
  );
}
