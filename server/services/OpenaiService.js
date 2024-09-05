import { OpenAI } from 'openai';

// instantiate openAI API Key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCard(message, occasion) {
  // Generate card content
  const contentCompletion = await openai.completions.create({
    model: "text-davinci-002",
    prompt: `Generate a ${occasion} card message based on: ${message}`,
    max_tokens: 100,
  });

  const cardContent = contentCompletion.data.choices[0].text?.trim() || '';

  // Generate card image
  // Method changed from createImage to images.generate
  const imageResponse = await openai.images.generate({
    prompt: `A beautiful ${occasion} card with the text: "${cardContent}"`,
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = imageResponse.data.data[0].url || 'Hmmm, no images returned, could you try it again?';

  return { message: cardContent, imageUrl };
}

