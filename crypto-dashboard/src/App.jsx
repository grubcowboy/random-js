import { useState, useEffect } from 'react';

export default function App() {
  const [prices, setPrices] = useState({
    bitcoin: null,
    ethereum: null
  });
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

      setPrices({
        bitcoin: data.bitcoin.usd,
        ethereum: data.ethereum.usd
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(`current prices: ${prices.bitcoin} ${prices.ethereum}`);
  }, [prices]);

  useEffect(() => {
    fetchCryptoPrices();
    const intervalId = setInterval(fetchCryptoPrices, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading || !prices.bitcoin || !prices.ethereum) {
    return (
      <div className="app">

        <div className="typewriter">
          <h1>LOADING PRICES...</h1>
        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <h1 style={{ color: 'red' }}>ERROR: {error}</h1>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="prices">
        <h1>Crypto Prices</h1>
        <h2>Bitcoin ${prices.bitcoin.toLocaleString()}</h2>
        <h2>Ethereum ${prices.ethereum.toLocaleString()}</h2>
      </div>
    </div>
  );
}