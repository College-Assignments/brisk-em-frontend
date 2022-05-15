import { adminAuth } from '@/src/lib/firebase-admin';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Api');
  const data = await adminAuth.listUsers();
  res.status(200).json(data);
}
