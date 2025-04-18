import axios from 'axios';

const CLARIFAI_API_KEY = '051a552c1a0b496687e337d891acbdd7';
const CLARIFAI_USER_ID = 'hanwonurideul';
const CLARIFAI_APP_ID = 'an-0de';
const CLARIFAI_MODEL_ID = 'general-image-recognition'; 
const CLARIFAI_MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40'; 

export const analyzeImage = async (imageUrl) => {
  try {
    const response = await axios.post(
      `https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/versions/${CLARIFAI_MODEL_VERSION_ID}/outputs`,
      {
        user_app_id: {
          user_id: CLARIFAI_USER_ID,
          app_id: CLARIFAI_APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: imageUrl,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${CLARIFAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const concepts = response?.data?.outputs?.[0]?.data?.concepts;

    if (!Array.isArray(concepts)) {
      console.error('Clarifai concepts data is invalid:', response.data);
      throw new Error('AI did not return recognizable concepts.');
    }

    const tags = concepts.map((c) => c.name.toLowerCase());

    const aiData = {
      tags,
      type: tags.find((tag) =>
        ['shirt', 'jacket', 'hoodie', 'pants', 'skirt', 'dress', 'suit', 'jeans'].includes(tag)
      ) || 'unknown',
      activity: tags.find((tag) =>
        ['casual', 'formal', 'sport', 'business'].includes(tag)
      ) || 'casual',
      season: tags.find((tag) =>
        ['winter', 'summer', 'spring', 'autumn'].includes(tag)
      ) || 'any',
      weather: tags.includes('jacket') ? 'cold' : 'any',
    };

    return aiData;
  } catch (error) {
    console.error('Clarifai error:', error.response?.data || error.message);
    throw new Error('Failed to analyze image with AI');
  }
};
