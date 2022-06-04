import axios from 'axios';

export async function customGen({ article }: { article: string }) {
  console.log({ article });
  const BASE_URL2 = localStorage.getItem('BASE_URL2');
  const res = await axios.post(`${BASE_URL2}/api/ai/generatecustomqa`, {
    article,
  });
  return res.data;
}
