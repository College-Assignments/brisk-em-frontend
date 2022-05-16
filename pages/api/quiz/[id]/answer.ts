import { adminAuth } from '@/src/lib/firebase-admin';
import { addAnswer as addAnswerFb } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Answer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const user = await adminAuth.verifyIdToken(req.headers.token as string);
      const data = {
        ...req.body,
        quizId: req.query.id,
        userId: user.uid,
      };
      const response = await addAnswerFb(data);
      return res
        .status(200)
        .json({ status: true, data: { answerId: response.id } });
    } else throw Error();
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Invalid Request' });
  }
}
