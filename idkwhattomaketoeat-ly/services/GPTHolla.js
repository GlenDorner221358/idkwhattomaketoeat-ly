// AI SERVICE FILE
// because it hollas at the GPT's lmao
import axios from 'axios';
import { REACT_APP_OPENAI_API_KEY } from '@env';
import { REACT_APP_GOOGLE_CLOUD_API_KEY } from '@env';

const OPENAI_KEY = REACT_APP_OPENAI_API_KEY;
const GOOGLE_KEY = REACT_APP_GOOGLE_CLOUD_API_KEY;


// chatgpt
export const callGPT35Turbo = async (prompt) => {
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_KEY}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 250,
  };

  try {
    const response = await axios.post(endpoint, data, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling GPT-3.5 Turbo:', error);
    return 'Something went wrong';
  }
};


// google vision 
export const analyzeImageForIngredients = async (imageUri) => {
  const base64Image = await convertImageToBase64(imageUri);

  const request = {
    "requests": [
      {
        "image": {
          "content": base64Image
        },
        "features": [
          {
            "type": "LABEL_DETECTION", // Detects objects and ingredients
            "maxResults": 10
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_KEY}`,
      request
    );

    const labels = response.data.responses[0].labelAnnotations;
    const ingredients = labels.map(label => label.description);

    return ingredients;  
  } catch (error) {
    console.error("Error analyzing image: ", error);
    return [];
  }
};

// Utility to convert image to base64
const convertImageToBase64 = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
