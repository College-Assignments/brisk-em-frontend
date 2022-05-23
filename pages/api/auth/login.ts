import { addUser } from '@/src/services/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(req.method);
        console.log(req.body);
        console.log(req.headers);
        if (req.method === 'POST') {
            console.log(req.body);
            await addUser(req.body);
            console.log('Added user ended');
            return res.status(200).json({
                status: true,
                message: 'User added successfully...',
            });
        }
    } catch (error) {
        return res
            .status(405)
            .json({ status: false, message: 'Invalid Request' });
    }
}
