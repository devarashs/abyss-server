import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    isContentVerified: { type: Boolean, default: false },
    name: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    image: { type: String, required: true },
    class: { type: String, required: true },
    category: { type: String, required: true },
    value: { type: Number, required: true },
    rareity: { type: String, required: true },
    description: { type: String, required: true },
    frameType: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
