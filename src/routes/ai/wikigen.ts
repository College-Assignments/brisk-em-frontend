import { BASE_URL } from '@/src/constants/base';
import axios from 'axios';

export async function wikisearch({ searchQuery }: { searchQuery: string }) {
  const res = await axios.get(
    `${BASE_URL}/api/ai/topicsearch?topic=${searchQuery}`
  );
  return res.data;
}

export async function wikigen({ topic: topic }: { topic: string }) {
  const res = await axios.post(
    `${BASE_URL}/api/ai/generateqa?article=${topic}`
  );
  return res.data;
}
