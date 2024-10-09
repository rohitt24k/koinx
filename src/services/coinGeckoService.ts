import axios from "axios";

const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price";

export const fetchCryptoData = async (coin: string) => {
  try {
    const response = await axios.get(COINGECKO_URL, {
      params: {
        ids: coin,
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    const data = response.data[coin];
    return {
      price: data.usd,
      marketCap: data.usd_market_cap,
      "24hChange": data.usd_24h_change,
    };
  } catch (error) {
    console.error(`Error fetching data for ${coin}:`, error);
    throw new Error(`Unable to fetch data for ${coin}`);
  }
};
