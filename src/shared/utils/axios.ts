import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.replicate.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
  },
});
