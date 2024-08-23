import express from 'express';
import { generateCard } from '../services/OpenaiService';

const router = express.Router();

router.post('/generate-card', async (req, res) => {
  try {
    const { message, occasion } = req.body;
    const cardData = await generateCard(message, occasion);
    res.json(cardData);
  } catch (error) {
    console.error('Error generating card:', error);
    res.status(500).json({ error: 'Failed to generate card' });
  }
});

export default router;