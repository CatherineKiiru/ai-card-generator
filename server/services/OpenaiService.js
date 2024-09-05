import { OpenAI } from 'openai';

// instantiate openAI API Key from .env
const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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"
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

