import { getAllUsers } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case 'GET':
                const data = await getAllUsers();
                return res.status(200).json(data);
            default:
                throw Error();
        }
    } catch (error) {
        res.status(405).json({ status: false, message: 'Invalid Request' });
    }
}
