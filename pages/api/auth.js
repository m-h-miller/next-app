// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            });

            if (!user) {
                return res.status(500).json({ error: "User not found" });
            }

            const checkPassword = bcrypt.compareSync(password, user.password);
            console.log({ checkPassword })

            if (checkPassword) {
                delete user.password;

                const session = await prisma.session.create({
                    data: {
                        userId: user.id
                    }
                })

                user.sessionToken = session.id

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
