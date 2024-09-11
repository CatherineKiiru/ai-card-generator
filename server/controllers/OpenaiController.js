import { OpenAI } from 'openai';
import 'dotenv/config'


// create endpoint to return data from openai API
// instantiate openAI API Key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const OpenaiController = async (req, res) => {
  const { message, occasion, size } = req.body

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try{
    const contentCompletion = await openai.chat.completions.create({
      messages:[
        {
          "role": "system", "content": `Generate an ${occasion} card message based on: ${message}`,
        }
      ],
      model: "gpt-4o",
      max_tokens: 64,
    });

    const messageContent = contentCompletion.choices[0].text?.trim() || '';

    const createImage = await openai.images.generate({
      model: "dall-e-2",
      prompt: "A white siamese cat with a moustache and wig",
      n: 1,
      size: imageSize
    });
   
    // prompt: `${message}`,
    const imageContent = createImage.data[0].url

    res.status(200).json({
      success: true,
      data: imageContent
    })

  } catch(error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
  } else {
      console.log(error.message);
  }
  }
}

//     size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

//     try {
        
          
//           const cardContent = contentCompletion.data.choices[0].text?.trim() || ''; 
          
//           const imageResponse = await openai.images.generate({
//             prompt: `A beautiful ${occasion} card with the text: "${cardContent}"`,
//             n: 1,
//             size: imageSize,
//           });
        
//           const imageUrl = imageResponse.data.data[0].url;

//           res.status(200).json({
//             success: true,
//             data: imageUrl
//           })
    
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 error: 'Hmmm, no images returned, could you try it again?'
//               })
//     }
// }

export default OpenaiController;


// export async function generateCard(message, occasion) {
//   // Generate card content
  

//   // Generate card image
//   // Method changed from createImage to images.generate
  

//   return { message: cardContent, imageUrl };
// }






