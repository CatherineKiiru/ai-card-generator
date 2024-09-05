import { OpenAI } from 'openai';

// instantiate openAI API Key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateCard = async (req, res) => {
    const { message, occasion} = req.body;
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const contentCompletion = await openai.completions.create({
            model: "text-davinci-002",
            prompt: `Generate an ${occasion} card message based on: ${message}`,
            max_tokens: 100,
          });
          
          const cardContent = contentCompletion.data.choices[0].text?.trim() || ''; 
          
          const imageResponse = await openai.images.generate({
            prompt: `A beautiful ${occasion} card with the text: "${cardContent}"`,
            n: 1,
            size: imageSize,
          });
        
          const imageUrl = imageResponse.data.data[0].url;

          res.status(200).json({
            success: true,
            data: imageUrl
          })
    
        } catch (error) {
            res.status(400).json({
                success: false,
                error: 'Hmmm, no images returned, could you try it again?'
              })
    }
}

export default generateCard;


// export async function generateCard(message, occasion) {
//   // Generate card content
  

//   // Generate card image
//   // Method changed from createImage to images.generate
  

//   return { message: cardContent, imageUrl };
// }






