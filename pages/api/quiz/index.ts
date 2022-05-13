import { NextApiRequest, NextApiResponse } from 'next';

import { adminFirestore } from '../../../src/lib/firebase-admin';
import { addQuiz as addQuizMethod } from '../../../src/services/db';

export default async function Quiz(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await addQuiz(req, res);
      break;
    default:
      res.status(405).json({ status: false, message: 'Method Not found' });
      break;
  }
}

const addQuiz = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await adminFirestore.verifyIdToken(req.headers.token as string);
    const quizData = { ...req.body, userId: user.uid };
    await addQuizMethod(quizData);
    return res.status(200).json({ status: true, message: 'Quiz added successfully...' });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Something went wrong' });
  }
};
