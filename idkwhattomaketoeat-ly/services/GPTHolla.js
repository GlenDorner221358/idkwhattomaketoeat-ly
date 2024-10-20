import axios from 'axios';
import { REACT_APP_OPENAI_API_KEY } from '@env';

const API_KEY = REACT_APP_OPENAI_API_KEY;

export const callGPT35Turbo = async (prompt) => {
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
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
