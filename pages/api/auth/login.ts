import { addUser } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      await addUser(req.body);
      console.log('Added user ended');
      return res.status(200).json({
        status: true,
        message: 'User added successfully...',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(405).json({ status: false, message: 'Invalid Request' });
  }
}
