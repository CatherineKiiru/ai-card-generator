import React from "react";
import { CardData } from "../types";

interface CardPreviewProps {
  cardData: CardData;
}

const CardPreview: React.FC<CardPreviewProps> = ({ cardData }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Generated Card</h2>
      <div className="bg-white p-4 rounded shadow-lg">
        <img
          src={cardData.imageUrl}
          alt="Generated card"
          className="w-full mb-4"
        />
        <p className="text-lg">{cardData.message}</p>
      </div>
      <button>
        <a
          href={cardData.imageUrl}
          download="generated_card.png"
          className="block mt-4 bg-green-500 text-white px-4 py-2 rounded text-center"
        >
          Download Card
        </a>
      </button>
    </div>
  );
};

export default CardPreview;
