import axios from 'axios';

export async function wikisearch({ searchQuery }: { searchQuery: string }) {
  const BASE_URL2 = localStorage.getItem('BASE_URL2');
  const res = await axios.get(
    `${BASE_URL2}/api/ai/topicsearch?topic=${searchQuery}`
  );
  return res.data;
}

export async function wikigen({ topic }: { topic: string }) {
  const BASE_URL2 = localStorage.getItem('BASE_URL2');
  const res = await axios.post(
    `${BASE_URL2}/api/ai/generateqa?article=${topic}`
  );
  return res.data;
}
