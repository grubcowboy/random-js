import React, { useState, useEffect } from 'react';

export default function App() {
  const [prices, setPrices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCryptoPrices() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.bitcoin.usd);
      console.log(data.ethereum.usd);

      setPrices({
        bitcoin: data.bitcoin.usd,
        ethereum: data.ethereum.usd
      });

      console.log(`set prices: ${setPrices}`);

    } catch (err) {
      setError(err.message);
    } finally {

      setIsLoading(false);

    }
  };

  const fetchWithDelay = async () => {
    await new Promise(resolve => setTimeout(resolve, 60000));
    return fetchCryptoPrices();
  };
  // FIX INFINITE LOOP
  fetchWithDelay();
  // ADD USEEFFECT()

  return (
    <div className="app">

      <div className="typewriter">
        <h1>WORKING...</h1>
      </div>

    </div>
  );
}