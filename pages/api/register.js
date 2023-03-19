// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/';
import bcrypt from 'bcrypt';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        console.log({ req });
        console.log({ query: req.query });

        try {
            const { email, name, password } = req.query;
    
            const user = prisma.user.create({
                data: {
                    email,
                    name,
                    password: bcrypt.hashSync(password, 8),
                }
            });

            console.log({ user })
    
            res.status(200).json({ user })
        } catch (e) {
            console.error(e);
            res.status(500).json();
        }
    } else {
        // Handle any other HTTP method
        res.status(200).json({ name: 'johhn doe"'})
    }
}
