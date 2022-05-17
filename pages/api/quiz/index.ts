import { NextApiRequest, NextApiResponse } from 'next';

import { adminAuth } from '../../../src/lib/firebase-admin';
import { addQuiz } from '../../../src/services/db';

export default async function Quiz(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const user = await adminAuth.verifyIdToken(req.headers.token as string);
      const quizData = { ...req.body, userId: user.uid };
      await addQuiz(quizData);
      return res
        .status(200)
        .json({ status: true, message: 'Quiz added successfully...' });
    }
  } catch (error) {
    res.status(405).json({ status: false, message: 'Invalid Request' });
  }
}
