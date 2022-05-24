import { adminAuth } from '@/src/lib/firebase-admin';
import { addQuiz, getAllQuiz, getSingleQuiz } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        let data;
        const { quizId } = req.query;
        if (quizId) data = await getSingleQuiz(quizId);
        else data = await getAllQuiz();
        return res.status(200).json(data);
      case 'POST':
        const user = await adminAuth.verifyIdToken(req.headers.token as string);
        const quizData = { ...req.body, userId: user.uid };
        await addQuiz(quizData);
        return res.status(200).json('Quiz added successfully...');
      default:
        throw Error();
    }
  } catch (error) {
    res.status(400).json({ status: false, message: 'Invalid Request' });
  }
}
