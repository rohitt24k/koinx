import { Schema, model, Document } from "mongoose";

const cryptoSchema = new Schema({
  coin: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  "24hChange": { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Crypto = model("Crypto", cryptoSchema);

export default Crypto;
