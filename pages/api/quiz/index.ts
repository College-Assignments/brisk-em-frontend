import { adminAuth } from '@/src/lib/firebase-admin';
import { addQuiz, getAllQuiz, getSingleQuiz } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Quiz(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                let data;
                const { quizId } = req.query;
                if (!quizId) data = await getAllQuiz();
                else data = await getSingleQuiz(quizId);
                return data;
            case 'POST':
                const user = await adminAuth.verifyIdToken(
                    req.headers.token as string
                );
                const quizData = { ...req.body, userId: user.uid };
                await addQuiz(quizData);
                return res.status(200).json({
                    status: true,
                    message: 'Quiz added successfully...',
                });
            default:
                throw Error();
        }
    } catch (error) {
        res.status(405).json({ status: false, message: 'Invalid Request' });
    }
}
