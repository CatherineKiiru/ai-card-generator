import React, { useState } from 'react';

interface CardFormProps {
  onSubmit: (message: string, occasion: string) => void;
}

const CardForm: React.FC<CardFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [occasion, setOccasion] = useState('birthday');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message, occasion);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="occasion" className="block mb-2">Occasion:</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="birthday">Birthday</option>
          <option value="wedding">Wedding</option>
          <option value="anniversary">Anniversary</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Card
      </button>
    </form>
  );
};

export default CardForm;