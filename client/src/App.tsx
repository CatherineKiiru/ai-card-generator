import React, { useState } from 'react';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import { CardData } from './types';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData | null>(null);
  
  const handleSubmit = async (message: string, occasion: string) => {
    try {
      // Combine message and occasion into a prompt
      const prompt = `Create a card with the message: "${message}" for this occasion: "${occasion}".`;
      
      const response = await fetch('/openai/generateimages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $OPENAI_API_KEY',
        },
        body: JSON.stringify({
          prompt,          // Use the constructed prompt
          n: 1,            // Number of images to generate (optional)
          // size: '1024x1024' // Image size (optional)
        }),
      });

      const data = await response.json()
      setCardData(data);

    } catch (error) {
      console.error('Error generating card:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Card Generator</h1>
      <CardForm onSubmit={handleSubmit} />
      {cardData && <CardPreview cardData={cardData} />}
    </div>
  );
};

export default App;