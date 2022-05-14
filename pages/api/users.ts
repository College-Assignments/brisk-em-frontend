import { adminAuth } from '@/src/lib/firebase-admin';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await adminAuth.getUsers([]);
  res.status(200).json(data);
}
