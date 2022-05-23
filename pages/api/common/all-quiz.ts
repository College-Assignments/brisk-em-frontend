import { getAllQuiz } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function allQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Inside allQuiz');
  try {
    if (req.method === 'GET') {
      const { quizId } = req.query;
      const data = await getAllQuiz();
      return data;
    }
  } catch (error) {
    res.status(405).json({ status: false, message: 'Invalid Request' });
  }
}
