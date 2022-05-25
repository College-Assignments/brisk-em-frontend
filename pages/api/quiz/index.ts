import { adminAuth } from '@/src/lib/firebase-admin';
import { addQuiz, getAllQuiz, getSingleQuiz } from '@/src/services/db';
import { isEmpty } from 'lodash';
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
        console.log('/quiz req.query -> ', req.query);
        if (isEmpty(quizId)) data = await getAllQuiz();
        else data = await getSingleQuiz(quizId);
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
