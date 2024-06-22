import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("HUF");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();
        setConverted(data.rates[toCurrency]);
        setIsLoading(false);
      }

      if (fromCurrency == toCurrency) {
        setConverted(amount);
        return;
      }
      convert();
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div id="appBase">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="HUF">HUF</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="HUF">HUF</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <p>
        {isLoading && "Fetching api..."}
        {!isLoading && `${converted} ${toCurrency}`}
      </p>
    </div>
  );
}
