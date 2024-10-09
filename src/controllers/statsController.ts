import { Request, Response } from "express";
import Crypto from "../models/cryptoModel";

export const getStats = async (req: Request, res: Response): Promise<void> => {
  const { coin } = req.query;

  if (!coin) {
    res.status(400).json({ message: "Coin parameter is required" });
    return;
  }

  try {
    const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestRecord) {
      res.status(404).json({ message: `No data found for ${coin}` });
      return;
    }

    res.status(200).json({
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      "24hChange": latestRecord["24hChange"],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeviation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { coin } = req.query;

  if (!coin) {
    res.status(400).json({ message: "Coin parameter is required" });
    return;
  }

  try {
    const records = await Crypto.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      res.status(404).json({ message: `No data found for ${coin}` });
      return;
    }

    const prices = records.map((record) => record.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    const variance =
      prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
      prices.length;
    const standardDeviation = Math.sqrt(variance);

    res.status(200).json({ deviation: standardDeviation.toFixed(2) });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
