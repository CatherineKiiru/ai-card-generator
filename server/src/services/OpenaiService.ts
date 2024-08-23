import { Configuration, OpenAI } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);

export async function generateCard(message: string, occasion: string) {
  // Generate card content
  const contentCompletion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Generate a ${occasion} card message based on: ${message}`,
    max_tokens: 100,
  });

  const cardContent = contentCompletion.data.choices[0].text?.trim() || '';

  // Generate card image
  const imageResponse = await openai.createImage({
    prompt: `A beautiful ${occasion} card with the text: "${cardContent}"`,
    n: 1,
    size: "512x512",
  });

  const imageUrl = imageResponse.data.data[0].url || '';

  return { message: cardContent, imageUrl };
}

