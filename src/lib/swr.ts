import axios from 'axios';

// Get
export const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data());
