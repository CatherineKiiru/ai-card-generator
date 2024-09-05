import React, { useState } from 'react';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import { CardData } from './types';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData | null>(null);

  const handleSubmit = async (message: string, occasion: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $OPENAI_API_KEY'
        
        },
        body: JSON.stringify({ message, occasion }),
      });
      const data = await response.json();
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