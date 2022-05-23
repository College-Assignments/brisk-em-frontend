import { NextApiRequest } from 'next';

export function nextCL(req: NextApiRequest) {
    console.log('\nMethod\n');
    console.log(req.method);
    if (req.body) {
        console.log('\nBody\n');
        console.log(req.body);
    }
    if (Object.keys(req.query).length) {
        console.log('\nQuery\n');
        console.log(req.query);
    }
    console.log('\nHeaders\n');
    console.log(req.headers);
}
