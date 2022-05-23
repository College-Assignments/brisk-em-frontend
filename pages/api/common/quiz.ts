import { getSingleQuiz } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function allQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { quizId } = req.query;
      if (!quizId) throw Error();
      const data = await getSingleQuiz(quizId);
      return data;
    }
  } catch (error) {
    res.status(405).json({ status: false, message: 'Invalid Request' });
  }
}
