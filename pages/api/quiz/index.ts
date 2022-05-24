import { adminAuth } from '@/src/lib/firebase-admin';
import { addQuiz, getAllQuiz, getSingleQuiz } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Started api/quiz/index.ts', new Date().toISOString());
    switch (req.method) {
      case 'GET':
        let data;
        const { quizId } = req.query;
        console.log('Start fetching data', new Date().toISOString());
        if (quizId) data = await getSingleQuiz(quizId);
        else data = await getAllQuiz();
        console.log('END', new Date().toISOString());
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
    console.log(error);
    return res.status(400).json({ status: false, message: 'Invalid Request' });
  }
}
