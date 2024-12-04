import { axiosFrontend } from '@/shared/utils/axios';
import { Prompt } from '../Module';

const generateVideo = (data: Prompt) => {
  return axiosFrontend.post('/generate', { data });
};
