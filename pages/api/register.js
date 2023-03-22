// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, name, password } = req.body;

            let pass = bcrypt.hashSync(password, 8);
    
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: pass
                }
            });

            delete user.password;
    
            res.status(200).json({ user })
        } catch (e) {
            if (e.code === "P2002") {
                return res.status(500).json({
                    error: "Already registered"
                });
            }
            return res.status(500).json({ error: "Operation failed" });
        }
    } else {
        // Handle any other HTTP method
        res.status(500).json();
    }
}
