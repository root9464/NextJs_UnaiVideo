import axios from 'axios';

export const actualVideoFromB64 = async (url: string) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  return response.data;
};
