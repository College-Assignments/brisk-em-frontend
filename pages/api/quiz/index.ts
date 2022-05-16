import { NextApiRequest, NextApiResponse } from 'next';

import { adminAuth } from '../../../src/lib/firebase-admin';
import { addQuiz as addQuizMethod } from '../../../src/services/db';

export default async function Quiz(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await addQuiz(req, res);
    res
      .status(200)
      .json({ status: true, message: 'Quiz added successfully...' });
  } else {
    res.status(405).json({ status: false, message: 'Invalid Request' });
  }
}

const addQuiz = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await adminAuth.verifyIdToken(req.headers.token as string);
    const quizData = { ...req.body, userId: user.uid };
    await addQuizMethod(quizData);
    return res.status(200).json({ status: true, message: 'Quiz added successfully...' });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Something went wrong' });
  }
};
