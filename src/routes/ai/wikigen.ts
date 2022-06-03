import { BASE_URL2 } from '@/src/constants/base';
import axios from 'axios';

export async function wikisearch({ searchQuery }: { searchQuery: string }) {
  const res = await axios.get(
    `${BASE_URL2}/api/ai/topicsearch?topic=${searchQuery}`
  );
  return res.data;
}

export async function wikigen({ topic }: { topic: string }) {
  const res = await axios.post(
    `${BASE_URL2}/api/ai/generateqa?article=${topic}`
  );
  return res.data;
}
