import { BASE_URL2 } from '@/src/constants/base';
import axios from 'axios';

export async function customGen({ article }: { article: string }) {
  console.log({ article });
  const res = await axios.post(`${BASE_URL2}/api/ai/generatecustomqa`, {
    article,
  });
  return res.data;
}
