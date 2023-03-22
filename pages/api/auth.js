// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        try {
            const { email, password } = req.body;

            console.log({ body: req.body })

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            });

            console.log({ user })

            if (!user) {
                return res.status(500).json();
            }

            const checkPassword = bcrypt.compareSync(password, user.password);

            if (checkPassword) {
                delete user.password;
                res.status(200).json({ user });
            } else {
                res.status(500).json("Internal server error");
            }

        } catch (e) {
            console.error(e);
            res.status(500).json();
        }
    } else {
        res.status(500).json();
    }
}
