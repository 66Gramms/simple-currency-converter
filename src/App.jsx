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
    <div className="flex min-h-screen items-center justify-center gap-3">
      <input
        className="bg-gray-500 text-white"
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        className="bg-gray-500 text-white"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="HUF">HUF</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <select
        className="bg-gray-500 text-white"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="HUF">HUF</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <p className="text-center text-blue-200">
        {isLoading && "Fetching api..."}
        {!isLoading && `${converted} ${toCurrency}`}
      </p>
    </div>
  );
}
