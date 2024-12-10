import axios from "axios";

type Currency = "RUB" | "USD" | "EUR";

interface ExchangeRatesResponse {
  conversion_rates: Record<Currency, number>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchExchangeRates = async (): Promise<
  Record<Currency, number>
> => {
  const maxRetries = 3; // Максимальное количество попыток
  const retryDelay = 5000; // Задержка между попытками в миллисекундах

  const fallbackRates = {
    RUB: 1,
    USD: 101.58,
    EUR: 106.98,
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get<ExchangeRatesResponse>(
        "https://v6.exchangerate-api.com/v6/35e7d7d2d8ff4597e2950276/latest/RUB"
      );

      if (response.data && response.data.conversion_rates) {
        console.log("Полученные курсы валют:", response.data.conversion_rates);
        const rates = response.data.conversion_rates;

        return {
          RUB: 1,
          USD: rates.USD ? rates.USD / rates.RUB : fallbackRates.USD,
          EUR: rates.EUR ? rates.EUR / rates.RUB : fallbackRates.EUR,
        };
      } else {
        throw new Error("Некорректный формат ответа от API");
      }
    } catch (error) {
      console.error(`Попытка ${attempt}: Ошибка загрузки курсов валют:`, error);

      if (attempt < maxRetries) {
        console.warn(
          `Попытка ${attempt}: Ждём ${retryDelay}ms перед повторной попыткой...`
        );
        await delay(retryDelay);
      } else {
        console.error("Все попытки завершились неудачей.");
        return fallbackRates;
      }
    }
  }

  return fallbackRates;
};
