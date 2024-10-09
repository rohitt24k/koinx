import cron from "node-cron";
import Crypto from "../models/cryptoModel";
import { fetchCryptoData } from "../services/coinGeckoService";

const coins = ["bitcoin", "matic-network", "ethereum"];

const fetchAndStoreCryptoData = async () => {
  for (const coin of coins) {
    try {
      const data = await fetchCryptoData(coin);
      await Crypto.create({ coin, ...data });
      console.log(`Data stored for ${coin}`);
    } catch (error) {
      console.error(`Failed to store data for ${coin}:`, error);
    }
  }
};

cron.schedule("0 */2 * * *", fetchAndStoreCryptoData);
