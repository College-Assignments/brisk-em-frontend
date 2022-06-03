import axios from 'axios';

export async function customGen({ article }: { article: string }) {
  console.log({ article });
  const res = await axios.post(
    'http://localhost:3000/api/ai/generatecustomqa',
    {
      article,
    }
  );
  return res.data;
}
